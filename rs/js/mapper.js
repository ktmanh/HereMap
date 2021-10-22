class Mapper {
    map = '';
    behavior = null;
    ui = null;
    marker_list = null;
    router = null;
    //Khoi tao map
    init(platform) {
        let pixelRatio = window.devicePixelRatio || 1;
        let defaultLayers = platform.createDefaultLayers({
            tileSize: pixelRatio === 1 ? 256 : 512,
            ppi: pixelRatio === 1 ? undefined : 320
        });
        //ket xuat map vao the mapContainer
        this.map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
                zoom: 15,
                center: { lat: 21.02459408916368, lng: 105.8413698175431 },
                pixelRatio: window.devicePixelRatio || 2
            }
        );

        let mapTileService = platform.getMapTileService({
            type: 'base'
        });
        let multiMapLayer = mapTileService.createTileLayer(
            'maptile',
            'normal.day',
            pixelRatio === 1 ? 256 : 512,
            'png8',
            { lg: 'mul', ppi: pixelRatio === 1 ? undefined : 320 }
        );
        this.map.setBaseLayer(multiMapLayer);
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
        let mapSetting = this.ui.getControl('mapsettings');
        mapSetting.setAlignment('top-right');
        this.ui.setUnitSystem(H.ui.UnitSystem.IMPERIAL);
        let mapEvents = new H.mapevents.MapEvents(this.map);
        this.behavior = new H.mapevents.Behavior(mapEvents);
        window.addEventListener('resize', () => this.map.getViewPort().resize());
        this.router = new Router().init(this);
        this.marker_list = new MarkersList().init(this);
        let me = this;
        //kiểm tra xem đã lấy xong location của user chưa
        if (Shell.user.initialized) {
            this.onUserPositionLoaded(Shell.user.position);
        } //nếu chưa lấy được thì chờ hàm 
        else {
            //lắng nghe sự kiện Shell.user.initializedEvent khi xong thì thực thi fucntion(user_pos){me.onUserPositionLoaded(user_pos);} bên trong
            //khi nào nó gọi: Khi thằng này chạy this.initializedEvent.handle1(this.position);
            Shell.user.initializedEvent.listen(function (user_pos) {
                me.onUserPositionLoaded(user_pos);
            });
        }

    }

    onUserPositionLoaded(user_pos) {
        let obj = { coords: user_pos, content: "Your current location" };
        let marker = this.marker_list.createMarker(obj, MarkerType.START, MarkerCode.current_location, Icon.size_large);
        this.router.setStartPoint(marker);
        this.map.setCenter(user_pos);
    }
}