//https://developer.here.com/documentation/routing-api/api-reference-swagger.html
//https://developer.here.com/documentation/maps/3.1.26.0/dev_guide/topics/routing.html
//https://developer.here.com/cn/documentation/maps/hls-chn/topics_api/h-map-polyline-options.html
//dung api v8
//how to remove routess
//https://stackoverflow.com/questions/34013037/how-to-remove-previous-routes-in-here-js-api
//route a to b
//https://developer.here.com/documentation/examples/maps-js/servicesRouting/map-with-route-from-a-to-b
//lam rieng nhiem vu chi duong
var router = platform.getRoutingService(null, 8);
var getcoderService = platform.getGeocodingService();
//khai bao tham so
var calculateRouteParamssss = {
    transportMode: "car",
    routingMode: "fast",
    origin: "52.53086,13.38474",
    destination: "52.607731,13.433743",
    alternatives: "3",
//    departureTime: "2020-07-29T09:00:00",
    return: 'polyline,summary,actions,instructions',
    spans: "speedLimi,maxSpeed"
}
//return
//polyline chỉ đường
//summary các đường khác
//action: chi tiết đi như thế nào ( đơn giản)
//instructions: Hướng dẫn đi ( chi tiết, đầy đủ)
//handle result
var onResult = function (result) {
//    let totalLength, totalDuration;
    if (result.routes.length) {
        extendMenu.style.display = 'none';
        let colors = ["#034F84", "#88c0d0", "#000", "#d00fd4", "#5882FA"];
        result.routes.forEach((route) => {
            let totalLength = 0;
            let totalDuration = 0;
            route.sections.forEach((section) => {
                // Create a linestring to use as a point source for the route line
                let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
                // Create an outline for the route polyline:
                var routeOutline = new H.map.Polyline(linestring, {
                    style: {
                        lineWidth: 6,
                        strokeColor: 'rgb(44, 72, 161)',
//                        strokeColor: '#7084be',
                        lineTailCap: 'arrow-tail',
                        lineHeadCap: 'arrow-head'
                    }
                });
                // Create a patterned polyline:
                var routeArrows = new H.map.Polyline(linestring, {
                    style: {
                        lineWidth: 5,
                        fillColor: '#fff',
                        strokeColor: 'rgba(255, 255, 255, 1)',
                        lineDash: [0, 10],
                        lineTailCap: 'arrow-tail',
                        lineHeadCap: 'arrow-head'
                        }
                });

                totalLength += section.summary.length;
                totalDuration += section.summary.duration;
                // Add the route polyline and the two markers to the map:
                //map.addObjects([routeLine, startMarker, endMarker]);
                //map.addObjects([routeLine]);
                var routeLine = new H.map.Group();
                routeLine.addObjects([routeOutline, routeArrows]);
                map.addObject(routeLine);
                //push this route to array route
                listRoute.push(routeLine);
                // Set the map's viewport to make the whole route visible:
                //hien thi dung vung duoc chon ( dai khai la the)

                map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
                document.getElementById("panel").innerHTML = '';
                document.getElementById("panel").innerHTML += '<h2>Recommended ways to go</h2>';
                if (destinationName) {
                    if (!startName) {
                        startName = 'Current location';
                    }
                    document.getElementById("panel").innerHTML += '<h3>From: ' + startName + '</h3>';
                    document.getElementById("panel").innerHTML += '<h3>To: ' + destinationName + '</h3>';
                }

                document.getElementById("panel").innerHTML += '<p style="font-weight:600;">' + 'Distance: ' + totalLength / 1000 + ' km' + '</p>';
                document.getElementById("panel").innerHTML += '<p style="font-weight:600;">Time taken: ' + totalDuration.toMS() + '<p>';
                section.actions.forEach((action) => {
                    var spanArrow = `<span class="arrow ${(action.direction || '') + action.action}"></span>`;
                    document.getElementById("panel").innerHTML += '<p>' + spanArrow + action.instruction + '</p>';
                });
                return;
            });
        })
    }
}

var onError = function (error) {
    console.log(error);
}

var onGetPlace = function (result) {
    var address = result.Response.View[0].Result[0].Location.Address.Label;
}

/*
 * 
 * @param {type} params parameter to looking directions
 * var params = {
 transportMode: 'car',
 routingMode: 'fast',
 origin: '100.1212,100.002',
 via: '101.212,101.2323',
 //        destination: '101.333,101,2323',
 //        alternatives: "1",cac duong khac
 return: 'polyline,summary,actions,instructions',
 span: "speedLimit"
 }
 * @returns {undefined}
 */
function direct(params) {
    router.calculateRoute(params, onResult, onError);
}
/*
 * object of coord = {
 *      lat: '',
 *      lng: '',
 * }
 * @return {object address at onGetPlace}
 */
function getPlace(coords) {
    if (!coords) {
        return;
    }
    var params = {
        mode: "retrieveAddresses",
        maxresults: 1,
        prox: coords.lat + ',' + coords.lng
    }
    getcoderService.reverseGeocode(params, onGetPlace, onError);
}
//change second to format minutes + seconds
Number.prototype.toMS = function () {
    return Math.floor(this / 60) + ' minutes ' + (this % 60) + ' seconds';
}