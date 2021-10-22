/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class EventHandlers {
    events = []; //danh sach su kien

    listen(handler) {
        this.events.push(handler);
    }

    remove(handler) {
        let index = this.events.indexOf(handler);
        if (index == -1)
            return;
        this.events.splice(index, 1);
    }

    handle() {
        for (let e of this.events) {
            e();
        }
    }

    handle1(p) {
        for (let e of this.events) {
            //function (user_pos) {
            //me.onUserPositionLoaded(user_pos)
            //}
            e(p);
        }
    }

    handle2(p1, p2) {
        for (let e of this.events) {
            e(p1, p2);
        }
    }

    handle3(p1, p2, p3) {
        for (let e of this.events) {
            e(p1, p2, p3);
        }
    }
}



