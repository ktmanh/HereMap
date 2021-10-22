class User {
    initialized = false;
    initializedEvent = new EventHandlers();
    
    async init() {
        this.position = await this.getLocation();
        //khi chạy xong hàm getLocation thì this.initialized = true
        this.initialized = true;
        //thằng này phát ra sự kiện đã lấy được vị trí
        this.initializedEvent.handle1(this.position);
    }
    getLocation() {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    let user_pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                    resolve(user_pos);
                }, function () {
                    resolve(pos);
                });
            } else {
                resolve(pos);
            }
        });

    }
    
    position = {};
}


