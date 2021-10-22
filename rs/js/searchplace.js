class SeachPlace {
    static search_service = '';
    name = null;
    limit = Config.limit;
    radius = Config.radius;
    categories = null;
    in_position = null;
    mapper = null;
    constructor() {
        this.search_service = Shell.platform.getSearchService();
        this.mapper = Shell.mapper;
    }

    getInPosition() {
        if (this.mapper.router.start_point) {
            this.in_position = this.mapper.router.start_point.getPos();
        } else {
            this.in_position = Shell.user.position;
        }
        return this.in_position;

    }
    searchingPlace() {
        if (!this.canSearchPlace()) return;
        this.mapper.router.removeRouteLine();
        this.mapper.marker_list.removeAllMarkerByType(MarkerType.PLACE);
        let params = {
            q: this.name,
            in: 'circle:' + this.getInPosition().lat + ',' + this.getInPosition().lng + ';r=' + this.radius,
            categories: this.categories,
            limit: this.limit
        }
        let me = this;
        this.search_service.discover(params, (res) => me.successPlace(res), this.error);
    }

    canSearchPlace() {
        if (!this.name || !this.categories || !this.getInPosition()) return false;
        return true;
    }

    successPlace(results) {
        let me = this;
        if (results.items.length) {
            results.items.forEach(item => {
                let obj = {
                    coords: item.position,
                    content: item.address.label
                }
                Shell.mapper.marker_list.createMarker(obj, MarkerType.PLACE, me.categories);
            });

        } else {
            alert("Sorry can't find any place");
        }
    }

    error(err) {
        console.log(err);

    }
}