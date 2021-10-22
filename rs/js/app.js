//https://developer.here.com/documentation/examples/maps-js/resizable-geoshapes/resizable-polyline
//API key 2:TTvNKTFAe5bdAlmHDHXrs59unF5WXLhmweK7a4FN6bo
var myPosition, pickLocation = null, pickDestination = null, via = null, centerMap;
var listMarker = [], listRoute = [], listStartPoint = [], listDestinationPoint = [], listVia = [];
var platform, map, ui, behavior, mapSetting, marker, currentMarker, bubble, provider, geocoderService;
var vehicle, transportModeType = 'car', routingModeType = 'fast';
var startName, viaName, destinationName;
//https://developer.here.com/documentation/routing/dev_guide/topics/resource-param-type-routing-mode.html#type-routing-type
var urlGeoReserve = "https://revgeocode.search.hereapi.com/v1/revgeocode?apikey=" + APIKEY + '&mode=retrieveAddresses&maxresults=1&';
const ICON = {
    currentLocation: new H.map.Icon(pathImage + "poi.png", {size: {w: 32, h: 32}}),
    iconstart: new H.map.Icon(pathImage + "start.png", {size: {w: 32, h: 32}}),
    icondestination: new H.map.Icon(pathImage + "finish.png", {size: {w: 32, h: 32}}),
    searchicon: new H.map.Icon(pathImage + "circle.png", {size: {w: 30, h: 30}}),
    vialocation: new H.map.Icon(pathImage + "via.png", {size: {w: 30, h: 30}}),
    food: new H.map.Icon(pathImage + "categories/food.svg", {size: {w: 24, h: 24}}),
    entertainment: new H.map.Icon(pathImage + "categories/entertainment.svg", {size: {w: 24, h: 24}}),
    place: new H.map.Icon(pathImage + "categories/place.svg", {size: {w: 24, h: 24}}),
    natural: new H.map.Icon(pathImage + "categories/natural.svg", {size: {w: 24, h: 24}}),
    transport: new H.map.Icon(pathImage + "categories/transport_station.svg", {size: {w: 24, h: 24}}),
    hotel: new H.map.Icon(pathImage + "categories/hotel.svg", {size: {w: 24, h: 24}}),
    outdoor: new H.map.Icon(pathImage + "categories/outdoor.svg", {size: {w: 24, h: 24}}),
    shopping: new H.map.Icon(pathImage + "categories/shopping.svg", {size: {w: 24, h: 24}}),
    business: new H.map.Icon(pathImage + "categories/business.svg", {size: {w: 24, h: 24}}),
    service: new H.map.Icon(pathImage + "categories/service.svg", {size: {w: 24, h: 24}}),
    facilities: new H.map.Icon(pathImage + "categories/facilities.svg", {size: {w: 24, h: 24}}),
    buiding: new H.map.Icon(pathImage + "categories/building.svg", {size: {w: 24, h: 24}}),
    hotelA: new H.map.Icon(pathImage + "categories/hotels.png", {size: {w: 24, h: 24}}),
    foodA: new H.map.Icon(pathImage + "categories/food.png", {size: {w: 24, h: 24}}),
    coffeeA: new H.map.Icon(pathImage + "categories/coffee.png", {size: {w: 24, h: 24}}),
    shoppingA: new H.map.Icon(pathImage + "categories/shopping.png", {size: {w: 24, h: 24}}),
    airPortA: new H.map.Icon(pathImage + "categories/airports.png", {size: {w: 24, h: 24}}),
    hospitalA: new H.map.Icon(pathImage + "categories/hospital.png", {size: {w: 24, h: 24}}),
    schoolsA: new H.map.Icon(pathImage + "categories/schools.png", {size: {w: 24, h: 24}}),
    atmA: new H.map.Icon(pathImage + "categories/ATM.png", {size: {w: 24, h: 24}}),
    gasA: new H.map.Icon(pathImage + "categories/gas.png", {size: {w: 24, h: 24}})
}

var zoomMap = {
    house: 18,
    intersection: 16,
    street: 15,
    district: 14,
    city: 13,
    state: 10,
    country: 8
}
/*
 * @param {type} position object of coord
 * @returns {undefined}
 */
getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            initMap(userLocation);
        }, function () {
            console.log('block location');
            initMap(pos);
        });
    } else {
        initMap(pos);
    }
}

function initMap(position) {
    myPosition = position;
    platform = new H.service.Platform({
        apikey: APIKEY
    });
    var pixelRatio = window.devicePixelRatio || 1;
//    var defaultLayers = platform.createDefaultLayers();
    var defaultLayers = platform.createDefaultLayers({
        tileSize: pixelRatio === 1 ? 256 : 512,
        ppi: pixelRatio === 1 ? undefined : 320
    });
    //ket xuat map vao the mapContainer
    map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
                zoom: zoomMap.city,
                center: myPosition,
                pixelRatio: window.devicePixelRatio || 1
            }
    );
    var mapTileService = platform.getMapTileService({
        type: 'base'
    }),
            multiMapLayer = mapTileService.createTileLayer(
                    'maptile',
                    'normal.day',
                    pixelRatio === 1 ? 256 : 512,
                    'png8',
                    {lg: 'mul', ppi: pixelRatio === 1 ? undefined : 320}
            );
    map.setBaseLayer(multiMapLayer);
    ui = H.ui.UI.createDefault(map, defaultLayers);
    mapSetting = ui.getControl('mapsettings');
    mapSetting.setAlignment('top-right');
    ui.setUnitSystem(H.ui.UnitSystem.IMPERIAL);
    var mapEvents = new H.mapevents.MapEvents(map);
    var behavior = new H.mapevents.Behavior(mapEvents);
    //thằng này làm nhiệm vụ thêm các script xuống dưới. Vì thế nên khi gọi function đến thằng này nó đang ko đọc được function :(
    addScript();
    window.addEventListener('resize', () => map.getViewPort().resize());
    let markerStart = {
        coords: myPosition,
        icon: {icon: ICON.currentLocation},
        content: "Your current location"
    }
    
    //end khoi tao map
    //add marker user visitor
    addMarkerHere(markerStart, false, true);
    
    /*
     * event right click on map user can set start, via, des to direct and remove marker
     */
    map.addEventListener('contextmenu', function (e) {
        //get lat, lng when right lick!
        var coord = map.screenToGeo(e.viewportX, e.viewportY);
        let obj = {
            coords: coord,
        }
        if (e.target instanceof H.map.Marker) {
            e.items.push(
                    new H.util.ContextItem({
                        label: 'Set as via',
                        callback: function () {
                            obj.content = "Via Point";
                            obj.icon = {icon: ICON.searchicon, volatility: false};
                            via = coord;
                            if (pickDestination) {
                                removeRoute();
                                let origin;
                                if (pickLocation) {
                                    origin = pickLocation.lat + ',' + pickLocation.lng;
                                } else {
                                    origin = myPosition.lat + ',' + myPosition.lng;
                                }
                                var params = {
                                    transportMode: transportModeType,
                                    routingMode: routingModeType,
                                    origin: origin,
                                    via: coord.lat + ',' + coord.lng,
                                    destination: pickDestination.lat + ',' + pickDestination.lng,
                                    return: 'polyline,summary,actions,instructions'
                                }
                                direct(params);
                            }
                        }
                    }),
                    H.util.ContextItem.SEPARATOR,
                    new H.util.ContextItem({
                        label: 'Set as destination',
                        callback: function () {
                            destinationName = e.target.getData();
                            removeRoute();
                            pickDestination = coord;
                            let origin
                            if (pickLocation) {
                                origin = pickLocation.lat + ',' + pickLocation.lng;
                            } else {
                                origin = myPosition.lat + ',' + myPosition.lng;
                            }
                            let destination;
                            destination = coord.lat + ',' + coord.lng;
                            var params = {
                                transportMode: transportModeType,
                                routingMode: routingModeType,
                                origin: origin,
                                return: 'polyline,summary,actions,instructions',
                            }
                            if (via) {
                                params.via = via.lat + ',' + via.lng;
                            }
                            params.destination = destination;
                            //pickLocation = coord;
                            direct(params);
                        }
                    }),
                    H.util.ContextItem.SEPARATOR,
                    new H.util.ContextItem({
                        label: 'Delete Marker',
                        callback: function () {
                            if (e.target == currentMarker) {
                                alert('Cant not remove current location');
                                return;
                            }
                            map.removeObject(e.target);
                            var indexLM = listMarker.indexOf(e.target);
                            if (indexLM !== -1) {
                                listMarker.splice(indexLM, 1);
                                via = null;
                            }
                            var indexStartPoint = listStartPoint.indexOf(e.target);
                            if (indexStartPoint !== -1) {
                                pickLocation = null;
                                listStartPoint.splice(indexStartPoint, 1);
                                startName = null;
                            }
                            var indexEndPoint = listDestinationPoint.indexOf(e.target);
                            if (indexEndPoint !== -1) {
                                pickDestination = null;
                                listDestinationPoint.splice(indexEndPoint, 1);
                                destinationName = null;
                            }
                            var indexViaPoint = listVia.indexOf(e.target);
                            if (indexViaPoint !== -1) {
                                listVia.splice(indexViaPoint, 1);
                                via = null;
                                viaName = null;
                            }
                            removeRoute();
                        }
                    })

                    );
        } else {
            e.items.push(
                    new H.util.ContextItem({
                        label: 'Set as starting point',
                        callback: function () {
//                            var Place = await getPlace(coord);
                            let url = urlGeoReserve + 'at=' + coord.lat + ',' + coord.lng;
                            request(url).then(function (res) {
                                pickLocation = coord;
                                pickDestination = null;
                                if (res) {
                                    obj.content = res.items[0].title;
                                    startName = res.items[0].title;
                                } else {
                                    obj.content = "Starting point";
                                }
                                obj.icon = {icon: ICON.iconstart};
                                removeMarker('start');
                                removeMarker('des');
                                removeRoute();
                                addMarkerHere(obj, true, 'start');
                                map.setCenter(pickLocation, true);
                                map.setZoom(zoomMap.district);
                            })

                        }
                    }),
//                    H.util.ContextItem.SEPARATOR,
                    new H.util.ContextItem({
                        label: 'Set as via',
                        callback: function () {
                            removeMarker('via');
                            via = coord;
                            let url = urlGeoReserve + 'at=' + coord.lat + ',' + coord.lng;
                            request(url).then(function (res) {
                                if (res) {
                                    obj.content = res.items[0].title;
                                    viaName = res.items[0].title;
                                } else {
                                    obj.content = "Via point";
                                }
                                obj.icon = {icon: ICON.vialocation, volatility: false};
                                addMarkerHere(obj, false, 'via');
                                map.setCenter(via, true);
                                map.setZoom(zoomMap.district);
                            })
                            if (pickDestination) {
                                removeRoute();
                                let origin;
                                if (pickLocation) {
                                    origin = pickLocation.lat + ',' + pickLocation.lng;
                                } else {
                                    origin = myPosition.lat + ',' + myPosition.lng;
                                }
                                var params = {
                                    transportMode: transportModeType,
                                    routingMode: routingModeType,
                                    origin: origin,
                                    via: coord.lat + ',' + coord.lng,
                                    destination: pickDestination.lat + ',' + pickDestination.lng,
                                    return: 'polyline,summary,actions,instructions'
                                }
                                direct(params);
                            }
                        }
                    }),
//                    H.util.ContextItem.SEPARATOR,
                    new H.util.ContextItem({
                        label: 'Set as destination',
                        callback: function () {
                            removeRoute();
                            removeMarker('des');
                            pickDestination = coord;
                            let url = urlGeoReserve + 'at=' + coord.lat + ',' + coord.lng;
                            request(url).then(function (res) {
                                if (res) {
                                    obj.content = res.items[0].title;
                                    destinationName = res.items[0].title;
                                } else {
                                    obj.content = "Destination point";
                                }
                                obj.icon = {icon: ICON.icondestination};
                                addMarkerHere(obj, true, 'des');
                            });

                            let origin;
                            if (pickLocation) {
                                origin = pickLocation.lat + ',' + pickLocation.lng;
                            } else {
                                origin = myPosition.lat + ',' + myPosition.lng;
                            }

                            let destination;
                            destination = coord.lat + ',' + coord.lng;
                            var params = {
                                transportMode: transportModeType,
                                routingMode: routingModeType,
                                origin: origin,
//                                destination: destination,
                                return: 'polyline,summary,actions,instructions',
//                                spans: "maxSpeed"
                            }
                            if (via) {
                                params.via = via.lat + ',' + via.lng;
                            }
                            params.destination = destination;
                            //pickLocation = coord;
                            direct(params);
                        }
                    })
                    );
        }
    });

    //hover vao marker hien thong tin len
    map.addEventListener('pointermove', function (evt) {
        if (evt.target instanceof H.map.Marker) {
            map.getViewPort().element.style.cursor = 'pointer';
            if (evt.target.getData()) {
                //add class for bubble box
                //bubble.addClass('cssBubble');
                if (!bubble) {
                    bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
                        content: evt.target.getData()
                    });
                    bubble.addClass('cssBubble');
                    ui.addBubble(bubble);
                } else {
                    //if bubble is open don't need open again.
                    if (bubble.getState() == 'open') {
                        return;
                    }
                    //get data of marker set to bubble
                    bubble.setPosition(evt.target.getGeometry());
                    bubble.setContent(evt.target.getData());
                    bubble.open();
                }
            }
        } else {
            //if bubble is open don't close it
            map.getViewPort().element.style.cursor = 'auto';
            if (bubble && bubble.getState() == 'open') {
                bubble.close();
            }
        }
    });
    
    //di chuyen diem danh dau chi duong lai
    function dragMarker() {
        map.addEventListener('dragstart', function (ev) {
            var target = ev.target;
            if (target instanceof H.map.Marker) {
                var pointer = ev.currentPointer;
                var targetPosition = map.geoToScreen(target.getGeometry());
                target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                behavior.disable();
            }
        }, false);
        map.addEventListener('dragend', function (ev) {
            var target = ev.target;
            if (target instanceof H.map.Marker) {
                let origin;
                if (pickDestination) {
                    removeRoute();
                    if (pickLocation) {
                        origin = pickLocation.lat + ',' + pickLocation.lng;
                    } else {
                        origin = myPosition.lat + ',' + myPosition.lng;
                    }
                    let pointerPosition = map.screenToGeo(ev.currentPointer.viewportX, ev.currentPointer.viewportY);
                    var params = {
                        transportMode: transportModeType,
                        routingMode: routingModeType,
                        origin: origin,
//                        destination: pointerPosition.lat + ',' + pointerPosition.lng,
                        return: 'polyline,summary,actions,instructions',
//                    spans: "speedLimit,maxSpeed"
                    }
                    if (via) {
                        params.via = via.lat + ',' + via.lng;
                    }
                    params.destination = pointerPosition.lat + ',' + pointerPosition.lng;
                    pickDestination = pointerPosition;
//                    params.destination = pickDestination.lat + ',' + pickDestination.lng;

                    direct(params);
                }
                behavior.enable();
            }
        }, false);
        map.addEventListener('drag', function (ev) {
            var target = ev.target;
            if (target instanceof H.map.Marker) {
                var pointer = ev.currentPointer;
                target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
            }
        }, false)
    }

//https://stackoverflow.com/questions/33731921/how-to-remove-previous-infobubble-if-i-click-different-marker-in-here-map
    dragMarker();
}
/*
 * 
 * @param {type} evt this element to get data on this element
 * @returns {undefined}
 */
//tim kiem cac dia diem xung quanh vi tri xac dinh nhu hotel, restaurant, hospital call qua thang geoSearch.js
function nearMe(evt) {
    via = null;
    removeRoute();
    removeMarker();
    removeMarker('via');
    removeMarker('des');
//    removeMarker();
    let name = evt.getAttribute('data-query');
    document.querySelector(".findingCategory").innerHTML = name;
    categoriesName = name;
    let type = evt.getAttribute('data-type');
    categoriesType = type;
    let r;
    if (range) {
        r = ';r=' + range * 1000;
    } else {
        r = ';r=10000';
    }
    if (!limit) {
        limit = 10;
    }
    let inPosition;
    if (pickLocation) {
        inPosition = pickLocation.lat + ',' + pickLocation.lng;
    } else {
        inPosition = myPosition.lat + ',' + myPosition.lng;
    }
    let paramGeoSearch = {
        q: name,
//            at: myPosition.lat + ',' + myPosition.lng,
        in: 'circle:' + inPosition + r,
        categories: type,
        limit: limit
    }
    searchCoderSearchItem(paramGeoSearch);
}
/**
 * @param {type} evt this element to get data
 * @returns {undefined}
 */
//doi phuong tien ( theo xe dap, xe tai, di bo
function transportMode(evt) {
    transportModeType = evt.getAttribute('data-type');
    if (!pickDestination) {
        return;
    }
    removeRoute();
    var routeMode;
    if (routingModeType) {
        routeMode = routingModeType;
    } else {
        routeMode = 'fast';
    }
    let origin;
    if (pickLocation) {
        origin = pickLocation.lat + ',' + pickLocation.lng;
    } else {
        origin = myPosition.lat + ',' + myPosition.lng;
    }

    var params = {
        transportMode: transportModeType,
        routingMode: routeMode,
        origin: origin,
//        destination: pickDestination.lat + ',' + pickDestination.lng,
        return: 'polyline,summary,actions,instructions'
    }
    if (via) {
        params.via = via.lat + ',' + via.lng;
    }
    params.destination = pickDestination.lat + ',' + pickDestination.lng;
    direct(params);
}
/**
 * @param {type} evt this element to get data
 * @returns {undefined}
 */
//chi duong theo cach nhanh nhat, ngan nhat, it den do nhat...
function routeMode(evt) {
    removeRoute();
    routingModeType = evt.getAttribute('data-type');
    if (!pickDestination) {
//alert('Please pick destination');
        return;
    }
    if (!transportModeType) {
        transportModeType = 'car';
    }

    let origin;
    if (pickLocation) {
        origin = pickLocation.lat + ',' + pickLocation.lng;
    } else {
        origin = myPosition.lat + ',' + myPosition.lng;
    }
    origin = myPosition.lat + ',' + myPosition.lng;
    var params = {
        transportMode: transportModeType,
        routingMode: routingModeType,
        origin: origin,
//        destination: pickDestination.lat + ',' + pickDestination.lng,
        return: 'polyline,summary,actions,instructions'
                //return: 'polyline'
    }
    if (via) {
        params.via = via.lat + ',' + via.lng;
    }
    params.destination = pickDestination.lat + ',' + pickDestination.lng;
    direct(params);
}

//remove marker on map by type 
function removeMarker(type) {
    if (type == 'start') {
        if (listStartPoint.length) {
            for (let maker of listStartPoint) {
                map.removeObject(maker);
            }
            listStartPoint = [];
        }
    } else if (type == 'des') {
        if (listDestinationPoint.length) {
            for (let maker of listDestinationPoint) {
                map.removeObject(maker);
            }
            listDestinationPoint = [];
        }
    } else if (type == 'via') {
        if (listVia.length) {
            for (let maker of listVia) {
                map.removeObject(maker);
            }
            listVia = [];
        }
    } else {
        document.getElementById("panel").innerHTML = '';
        if (listMarker.length) {
            for (let maker of listMarker) {
                map.removeObject(maker);
            }
            listMarker = [];
        }
    }
}

//remove all route on map
function removeRoute() {
    if (listRoute && listRoute.length) {
        for (let route of listRoute) {
            map.removeObject(route);
        }
        listRoute = [];
    }
}
//remove all bubble
function removeBubble() {
    for (let bub of ui.getBubbles()) {
        ui.removeBubble(bub);
    }
}
//add marker
/**
 * @param {type} obj 
 * @param {type} drag true, false to set this marker can drag?
 * @param {type} flag this marker belong to which group?
 * @returns {undefined}
 */
function addMarkerHere(obj, drag, flag) {
    if (!obj.icon) {
        obj.icon = {icon: ICON.searchicon, volatility: true}
    }
    if (drag == true || drag == 'true') {
        obj.icon.volatility = true;
    }

    marker = new H.map.Marker(obj.coords, obj.icon);
    if (drag == true || drag == 'true') {
        marker.draggable = true;
    }
    //set content for this marker
    if (obj.content) {
        marker.setData(obj.content);
    }
    map.addObject(marker);
    if (flag == 'start') {
        listStartPoint.push(marker);
    } else if (flag == 'des') {
        listDestinationPoint.push(marker);
    } else if (flag == 'via') {
        listVia.push(marker);
    } else if (flag == true) {
        currentMarker = marker;
    } else {
        listMarker.push(marker);
    }
}
//add script
function addScript() {
    var arrScript = ["geoRouting_v8.js", "geoSearch.js", "suggesstion.js"];
    for (let url of arrScript) {
        var script = document.createElement('script');
        script.setAttribute("src", path + 'rs/js/' + url);
        document.body.appendChild(script);
    }
}

//ajax
function request(url) {
    return new Promise(function (resolve, reject) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', url);
        xmlHttp.responseType = "json";
        xmlHttp.onload = function () {
            if (xmlHttp.status == 200) {
                resolve(xmlHttp.response);
            } else {
                reject("Error");
            }
        };
        xmlHttp.send();
    });
}

