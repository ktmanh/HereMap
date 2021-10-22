//Goi y tim dia diem tu input



//https://developer.here.com/documentation/geocoder/dev_guide/topics/quick-start-geocode.html
//from locationID find location of this
//https://developer.here.com/documentation/geocoder-autocomplete/dev_guide/topics/example-location-id.html
//parameter query to get data
//https://developer.here.com/documentation/geocoder-autocomplete/dev_guide/topics/resource-suggest.html
//https://developer.here.com/documentation/geocoding-search-api/api-reference-swagger.html
//https://developer.here.com/documentation/geocoder-autocomplete/dev_guide/topics/resource-suggest.html

var fieldLocation = document.getElementById("field-location");
var fieldDestination = document.getElementById("field-destination");
var fieldStarting = document.getElementById("fieldStarting");
var fieldViaDestination = document.getElementById("field-via-destination");

var suggestionStarting = document.getElementById("suggestionStarting");
var suggestionLocation = document.getElementById("suggestionLocation");
var suggestionDestination = document.getElementById("suggestionDestination");
var suggestionViaDestination = document.getElementById("suggestionViaDestination");

var typingTimer;
var doneTypingInterval = 200;
var query = '';
var AUTOCOMPLETION_URL = 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json';
var AUTOCOMPLETE_URL = "https://autocomplete.search.hereapi.com/v1/autocomplete";
var AUTOSUGGEST_URL = "https://autosuggest.search.hereapi.com/v1/autosuggest";
var LOCATIONID_URL = 'https://geocoder.ls.hereapi.com/6.2/geocode.json';

fieldStarting.addEventListener('keyup', function (e) {
    clearTimeout(typingTimer);
    if (fieldStarting.value) {
        typingTimer = setTimeout(function () {
            var value = fieldStarting.value;
            autoCompleteListener(fieldStarting, suggestionStarting, 'start');
        }, doneTypingInterval);
    } else {
        suggestionStarting.style.maxHeight = '0';
    }
});

fieldViaDestination.addEventListener('keyup', function (e) {
    clearTimeout(typingTimer);
    if (fieldViaDestination.value) {
        typingTimer = setTimeout(function () {
            var value = fieldViaDestination.value;
            autoCompleteListener(fieldViaDestination, suggestionViaDestination, 'via');
        }, doneTypingInterval);
    } else {
        suggestionViaDestination.style.maxHeight = '0';
    }
});

fieldLocation.addEventListener('keyup', function (e) {
    clearTimeout(typingTimer);
    if (fieldLocation.value) {
        typingTimer = setTimeout(function () {
            var value = fieldLocation.value;
            autoCompleteListener(fieldLocation, suggestionLocation, 'start');
        }, doneTypingInterval);
    } else {
        suggestionLocation.style.maxHeight = '0';
    }
});
fieldDestination.addEventListener('keyup', function (e) {
    clearTimeout(typingTimer);
    if (fieldDestination.value) {
        typingTimer = setTimeout(function () {
            var value = fieldDestination.value;
            autoCompleteListener(fieldDestination, suggestionDestination, 'des');
        }, doneTypingInterval);
    } else {
        suggestionDestination.style.maxHeight = '0';
    }
});


/*
 * textbox: where to get value of input
 * suggest: place to for reslut
 * flag: this query belong to which group?( start, via, des)
 */

function autoCompleteListener(textBox, suggest, flag) {
    if (query != textBox.value) {
        if (textBox.value.length) {
            var atPosition;
            if (pickLocation) {
                atPosition = pickLocation;
            } else {
                atPosition = myPosition;
            }
            var parms = '?' +
                    'q=' + encodeURIComponent(textBox.value) +
                    '&limit=10' +
                    '&at=' + atPosition.lat + ',' + atPosition.lng +
                    '&apikey=' + APIKEY;
            request(AUTOSUGGEST_URL + parms).then(function (data) {
                if (data.items.length) {
                    suggest.innerHTML = '';
                    suggest.style.maxHeight = '500px';
                    data.items.forEach((item) => {
                        var li = document.createElement('li');
                        if (!item.address) {
                            return;
                        }
                        li.innerHTML = item.address.label;
                        //li.dataset.position = item.position.lat + ',' + item.position.lng;
                        suggest.appendChild(li);
                        li.addEventListener('click', function () {
                            suggest.style.maxHeight = '0';
                            textBox.value = item.address.label;
//                            textBox.dataset.position = item.position.lat + ',' + item.position.lng;
                            textBox.dataset.position = JSON.stringify(item.position);
                            let position = li.dataset.position;
                            let paramMaker = {
                                coords: item.position,
                                icon: {icon: ICON.iconstart, volatility: true},
                                content: item.address.label
                            }
                            if (flag == 'start') {
                                startName = item.address.label;
                                removeMarker('start');
                                addMarkerHere(paramMaker, false, 'start');
                                pickLocation = item.position;
                                if (textBox.id == "fieldStarting") {
                                    fieldLocation.value = item.address.label;
                                    fieldLocation.dataset.position = JSON.stringify(item.position);
                                } else {
                                    fieldDestination.focus();
                                }
                            } else if (flag == 'des') {
                                destinationName = item.address.label;
                                paramMaker.icon.icon = ICON.icondestination;
                                removeMarker('des');
                                addMarkerHere(paramMaker, false, 'des');
                                document.querySelector(".getDirection").click();
                            } else if (flag == 'via') {
                                viaName = item.address.label;
                                paramMaker.icon.icon = ICON.vialocation;
                                removeMarker('via');
                                addMarkerHere(paramMaker, false, 'via');
                                if (fieldViaDestination.dataset.position) {
                                    document.querySelector(".getDirection").click();
                                }
                            }
                            map.setCenter(item.position);
                            map.setZoom(zoomMap.street);
                        })
                    });
                }
            })
        }
    }
    query = textBox.value;
}

let direction = document.querySelector(".getDirection");
direction.addEventListener('click', function () {
//    removeMarker();
    removeRoute();
    var A = JSON.parse(fieldLocation.getAttribute('data-position'));
    if (!A) {
        if (pickLocation) {
            A = pickLocation;
        } else {
            A = myPosition;
        }
    }

    let B = JSON.parse(fieldDestination.getAttribute('data-position'));
    if (!B) {
        alert('Please pick destination!');
        return;
    }
    let viaS = fieldViaDestination.getAttribute('data-position');
    if (viaS) {
        via = JSON.parse(viaS);
    }
    pickDestination = B;
    var params = {
        transportMode: transportModeType,
        routingMode: routingModeType,
        origin: A.lat + ',' + A.lng,
//        destination: B.lat + ',' + B.lng,
//        alternatives: "3",
        return: 'polyline,summary,actions,instructions',
        span: "speedLimit"
    }
    if (routingModeType == "pedestrian") {
        params.routingMode = 'short';
    }
    if (via) {
        params.via = via.lat + ',' + via.lng;
    }

    params.destination = B.lat + ',' + B.lng;
    direct(params);
})

