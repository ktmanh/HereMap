<style>
    .menuBtn{
        margin: 40px;
        width: 300px;
    }
    .dropLi{
        -webkit-border-radius: 4px;
        -webkit-background-clip: padding-box;
        -moz-border-radius: 4px;
        -moz-background-clip: padding;
        border-radius: 4px;
        background-clip: padding-box;
        background: #d5d5d5;
        color: #666;
        font-size: 14px;
        margin: 0 0 3px;
        padding: 10px 15px;
        position: relative;
        text-transform: capitalize;
        font-weight: 600;
        text-transform: capitalize;
    }
    .ulList{
        width: 100%;
    }
</style>

<div>
    <div class="menuBtn">
        
    </div>
</div>
<?php //die; ?>
<script>
    var dropDown = [
        [
            {
                name: 'Restaurant',
                type: '100-1000'
            },
            {
                name: 'North American',
                type: '100-100'
            },
            {
                name: 'Asian',
                type: '100-200'
            },
            {
                name: 'European',
                type: '100-300'
            },
            {
                name: 'South American',
                type: '100-400'
            },
            {
                name: 'Restaurant',
                type: '100-1000'
            },
            {
                name: 'African',
                type: '100-500'
            },
            {
                name: 'Oceanic',
                type: '100-800'
            },
            {
                name: 'General',
                type: '100-800'
            }
        ],
        [
            {
                name: 'Nightlife Entertainment',
                type: '200-2000'
            },
            {
                name: 'Cinema',
                type: '200-2100'
            },
            {
                name: 'Theatre, Music and Culture',
                type: '200-2200'
            },
            {
                name: 'Gambling Lottery Betting',
                type: '200-2300'
            }
        ],
        [
            {
                name: 'Sights and Museums',
                type: '300-3100'
            },
            {
                name: 'Landmark Attraction',
                type: '300-3000'
            },
            {
                name: 'Religious Place',
                type: '300-3200'
            },
            {
                name: 'Natural and Geographical',
                type: '350'
            }
        ],

        [
            {
                name: 'Airport',
                type: '400-4000'
            },
            {
                name: 'Public Transport',
                type: '400-4100'
            },
            {
                name: 'Cargo Transportation',
                type: '400-4200'
            },
            {
                name: 'Rest Area',
                type: '400-4300'
            }
        ],
        [
            {
                name: 'Outdoor-Recreation',
                type: '550-5510'
            },
            {
                name: 'Leisure',
                type: '550-5520'
            },
        ],
        [
            {
                name: 'Convenience Store',
                type: '600-6000'
            },
            {
                name: ' Mall-Shopping Complex',
                type: '600-6100'
            },
            {
                name: 'Department Store',
                type: '600-6200'
            },
            {
                name: 'Food and Drink',
                type: '600-6300'
            },
            {
                name: 'Drugstore or Pharmacy',
                type: '600-6400'
            },
            {
                name: 'Electronics',
                type: '600-6500'
            },
            {
                name: 'Hardware, House and Garden',
                type: '600-6600'
            },
            {
                name: 'Bookstore',
                type: '600-6500'
            },
            {
                name: 'Clothing and Accessories',
                type: '600-6800'
            },
            {
                name: 'Consumer Goods',
                type: '600-6900'
            },
            {
                name: 'Hair and Beauty',
                type: '600-6950'
            }
        ],
        [
            {
                name: 'Banking',
                type: '700-7000'
            },
            {
                name: 'ATM',
                type: '700-7010'
            },
            {
                name: 'Money-Cash Services',
                type: '700-7050'
            },
            {
                name: 'Post Office',
                type: '700-7450'
            },
            {
                name: 'Car Repair-Service',
                type: '700-7850'
            }
        ],
        [
            {
                name: 'Hospital or Health Care Facility',
                type: '800-8000'
            },
            {
                name: 'Government or Community Facility',
                type: '800-8100'
            },
            {
                name: 'Education Facility',
                type: '800-8200'
            },
            {
                name: 'Library',
                type: '800-8300'
            },
            {
                name: 'Parking',
                type: '800-8500'
            },
            {
                name: 'Sports Facility Venue',
                type: '800-8600'
            },
            {
                name: 'Parking',
                type: '8500'
            },
            {
                name: 'Library',
                type: '800-8300'
            },
            {
                name: 'Parking',
                type: '8500'
            }
        ],
        [
            {
                name: 'City, Town or Village',
                type: '900-9100'
            },
            {
                name: 'Outdoor Area-Complex',
                type: '900-9100'
            },
            {
                name: 'Building',
                type: '900-9300'
            },
            {
                name: 'Administrative Region-Streets',
                type: '900-9400'
            },
            {
                name: 'Parking',
                type: '800-8500'
            },
            {
                name: 'Sports Facility Venue',
                type: '800-8600'
            },
            {
                name: 'Parking',
                type: '8500'
            },
            {
                name: 'Library',
                type: '800-8300'
            },
            {
                name: 'Parking',
                type: '8500'
            }
        ]
    ];
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
    var menuList = document.querySelector('.menuBtn');
    var dropDownOptions = {"Eat_And_Drink": [{"name": "Restaurant", "type": "100-1000"}, {"name": "North American", "type": "100-100"}, {"name": "Asian", "type": "100-200"}, {"name": "European", "type": "100-300"}, {"name": "South American", "type": "100-400"}, {"name": "Restaurant", "type": "100-1000"}, {"name": "African", "type": "100-500"}, {"name": "Oceanic", "type": "100-800"}, {"name": "General", "type": "100-900"}], "Entertainment": [{"name": "Nightlife Entertainment", "type": "200-2000"}, {"name": "Cinema", "type": "200-2100"}, {"name": "Theatre, Music and Culture", "type": "200-2200"}, {"name": "Gambling Lottery Betting", "type": "200-2300"}], "Sights_and_Museums": [{"name": "Sights and Museums", "type": "300-3100"}, {"name": "Landmark Attraction", "type": "300-3000"}, {"name": "Religious Place", "type": "300-3200"}, {"name": "Natural and Geographical", "type": "350"}], "Natural_and_Geographical": [{"name": "Airport", "type": "400-4000"}, {"name": "Public Transport", "type": "400-4100"}, {"name": "Cargo Transportation", "type": "400-4200"}, {"name": "Rest Area", "type": "400-4300"}], "Leisure_and_Outdoor": [{"name": "Outdoor-Recreation", "type": "550-5510"}, {"name": "Leisure", "type": "550-5520"}], "Shopping": [{"name": "Convenience Store", "type": "600-6000"}, {"name": " Mall-Shopping Complex", "type": "600-6100"}, {"name": "Department Store", "type": "600-6200"}, {"name": "Food and Drink", "type": "600-6300"}, {"name": "Drugstore or Pharmacy", "type": "600-6400"}, {"name": "Electronics", "type": "600-6500"}, {"name": "Hardware, House and Garden", "type": "600-6600"}, {"name": "Bookstore", "type": "600-6500"}, {"name": "Clothing and Accessories", "type": "600-6800"}, {"name": "Consumer Goods", "type": "600-6900"}, {"name": "Hair and Beauty", "type": "600-6950"}], "Business_and_Services": [{"name": "Banking", "type": "700-7000"}, {"name": "ATM", "type": "700-7010"}, {"name": "Money-Cash Services", "type": "700-7050"}, {"name": "Post Office", "type": "700-7450"}, {"name": "Car Repair-Service", "type": "700-7850"}], "Facilities": [{"name": "Hospital or Health Care Facility", "type": "800-8000"}, {"name": "Government or Community Facility", "type": "800-8100"}, {"name": "Education Facility", "type": "800-8200"}, {"name": "Library", "type": "800-8300"}, {"name": "Parking", "type": "800-8500"}, {"name": "Sports Facility Venue", "type": "800-8600"}, {"name": "Parking", "type": "8500"}, {"name": "Library", "type": "800-8300"}, {"name": "Parking", "type": "8500"}], "Areas_and_Buildings": [{"name": "City, Town or Village", "type": "900-9100"}, {"name": "Outdoor Area-Complex", "type": "900-9200"}, {"name": "Building", "type": "900-9300"}, {"name": "Administrative Region-Streets", "type": "900-9400"}, {"name": "Parking", "type": "800-8500"}, {"name": "Sports Facility Venue", "type": "800-8600"}, {"name": "Parking", "type": "8500"}, {"name": "Library", "type": "800-8300"}, {"name": "Parking", "type": "8500"}]};
    for (let prop in dropDownOptions) {
        let obj = {};
        obj.name = prop;
        obj.data = dropDownOptions[prop];
        //console.log(obj);
        addButton(obj);
    }
    function addButton(button) {
//        var btn = document.createElement('div');
//        btn.classList.add('btn');
//        btn.setAttribute('onclick', "onShow(this,event)");
//        btn.innerHTML += `<span>${button.name.replaceAll("_", " ")}</span>`;
        var ulList = document.createElement('ulList');
        ulList.classList.add('ulList');
//        console.log(button.data);
        for (let arr of button.data) {
//            console.log(data);
//            console.log(arr.type);
            ulList.innerHTML += `<div class="text-overflow dropLi" data-type="${arr.type}" data-query="${arr.name}" title="${arr.name}">${arr.name}</div>`;
        }
        menuList.appendChild(ulList);
    }
</script>