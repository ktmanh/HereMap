class SearchSuggest {
    field_input_start = null;
    field_input_start_two = null;
    field_input_via = null;
    field_input_destination = null;
    suggest_start = null
    suggest_start_two = null;
    suggest_via = null;
    suggest_destination = null;
    direction = null;
    typingTimer;
    doneTypingInterval = 200;

    recent_input = {};

    constructor() {
        this.mapper = Shell.mapper;
        this.field_input_start = document.getElementById("fieldStarting");
        this.field_input_start_two = document.getElementById("field-location");
        this.field_input_via = document.getElementById("field-via-destination");
        this.field_input_destination = document.getElementById("field-destination");
        this.suggest_start = document.getElementById("suggestionStarting");
        this.suggest_start_two = document.getElementById("suggestionLocation");
        this.suggest_via = document.getElementById("suggestionViaDestination");
        this.suggest_destination = document.getElementById("suggestionDestination");
        this.direction = document.querySelector(".getDirection");
    }

    init() {
        let me = this;
        this.field_input_start.addEventListener('keyup', (res) => me.updateSuggest(me.field_input_start, MarkerType.START, me.suggest_start, true));
        this.field_input_start_two.addEventListener('keyup', (res) => me.updateSuggest(me.field_input_start_two, MarkerType.START, me.suggest_start_two));
        this.field_input_via.addEventListener('keyup', (res) => me.updateSuggest(me.field_input_via, MarkerType.VIA, me.suggest_via));
        this.field_input_destination.addEventListener('keyup', (res) => me.updateSuggest(me.field_input_destination, MarkerType.DEST, me.suggest_destination));
    }

    updateSuggest(sender, type, path_append, flag = false) {
        if (this.recent_input[sender.id]) {
            if (this.recent_input[sender.id] == sender.value) {
                return;
            }
        }
        document.addEventListener('click', function () {
            path_append.style.maxHeight = '0';
        })
        document.addEventListener('keydown', function (evt) {
            if (evt.code == "Escape") {
                path_append.style.maxHeight = '0';
            } else if (evt.code == "ArrowDown" || evt.code == "ArrowRight") {
                path_append.style.maxHeight = '500px';
            }
        })
        this.recent_input[sender.id] = sender.value;
        clearTimeout(this.typingTimer);
        let me = this;
        if (sender.value) {
            me.typingTimer = setTimeout(function () {
                let value = sender.value;
                SearchSuggest.sendRequest(value).then((res) => me.fillSuggest(res, type, path_append, sender, flag));
            }, me.doneTypingInterval);
        } else {
            path_append.style.maxHeight = '0';
        }
    }
    fillSuggest(result, type, path_append, sender, flag = false) {
        let me = this;
        let bi = new Mapper();
        if (result.items.length) {
            path_append.innerHTML = '';
            path_append.style.maxHeight = '500px';
            result.items.forEach((item) => {
                let li = document.createElement('li');
                if (!item.address) {
                    return;
                }
                let title = '';
                if (item.address.label.indexOf(item.title) < 0) {
                    title = item.title + ', ';
                }
                title += item.address.label;
                li.innerHTML += title;
                path_append.appendChild(li);
                li.addEventListener('click', function () {
                    path_append.style.maxHeight = '0';
                    sender.value = title;
                    let obj = {
                        coords: item.position,
                        content: title
                    }
                    let marker = me.mapper.marker_list.createMarker(obj, type, type.toString());
                    me.mapper.map.setCenter(marker.getPos());
                    
                    if (flag) {
                        me.field_input_start_two.value = title;
                    }
                    switch (type) {
                        case 1:
                            me.mapper.router.setStartPoint(marker);
                            break;
                        case 2:
                            me.mapper.router.setViaPoint(marker);
                            break;
                        case 3:
                            me.mapper.router.setDestPoint(marker);
                            break;
                    }
                    me.mapper.router.zoom_map_when_direction = me.mapper.router.canShowDirection();
                });

            });
        }
    }

    clearFormValue(){
        this.field_input_start.value = null;
        this.field_input_start_two.value = null;
        this.field_input_via.value = null;
        this.field_input_destination.value = null;
    }

    static sendRequest(q) {
        let position = Shell.getSelectionPosition();
        return new Promise(resolve => {
            let url = Config.AUTOSUGGEST_URL + '&q=' + encodeURIComponent(q) + '&at=' + position.lat + ',' + position.lng;
            try {
                Shell.request(url).then((res) => {
                    resolve(res);
                });
            }
            catch (err) {
                console.log(err);
                resolve({ err: err });
            }
        });
    }



}