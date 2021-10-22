class Router {
    router = null;
    geo = null;
    start_point = null;
    via_point = null;
    dest_point = null;
    transport_mode = 'car';
    //mapper = new Mapper();
    mapper = null;
    routeLines = [];
    zoom_map_when_direction = false;

    constructor() {
        this.router = Shell.platform.getRoutingService(null, 8);
    }

    init(mapper) {
        this.mapper = mapper;
        return this;
    }
    //Set diem dau
    setStartPoint(start_point) {
        this.start_point = start_point;
        Shell.search_suggest.field_input_start_two.value = this.start_point.getMakerLabel();
        if (!this.dest_point) {
            //mainNav.showDirectionBox();
            Shell.search_suggest.field_input_destination.focus();
            return;
        }
        this.showDirection();
    }

    //Set diem trung gian
    setViaPoint(via_point) {
        console.log('setVIA');
        this.via_point = via_point;
        Shell.search_suggest.field_input_via.value = this.via_point.getMakerLabel();
        mainNav.openVia();
        this.showDirection();
    }

    //Set diem den
    setDestPoint(dest_point) {
        this.dest_point = dest_point;
        Shell.search_suggest.field_input_destination.value = this.dest_point.getMakerLabel();
        if (!this.start_point) {
            mainNav.showDirectionBox();
            Shell.search_suggest.field_input_start_two.focus();
            return;
        }
        this.showDirection();
    }
    getPoint(key) {

    }

    //Kiem tra xem co the chi duong khong
    canShowDirection() {
        if (!this.start_point || !this.dest_point) return false;
        return true;
    }
    setTransportMode(mode = null) {
        this.transport_mode = mode || 'car';
        this.showDirection();
    }

    removeMarker(marker) {
        if (this.start_point == marker) {
            this.start_point = null;
        } else if (this.via_point == marker) {
            this.via_point = null;
            document.querySelector('#viaForm').style.display = 'none';
            Shell.search_suggest.field_input_via.value = null;
            document.querySelector('.addVia').style.display = 'flex';
        } else if (this.dest_point == marker) {
            this.dest_point = null;
        } else {
            return;
        }
        this.removeRouteLine();
        this.showDirection();
    }

    //Thuc hien chi duong
    showDirection() {
        if (!this.canShowDirection()) return;
        this.removeRouteLine();
        mainNav.showDirectionBox();
        let start_pos = this.start_point.getPos();
        let params = {
            transportMode: this.transport_mode,
            routingMode: "fast",
            origin: start_pos.lat + ',' + start_pos.lng
        };
        if (this.via_point) {
            let via_pos = this.via_point.getPos();
            params.via = via_pos.lat + ',' + via_pos.lng;
        }
        let dest_pos = this.dest_point.getPos();
        params.destination = dest_pos.lat + ',' + dest_pos.lng;
        params.return = "polyline,summary,actions,instructions,passthrough";
        params.spans = "maxSpeed,speedLimit";
        let me = this;
        this.router.calculateRoute(params, (res) => me.successCalculate(res), this.error);
    }
    successCalculate(result) {
        if (result.routes.length) {
            this.createRouteLine(result.routes[0]);
            this.addInstructions(result.routes[0]);
        }
        else {
            alert("Sorry can not find any route");
        }
        return;
    }

    createRouteLine(route) {
        let me = this;
        for (let section of route.sections) {
            let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
            let routeOutline = new H.map.Polyline(linestring, {
                style: {
                    lineWidth: 8,
                    strokeColor: 'rgb(44, 72, 161)',
                    strokeColor: 'rgb(27,70,141)',
                    lineTailCap: 'arrow-tail',
                    lineHeadCap: 'arrow-head',
                    lineJoin: 'round'
                }
            });

            let routeArrows = new H.map.Polyline(linestring, {
                style: {
                    lineWidth: 0,
                    fillColor: '#fff',
                    strokeColor: 'rgba(255, 255, 255, 1)',
                    lineDash: [0, 10],
                    lineTailCap: 'arrow-tail',
                    lineHeadCap: 'arrow-head',
                    lineJoin: 'round'
                }
            });

            let routeLine = new H.map.Group();
            routeLine.addObjects([routeOutline, routeArrows]);
            let map = me.mapper.map;
            map.addObject(routeLine);
            if (me.zoom_map_when_direction) {
                map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
                me.zoom_map_when_direction = false;
            }
            me.routeLines.push(routeLine);
        }
    }

    addInstructions(route) {
        let totalLength = 0;
        let totalDuration = 0;
        let pannel = document.getElementById("panel");
        route.sections.forEach((section) => {
            totalLength += section.summary.length;
            totalDuration += section.summary.duration;
            pannel.innerHTML = '';
            pannel.innerHTML += '<h2>Recommended ways to go</h2>';
            pannel.innerHTML += '<h3>From: ' + this.start_point.getMakerLabel() + '</h3>';
            pannel.innerHTML += '<h3>To: ' + this.dest_point.getMakerLabel() + '</h3>';
            pannel.innerHTML += '<p style="font-weight:600;">' + 'Distance: ' + totalLength / 1000 + ' km' + '</p>';
            pannel.innerHTML += '<p style="font-weight:600;">Time taken: ' + totalDuration.toMS() + '<p>';
            section.actions.forEach((action) => {
                var spanArrow = `<span class="arrow ${(action.direction || '') + action.action}"></span>`;
                pannel.innerHTML += '<p>' + spanArrow + action.instruction + '</p>';
            });
        });
        return;
    }

    error(err) {
        console.log(err);
        return;
    }
    removeRouteLine() {
        for (let rl of this.routeLines) {
            if (rl) {
                this.mapper.map.removeObject(rl);
            }
        }
        this.routeLines = [];
    }
    clearRouteLine() {
        this.start_point = null;
        this.via_point = null;
        this.dest_point = null;
        this.removeRouteLine();
    }
}
