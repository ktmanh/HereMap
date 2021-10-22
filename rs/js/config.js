class Config {
    static APITKEY = APIKEY;
    static url_geo_reserver = "https://revgeocode.search.hereapi.com/v1/revgeocode?apikey=" + APIKEY + "&mode=retrieveAddresses&maxresults=1&";
    static AUTOSUGGEST_URL = "https://autosuggest.search.hereapi.com/v1/autosuggest?apikey=" + APIKEY + "&limit=10";
    static AUTOCOMPLETE_URL = "https://autocomplete.search.hereapi.com/v1/autocomplete?apikey=" + APIKEY + "&limit=10&";
    static AUTOSUGGEST_JSON = "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apikey=" + APIKEY + "&maxresults=10&beginHighlight=<b>&endHighlight=</b>";
    
    static default_position = pos;
    static radius = 10000;
    static limit = 10;
}
class ZoomMap {
    static house = 18;
    static intersection = 16;
    static street = 15;
    static district = 14;
    static city = 13;
    static state = 10;
    static country = 8;

}
class MarkerType {
    static CURRENT = 0; // vi tri hien tai cua user ( co the chinh xac)
    static START = 1; //diem bat dau
    static VIA = 2; //diem trung gian
    static DEST = 3; //diem den
    static PLACE = 4; //dia diem


    static getName(type) {
        switch (type) {
            case MarkerType.START:
                return "Start point";
            case MarkerType.VIA:
                return "Via point";
            case MarkerType.DEST:
                return "Dest point";
            case MarkerType.PLACE:
                return "Place";
        }
    }
}
class Icon {
    static size = { size: { w: 24, h: 24 } };
    static size_large = { size: { w: 32, h: 32 } };
    static ICON = {
        current_location: pathImage + "poi.png",
        start_point: pathImage + "start.png",
        via_point: pathImage + "via.png",
        destination_point: pathImage + "finish.png",
        food: pathImage + "categories/food.png",
        hotel: pathImage + "categories/hotels.png",
        coffee: pathImage + "categories/coffee.png",
        shopping: pathImage + "categories/shopping.png",
        gas: pathImage + "categories/gas.png",
        air_port: pathImage + "categories/airports.png",
        atm: pathImage + "categories/ATM.png",
        hospital: pathImage + "categories/hospital.png",
        schools: pathImage + "categories/schools.png",
        entertainment: pathImage + "categories/entertainment.svg",
        place: pathImage + "categories/place.svg",
        natural: pathImage + "categories/natural.svg",
        transport: pathImage + "categories/transport_station.svg",
        outdoor: pathImage + "categories/outdoor.svg",
        business: pathImage + "categories/business.svg",
        service: pathImage + "categories/service.svg",
        facilities: pathImage + "categories/facilities.svg",
        buiding: pathImage + "categories/building.svg",
        search: pathImage + "circle.png",
    };

}
class MarkerCode {
    static current_location = "0";
    static start_point = "1";
    static via_point = "2";
    static destination_point = "3";
    static hotel = "500-500";
    static food = "100-1000";
    static coffee = "100-1100";
    static shopping = "600-6100-0062";
    static gas = "700-7600";
    static air_port = "400-4000";
    static atm = "700-7010";
    static hospital = "800-8000";
    static school = "800-8200";
    static food_base = "100";
    static entertainment = "200";
    static place = "300";
    static natural = "350";
    static transport = "400";
    static hotel_base = "500";
    static outdoor = "550";
    static shopping_base = "600";
    static service = "700";
    static facilities = "800";
    static buiding = "900";
    static search = "";

    static getIcon(code) {
        switch (code) {
            case MarkerCode.current_location: return Icon.ICON.current_location;
            case MarkerCode.start_point: return Icon.ICON.start_point;
            case MarkerCode.via_point: return Icon.ICON.via_point;
            case MarkerCode.destination_point: return Icon.ICON.destination_point;
            case MarkerCode.hotel: return Icon.ICON.hotel;
            case MarkerCode.food: return Icon.ICON.food;
            case MarkerCode.coffee: return Icon.ICON.coffee;
            case MarkerCode.shopping: return Icon.ICON.shopping;
            case MarkerCode.gas: return Icon.ICON.gas;
            case MarkerCode.air_port: return Icon.ICON.air_port;
            case MarkerCode.atm: return Icon.ICON.atm;
            case MarkerCode.hospital: return Icon.ICON.hospital;
            case MarkerCode.school: return Icon.ICON.school;
            default:
                var categoryCode = code.slice(0, 3);
                switch (categoryCode) {
                    case MarkerCode.food_base: return Icon.ICON.food;
                    case MarkerCode.entertainment: return Icon.ICON.entertainment;
                    case MarkerCode.natural: return Icon.ICON.natural;
                    case MarkerCode.place: return Icon.ICON.place;
                    case MarkerCode.transport: return Icon.ICON.transport;
                    case MarkerCode.hotel_base: return Icon.ICON.hotel;
                    case MarkerCode.outdoor: return Icon.ICON.outdoor;
                    case MarkerCode.shopping_base: return Icon.ICON.shopping;
                    case MarkerCode.service: return Icon.ICON.service;
                    case MarkerCode.facilities: return Icon.ICON.facilities;
                    case MarkerCode.buiding: return Icon.ICON.buiding;
                    default:
                        return Icon.ICON.search;
                }
        }
    }

}
Number.prototype.toMS = function () {
    return Math.floor(this / 60) + ' minutes ' + (this % 60) + ' seconds';
}