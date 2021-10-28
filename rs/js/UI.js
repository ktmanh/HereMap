//khai bao cac UI can thiet va xu ly
//define variables
let range, categoryOptions, transportOptions, routingOptions, dropDownOptions, trans_mode;
categoryOptions = [{
    "name": "hotel",
    "type": "500-5000",
    "image": pathImage + "hotels-off.png"
}, {
    "name": "food",
    "type": "100-1000",
    "image": pathImage + "food-off.png"
}, {
    "name": "coffee",
    "type": "100-1100",
    "image": pathImage + "coffee-off.png"
}, {
    "name": "shopping",
    "type": "600-6100-0062",
    "image": pathImage + "shopping-off.png"
}, {
    "name": "gas",
    "type": "700-7600",
    "image": pathImage + "gas-off.png"
}];
transportOptions = [{
    "name": "Car",
    "type": "car",
    "image": pathImage + "transportmode/car.svg"
}, {
    "name": "Walk",
    "type": "pedestrian",
    "image": pathImage + "transportmode/walk.svg"
}, {
    "name": "bicycle",
    "type": "bicycle",
    "image": pathImage + "transportmode/bicycle.svg"
}, {
    "name": "Truck",
    "type": "truck",
    "image": pathImage + "transportmode/truck.svg"
}];
routingOptions = [{
    "name": "Fastest",
    "type": "fast",
    "image": pathImage + "routingmode/fastest.svg"
}, {
    "name": "Shortest",
    "type": "short",
    "image": pathImage + "routingmode/shortest.svg"
}];
dropDownOptions = {
    "Eat_And_Drink": [{
        "name": "Restaurant",
        "type": "100-1000"
    }, {
        "name": "North American",
        "type": "100-100"
    }, {
        "name": "Asian",
        "type": "100-200"
    }, {
        "name": "European",
        "type": "100-300"
    }, {
        "name": "South American",
        "type": "100-400"
    }, {
        "name": "African",
        "type": "100-500"
    }, {
        "name": "Oceanic",
        "type": "100-800"
    }, {
        "name": "General",
        "type": "100-900"
    }],
    "Entertainment": [{
        "name": "Nightlife Entertainment",
        "type": "200-2000"
    }, {
        "name": "Cinema",
        "type": "200-2100"
    }, {
        "name": "Theatre, Music and Culture",
        "type": "200-2200"
    }, {
        "name": "Gambling Lottery Betting",
        "type": "200-2300"
    }],
    "Sights_and_Museums": [{
        "name": "Landmark Attraction",
        "type": "300-3000"
    }, {
        "name": "Museum",
        "type": "300-3100"
    }, {
        "name": "Religious Place",
        "type": "300-3200"
    }, {
        "name": "Natural and Geographical",
        "type": "350"
    }],
    "Transport": [{
        "name": "Airport",
        "type": "400-4000"
    }, {
        "name": "Public Transport",
        "type": "400-4100"
    }, {
        "name": "Cargo Transportation",
        "type": "400-4200"
    }, {
        "name": "Rest Area",
        "type": "400-4300"
    }],
    "Leisure_and_Outdoor": [{
        "name": "Outdoor-Recreation",
        "type": "550-5510"
    }, {
        "name": "Leisure",
        "type": "550-5520"
    }],
    "Shopping": [{
        "name": "Convenience Store",
        "type": "600-6000"
    }, {
        "name": " Mall-Shopping Complex",
        "type": "600-6100"
    }, {
        "name": "Department Store",
        "type": "600-6200"
    }, {
        "name": "Food and Drink",
        "type": "600-6300"
    }, {
        "name": "Drugstore or Pharmacy",
        "type": "600-6400"
    }, {
        "name": "Electronics",
        "type": "600-6500"
    }, {
        "name": "Hardware, House and Garden",
        "type": "600-6600"
    }, {
        "name": "Bookstore",
        "type": "600-6500"
    }, {
        "name": "Clothing and Accessories",
        "type": "600-6800"
    }, {
        "name": "Consumer Goods",
        "type": "600-6900"
    }, {
        "name": "Hair and Beauty",
        "type": "600-6950"
    }],
    "Business_and_Services": [{
        "name": "Banking",
        "type": "700-7000"
    }, {
        "name": "ATM",
        "type": "700-7010"
    }, {
        "name": "Money-Cash Services",
        "type": "700-7050"
    }, {
        "name": "Post Office",
        "type": "700-7450"
    }, {
        "name": "Car Repair-Service",
        "type": "700-7850"
    }],
    "Facilities": [{
        "name": "Hospital or Health Care Facility",
        "type": "800-8000"
    }, {
        "name": "Government or Community Facility",
        "type": "800-8100"
    }, {
        "name": "Education Facility",
        "type": "800-8200"
    }, {
        "name": "Library",
        "type": "800-8300"
    }, {
        "name": "Parking",
        "type": "800-8500"
    }, {
        "name": "Sports Facility Venue",
        "type": "800-8600"
    }],
    "Areas_and_Buildings": [{
        "name": "City, Town or Village",
        "type": "900-9100"
    }, {
        "name": "Outdoor Area-Complex",
        "type": "900-9200"
    }, {
        "name": "Building",
        "type": "900-9300"
    }, {
        "name": "Administrative Region-Streets",
        "type": "900-9400"
    }]
};
let domCategory = document.querySelector('.flex-categories');
let domTransport = document.querySelector('.flex-transports');
let domRoute = document.querySelector('.flex-route');
let menuList = document.querySelector('.menuBtn');
let extendMenu = document.querySelector('.extendMenu');
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
let formContainer = document.querySelector('.form-container');
output.innerHTML = slider.value;
//add categories
addCategory(categoryOptions, domCategory, 'nearMe');
addCategory(transportOptions, domTransport, 'transportMode');

//slideToggle ul list
function onShow(element, e) {
    let ulShow = element.querySelector('.ulList');
    let display = window.getComputedStyle(ulShow).display;
    if (display === 'none') {
        for (let ele of document.querySelectorAll('.ulList')) {
            ele.style.display = 'none';
        }
        display = 'block';
    } else {
        display = 'none';
    }
    ulShow.style.display = display;
}
//loop dropdown list
for (let prop in dropDownOptions) {
    let obj = {};
    obj.name = prop;
    obj.data = dropDownOptions[prop];
    //console.log(obj);
    addButton(obj);
}
//add dropdown list
function addButton(button) {
    var div = document.createElement('div');
    div.classList.add('onshow-div');
    div.innerHTML = `<h2 class="h2-show">${button.name.replace(/_/g, " ")}</h2>`;
    var ulList = document.createElement('ul');
    ulList.classList.add('ulList');
    for (let arr of button.data) {
        ulList.innerHTML += `<li class="text-overflow dropLi" onclick="nearMe(this)" data-type="${arr.type}" data-query="${arr.name}" title="${arr.name}">${arr.name}</li>`;
    }
    div.appendChild(ulList);
    menuList.appendChild(div);
}
//add dropdown list
function addCategory(arr, dom, func) {
    for (let element of arr) {
        let button = document.createElement('button');
        button.classList.add('pickButton');
        button.setAttribute('onclick', func + "(this)");
        button.dataset.query = element.name;
        button.dataset.type = element.type;
        button.innerHTML = `<img width="46" height="46" src="${element.image}" alt="${element.name}" title="${element.name}"/>`;
        dom.appendChild(button);
    }
}
//value of range
slider.oninput = function () {
    range = this.value;
    output.innerHTML = this.value;
}
slider.addEventListener('mouseup', function () {
    range = this.value * 1000;
    Shell.search_place.radius = range;
    Shell.search_place.searchingPlace();
})
document.querySelector(".iconDirections").addEventListener('mouseover', function () {
    let S = document.querySelector(".searchLocation");
    S.style.cssText = "border-top-right-radius: 0;border-bottom-right-radius: 0;";
});
document.querySelector(".iconDirections").addEventListener('mouseout', function () {
    let S = document.querySelector(".searchLocation");
    S.style.cssText = "border-top-right-radius: 8px;border-bottom-right-radius: 8px;";
});
document.querySelector('#limitFinding').addEventListener('change', function () {
    Shell.search_place.limit = this.value;
    Shell.search_place.searchingPlace();

});
//js menu_layout
var mainNav = {
    closeMenu: function () {
        document.querySelector('.menu_layout').style.left = '-100%';

    },
    openMenu: function () {
        document.querySelector('.menu_layout').style.left = '0';
        //        document.querySelector('.form-container').style.left = '-100%';
    },
    OpenMap: function () {
        document.querySelector('.menu_layout').style.left = '-100%';
        document.querySelector('.flex-top-form').style.display = 'block';
        document.querySelector('.flex-form').style.display = 'none';
    },
    OpenDirection: function () {
        document.querySelector('.flex-top-form').style.display = 'none';
        document.querySelector('.flex-form').style.display = 'block';
        document.querySelector('.menu_layout').style.left = '-100%';
    },
    openGuide: function () {
        var element = document.querySelector('.guide');
        let display = window.getComputedStyle(element).display;
        if (display === 'none') {
            display = 'block';
        } else {
            display = 'none';
        }
        element.style.display = display;
    },
    openVia: function () {
        document.querySelector('#viaForm').style.display = 'block';
        document.querySelector('.addVia').style.display = 'none';
    },
    closeVia: function (flag = false) {
        document.querySelector('#viaForm').style.display = 'none';
        document.querySelector("#field-via-destination").value = null;
        document.querySelector('.addVia').style.display = 'flex';
        let mid = Shell.mapper.marker_list.getMarkerByType(MarkerType.VIA);
        if (mid) {
            let marker = Shell.mapper.marker_list.markers[mid];
            Shell.mapper.router.removeMarker(marker);
            Shell.mapper.marker_list.removeMarkerByType(MarkerType.VIA);
        }
        Shell.mapper.router.showDirection();
    },
    back: function () {
        document.querySelector('.flex-top-form').style.display = 'block';
        document.querySelector('.flex-form').style.display = 'none';
        Shell.search_suggest.clearFormValue();
        Shell.mapper.marker_list.clearMarkerOnMap();

    },
    showDirectionBox: function () {
        document.querySelector('.flex-top-form').style.display = 'none';
        document.querySelector('.flex-form').style.display = 'block';
    },
    //show hide categories
    showMore: function () {
        var display = window.getComputedStyle(extendMenu, null);
        if (display.display == 'none') {
            this.innerHTML = 'Hide';
            extendMenu.style.display = 'block';
        } else {
            this.innerHTML = 'More Options';
            extendMenu.style.display = 'none';
            document.querySelector(".findingCategory").innerHTML = null;
        }
    },
    hiddenFixedBox: function (element) {
        var display = window.getComputedStyle(formContainer, null);
        if (display.left == 0 || display.left == '0px') {
            formContainer.style.left = '-400px';
            element.innerHTML = ">";
        } else {
            formContainer.style.left = '0';
            element.innerHTML = "<";
        }
    },
    openAboutUs: function () {
        var element = document.querySelector('.about');
        let display = window.getComputedStyle(element).display;
        if (display === 'none') {
            display = 'block';
        } else {
            display = 'none';
        }
        element.style.display = display;
    },
    showRouteLine() {
        Shell.mapper.router.showDirection();
    },
    fillColorTransportMode(mode) {
        let param_mode = '.pickButton[data-type=' + '"' + mode + '"]';
        if (mode != trans_mode) {
            let list_trans = document.querySelectorAll(".flex-transports .pickButton");
            for (let trans of list_trans) {
                trans.classList.remove("userchoice");
            }
        }
        document.querySelector(param_mode).classList.add("userchoice");
        trans_mode = mode;
    }
}

