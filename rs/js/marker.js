class Marker {
    core = null;
    type = MarkerType.PLACE;
    bubble = null;
    init(data, type) {
        this.type = type;
        if (!data || !data.coords)
            return;
        if (!data.icon) {
            data.icon = new H.map.Icon(MarkerCode.getIcon(MarkerCode.search), Icon.size_large);
        }
        this.core = new H.map.Marker(data.coords, { icon: data.icon, volatility: true });
        //this.updateInfo();
        if (data.content) {
            this.core.setData(data.content);
        }
        
        return this;
    }

    getPos() {
        return this.core.getGeometry();
    }

    getId() {
        return this.core.getId();
    }
    getMakerLabel() {
        return this.core.getData();
    }
    equals(marker_data) {
        return this.core.getId() == marker_data.getId();
    }

    showBubble() {
        if (this.core.data) {
            this._showBubble();
        }
        else {
            let me = this;
            this.updateInfo(res => {
                if (me.core.data) {
                    me._showBubble();
                }
            });
        }
    }

    _showBubble() {
        let ui = Shell.mapper.ui;
        let me = this;
        if (!this.bubble) {
            this.bubble = new H.ui.InfoBubble(me.core.getGeometry(), {
                content: me.core.getData()
            });
            this.bubble.addClass('cssBubble');
            ui.addBubble(this.bubble);
        } else {
            //if bubble is open don't need open again.
            if (this.bubble.getState() == 'open') {
                return;
            }
            //get data of marker set to bubble
            this.bubble.setPosition(this.core.getGeometry());
            this.bubble.setContent(this.core.getData());
            this.bubble.open();
        }
    }


    closeBubble() {
        let bubble = this.bubble;
        if (bubble && bubble.getState() == 'open') {
            bubble.close();
        }
    }


    //Cap nhat thong tin marker
    updateInfo(callback = null) {
        let marker = this.core;
        let coords = marker.getGeometry();
        Marker.getMarkerInfo(coords).then((res) => {
            if (res.items.length > 0) {
                marker.setData(res.items[0].title);
            }
            if (callback) callback(res);
        });
    }

    static getMarkerInfo(coords) {
        return new Promise(resolve => {
            let url = Config.url_geo_reserver + 'at=' + coords.lat + ',' + coords.lng;
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