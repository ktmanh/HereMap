/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class MarkersList {
    markers = {};
    focused_marker = null; // dang hover
    mapper = null;
    router = new Router();
    init(mapper) {
        this.mapper = mapper;
        let map = mapper.map;
        this.router = mapper.router;
        //hover vao marker hien thong tin len
        let me = this;
        map.addEventListener('pointermove', function (evt) {

            if (evt.target instanceof H.map.Marker) {
                let mid = me.getMarker(evt.target);
                if (!mid)
                    return;
                let marker = me.markers[mid];
                if (me.focused_marker != marker) {
                    if (me.focused_marker) {
                        me.focused_marker.closeBubble();
                    }
                    me.focused_marker = marker;
                    map.getViewPort().element.style.cursor = 'pointer';
                    me.focused_marker.showBubble();
                }

            } else {
                //if bubble is open don't close it
                map.getViewPort().element.style.cursor = 'auto';
                if (me.focused_marker) {
                    me.focused_marker.closeBubble();
                    me.focused_marker = null;
                }
            }
        });

        map.addEventListener('contextmenu', async function (e) {
            var coord = map.screenToGeo(e.viewportX, e.viewportY);
            let obj = {
                coords: coord,
            }
            if (e.target instanceof H.map.Marker) {
                //kiem tra xem no thuoc loai marker nao
                let mid = me.getMarker(e.target);
                if (!mid)
                    return;
                let marker = me.markers[mid];
                switch (marker.type) {
                    case MarkerType.START:
                    case MarkerType.VIA:
                    case MarkerType.DEST:
                        e.items.push(me.onDeleteMarkerContext(`Remove ${MarkerType.getName(marker.type)}`, marker));
                        break;
                    default:
                        let dest_context = me.onPlaceContext("Direction to here", marker);
                        e.items.push(dest_context);
                        break;
                }
                await new Promise(r => setTimeout(r, 10));
                me.showContextUI();

            } else {
                let start_context = me.onRouteMarkerContext("Set as starting point", obj, MarkerType.START, MarkerCode.start_point, "Starting point");
                let via_context = me.onRouteMarkerContext("Set as via point", obj, MarkerType.VIA, MarkerCode.via_point, "Via point");
                let dest_context = me.onRouteMarkerContext("Set as destination point", obj, MarkerType.DEST, MarkerCode.destination_point, "Destination point");
                let context_list = [start_context, via_context, dest_context];
                if (!me.router.canShowDirection()) {
                    context_list = [start_context, dest_context];
                }

                e.items.push(...context_list);
                let marker_info = await Marker.getMarkerInfo(coord);
                if (marker_info.err || marker_info.items.length == 0) {
                    return;
                }
                me.showContextUI();
            }
        }, false);



        map.addEventListener('dragstart', function (ev) {
            let target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                let mid = me.getMarker(target);
                if (!mid)
                    return;
                me.markers[mid].closeBubble();
                me.markers[mid].drag_start = me.markers[mid].getPos();
                let targetPosition = map.geoToScreen(target.getGeometry());
                target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                mapper.behavior.disable();
            }
        }, false);

        // re-enable the default draggability of the underlying map
        // when dragging has completed
        map.addEventListener('dragend', function (ev) {
            let target = ev.target;
            let pointer = ev.currentPointer;
            let end_pos = map.screenToGeo(pointer.viewportX, pointer.viewportY);
            if (target instanceof H.map.Marker) {
                let mid = me.getMarker(target);
                if (!mid)
                    return;
                let marker = me.markers[mid];
                marker.updateInfo((res) => {
                    if (res.err || res.items.length <= 0) {
                        marker.core.setGeometry(marker.drag_start);
                        return;
                    }
                    me.router.showDirection();
                });
                mapper.behavior.enable();
            }
        }, false);

        // Listen to the drag event and move the position of the marker
        // as necessary
        map.addEventListener('drag', function (ev) {
            let target = ev.target,
                pointer = ev.currentPointer;
            if (target instanceof H.map.Marker) {
                let new_pos = map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y);
                target.setGeometry(new_pos);
                // console.log(new_pos);
            }
        }, false);
        return this;
    }

    showContextUI() {
        let html_context = document.querySelector(".H_context_menu");
        if (html_context) {
            html_context.style.display = "block";
        }

    }

    onDeleteMarkerContext(label, marker) {
        let me = this;
        return new H.util.ContextItem({
            label: label,
            callback: function () {
                me.removeMarkerByObject(marker);
                me.router.removeMarker(marker);
            }
        });
    }

    onPlaceContext(label, marker) {
        let me = this;
        return new H.util.ContextItem({
            label: label,
            callback: function () {
                me.router.setDestPoint(marker);

            }
        })
    }

    onRouteMarkerContext(label, obj, type, code, alt_label = '') {
        let me = this;
        return new H.util.ContextItem({
            label: label,
            callback: async function () {
                let coords = obj.coords;
                let res = await Marker.getMarkerInfo(coords);
                if (res.err) {
                    return;
                }
                if (res.items.length > 0) {
                    obj.content = res.items[0].title;
                } else {
                    obj.content = alt_label;
                }
                me.removeMarkerByType(type);
                let marker = me.createMarker(obj, type, code, Icon.size_large);
                switch (type) {
                    case 1:
                        me.router.setStartPoint(marker);
                        break;
                    case 2:
                        me.router.setViaPoint(marker);
                        break;
                    case 3:
                        me.router.setDestPoint(marker);
                        break;
                }
            }
        })
    }

    createMarker(data, type = MarkerType.PLACE, code = null, size = null) {
        if (!size) {
            size = Icon.size;
        }
        if (code != null) {
            let icon = MarkerCode.getIcon(code);
            data.icon = new H.map.Icon(icon, size);
        }

        let marker = new Marker().init(data, type);
        let map = this.mapper.map;
        if (type > 0 && type < 4) {
            marker.core.draggable = true;
        }
        map.addObject(marker.core);
        this.markers[marker.getId()] = marker;
        return marker;
    }


    //Tim id marker theo du lieu core
    getMarker(target) {
        let marker = null;
        for (let mid in this.markers) {
            marker = this.markers[mid];
            if (marker.equals(target))
                return mid;
        }
        return null;
    }

    //Tim id marker theo type
    getMarkerByType(type) {
        let marker = null;
        for (let mid in this.markers) {
            marker = this.markers[mid];
            if (marker.type == type)
                return mid;
        }
        return null;
    }

    //Tim id marker theo type
    getMarkerByObject(marker) {
        for (let mid in this.markers) {
            if (this.markers[mid] == marker)
                return mid;
        }
        return null;
    }

    //Xoa marker theo type
    removeMarkerByType(type) {//PLACE
        let mid = this.getMarkerByType(type);
        if (mid) {
            let marker = this.markers[mid];
            this.mapper.map.removeObject(marker.core);
            delete this.markers[mid];
        }
    }

    removeAllMarkerByType(type) {
        for (let mid in this.markers) {
            let marker = this.markers[mid];
            if (marker.type == type) {
                this.mapper.map.removeObject(marker.core);
                delete this.markers[mid];
            }
        }
    }

    removeMarkerOnMap(target) {
        let mid = this.getMarker(target);
        if (mid) {
            let marker = this.markers[mid];
            this.mapper.map.removeObject(marker.core);
            delete this.markers[mid];
        }
    }

    removeMarkerByObject(marker) {
        let mid = this.getMarkerByObject(marker);
        if (mid) {
            let marker = this.markers[mid];
            this.mapper.map.removeObject(marker.core);
            delete this.markers[mid];
        }
    }

    clearMarkerOnMap() {
        for (let [key, marker] of Object.entries(this.markers)) {
            this.mapper.map.removeObject(marker.core);
            delete this.markers[key];
        }
        this.markers = {};
        this.router.clearRouteLine();
    }
    
}

