//Tim kiem dia diem nhu hotel, hospital...
//search
var geoCoder = platform.getSearchService();
function getIsoCodeBrowser() {
    navigator.geolocation.getCurrentPosition(
            function (successFunction) {
                console.log(successFunction);
            },
            function (err) {
                console.log(err);
            },
            {"requestAddress": true}
    );
}
/*
 * parmams to search category
 * let paramGeoSearch = {
 q: 'hotel,
 in: 'circle:100.242,22,11;r=10000',
 categories: 500,
 limit: 10
 }
 */
function searchCoderSearchItem(params) {
    var responseSearch = function (results) {
        var icon;
        switch (params.categories) {
            case '500-5000':
                icon = ICON.hotelA;
                break;
            case '100-1000':
                icon = ICON.foodA;
                break;
            case '100-1100':
                icon = ICON.coffeeA;
                break;
            case '600-6100-0062':
                icon = ICON.shoppingA;
                break;
            case '700-7600':
                icon = ICON.gasA;
                break;
            case '400-4000':
                icon = ICON.airPortA;
                break;
            case '700-7010':
                icon = ICON.atmA;
                break;
            case '800-8000':
                icon = ICON.hospitalA;
                break;
            case '800-8200':
                icon = ICON.schoolsA;
                break;
            default :
                var categoryCode = params.categories.slice(0, 3);
                switch (categoryCode) {
                    case '100':
                        icon = ICON.food;
                        break;
                    case '200':
                        icon = ICON.entertainment;
                        break;
                    case '350':
                        icon = ICON.natural;
                        break;
                    case '300':
                        icon = ICON.place;
                    case '400':
                        icon = ICON.transport;
                        break;
                    case '500':
                        icon = ICON.hotel;
                        break;
                    case '550':
                        icon = ICON.outdoor;
                        break;
                    case '600':
                        icon = ICON.shopping;
                        break;
                    case '700':
                        icon = ICON.service;
                        break;
                    case '800':
                        icon = ICON.facilities;
                        break;
                    case '900':
                        icon = ICON.buiding;
                        break;
                    default:
                        icon = ICON.searchicon;
                        break;
                }
                break;
        }

        if (results.items.length) {
            results.items.forEach(item => {
                let obj = {
                    coords: item.position,
                    icon: {icon: icon, volatility: false},
                    content: item.address.label
                }
                addMarkerHere(obj, false);
            })
            map.setZoom(zoomMap.street);
            if (pickLocation) {
                map.setCenter(pickLocation, true);
            } else {
                map.setCenter(myPosition, true);
            }

        }
    }

    var errorSearch = function (err) {
        console.log(err);
    }
    geoCoder.discover(params, responseSearch, errorSearch);
}