var categoryOptions = [
    {
        name: 'hotel',
        type: '500',
        image: pathImage + "/hotels-off.png"
    },
    {
        name: 'food',
        type: '100',
        image: pathImage + "/food-off.png"
    },
    {
        name: 'coffee',
        type: '100-1100',
        image: pathImage + "/coffee-off.png"
    },
    {
        name: 'shopping',
        type: '600',
        image: pathImage + "/shopping-off.png"
    },
    {
        name: 'gas',
        type: '700-7600',
        image: pathImage + "/gas-off.png"
    }
];

var transportOptions = [
    {
        name: "Car",
        type: 'car',
        image: pathImage + "/transportmode/car.svg"
    },
    {
        name: "Walk",
        type: 'pedestrian',
        image: pathImage + "/transportmode/walk.svg"
    },
    {
        name: "bicycle",
        type: 'bicycle',
        image: pathImage + "/transportmode/bicycle.svg"
    },
    {
        name: "Truck",
        type: 'truck',
        image: pathImage + "/transportmode/truck.svg"
    },
];
var routingOptions = [
    {
        name: "Fastest",
        type: "fast",
        image: pathImage + "/routingmode/fastest.svg"
    },
    {
        name: "Shortest",
        type: "short",
        image: pathImage + "/routingmode/shortest.svg"
    }
];

const ICON1 = {
    iconstart: new H.map.Icon(pathImage + "location.svg", {size: {w: 32, h: 32}}),
    iconmaker: new H.map.Icon(pathImage + "location-pin.svg", {size: {w: 24, h: 24}}),
    searchicon: new H.map.Icon(pathImage + "circle.svg", {size: {w: 24, h: 24}}),
    food: new H.map.Icon(pathImage + "categories/food.svg", {size: {w: 24, h: 24}}),
    entertainment: new H.map.Icon(pathImage + "categories/entertainment.svg", {size: {w: 24, h: 24}}),
    sights: new H.map.Icon(pathImage + "categories/sights.svg", {size: {w: 24, h: 24}}),
    natural: new H.map.Icon(pathImage + "categories/natural.svg", {size: {w: 24, h: 24}}),
    transport: new H.map.Icon(pathImage + "categories/transport_station.svg", {size: {w: 24, h: 24}}),
    hotel: new H.map.Icon(pathImage + "categories/hotel.svg", {size: {w: 24, h: 24}}),
    outdoor: new H.map.Icon(pathImage + "categories/outdoor.svg", {size: {w: 24, h: 24}}),
    shopping: new H.map.Icon(pathImage + "categories/shopping.svg", {size: {w: 24, h: 24}}),
    business: new H.map.Icon(pathImage + "categories/business.svg", {size: {w: 24, h: 24}}),
    service: new H.map.Icon(pathImage + "categories/service.svg", {size: {w: 24, h: 24}}),
    facilities: new H.map.Icon(pathImage + "categories/facilities.svg", {size: {w: 24, h: 24}}),
    buiding: new H.map.Icon(pathImage + "categories/building.svg", {size: {w: 24, h: 24}}),
}

var dropDownOptions = {"Eat_And_Drink": [{"name": "Restaurant", "type": "100-1000"}, {"name": "North American", "type": "100-100"}, {"name": "Asian", "type": "100-200"}, {"name": "European", "type": "100-300"}, {"name": "South American", "type": "100-400"}, {"name": "African", "type": "100-500"}, {"name": "Oceanic", "type": "100-800"}, {"name": "General", "type": "100-900"}], "Entertainment": [{"name": "Nightlife Entertainment", "type": "200-2000"}, {"name": "Cinema", "type": "200-2100"}, {"name": "Theatre, Music and Culture", "type": "200-2200"}, {"name": "Gambling Lottery Betting", "type": "200-2300"}], "Sights_and_Museums": [{"name": "Landmark Attraction", "type": "300-3000"}, {"name": "Museum", "type": "300-3100"}, {"name": "Religious Place", "type": "300-3200"}, {"name": "Natural and Geographical", "type": "350"}], "Transport": [{"name": "Airport", "type": "400-4000"}, {"name": "Public Transport", "type": "400-4100"}, {"name": "Cargo Transportation", "type": "400-4200"}, {"name": "Rest Area", "type": "400-4300"}], "Leisure_and_Outdoor": [{"name": "Outdoor-Recreation", "type": "550-5510"}, {"name": "Leisure", "type": "550-5520"}], "Shopping": [{"name": "Convenience Store", "type": "600-6000"}, {"name": " Mall-Shopping Complex", "type": "600-6100"}, {"name": "Department Store", "type": "600-6200"}, {"name": "Food and Drink", "type": "600-6300"}, {"name": "Drugstore or Pharmacy", "type": "600-6400"}, {"name": "Electronics", "type": "600-6500"}, {"name": "Hardware, House and Garden", "type": "600-6600"}, {"name": "Bookstore", "type": "600-6500"}, {"name": "Clothing and Accessories", "type": "600-6800"}, {"name": "Consumer Goods", "type": "600-6900"}, {"name": "Hair and Beauty", "type": "600-6950"}], "Business_and_Services": [{"name": "Banking", "type": "700-7000"}, {"name": "ATM", "type": "700-7010"}, {"name": "Money-Cash Services", "type": "700-7050"}, {"name": "Post Office", "type": "700-7450"}, {"name": "Car Repair-Service", "type": "700-7850"}], "Facilities": [{"name": "Hospital or Health Care Facility", "type": "800-8000"}, {"name": "Government or Community Facility", "type": "800-8100"}, {"name": "Education Facility", "type": "800-8200"}, {"name": "Library", "type": "800-8300"}, {"name": "Parking", "type": "800-8500"}, {"name": "Sports Facility Venue", "type": "800-8600"}], "Areas_and_Buildings": [{"name": "City, Town or Village", "type": "900-9100"}, {"name": "Outdoor Area-Complex", "type": "900-9200"}, {"name": "Building", "type": "900-9300"}, {"name": "Administrative Region-Streets", "type": "900-9400"}]};
