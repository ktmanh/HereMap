/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Shell {
    static user = null;
    static mapper = null;
    static platform = null;
    static default_marker = null;
    static search_place = null;

    static async init() {
        //Shell.default_marker = new H.map.Icon(Icon.ICON.searchicon, Icon.size_large);
        Shell.user = new User();
        Shell.user.init();
        Shell.mapper = new Mapper();
        Shell.platform = new H.service.Platform({
            apikey: APIKEY
        });
        Shell.mapper.init(Shell.platform);
        Shell.search_place = new SeachPlace();
        Shell.search_suggest = new SearchSuggest();
        Shell.search_suggest.init();
    }

    static getSelectionPosition() {
        if (Shell.mapper.router.start_point) {
            return Shell.mapper.router.start_point.getPos();
        }
        return Shell.user.position;
    }

    static request(url) {
        return new Promise(function (resolve, reject) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open('GET', url);
            xmlHttp.responseType = "json";
            xmlHttp.onload = function () {
                if (xmlHttp.status == 200) {
                    resolve(xmlHttp.response);
                } else {
                    reject("Error");
                }
            };
            xmlHttp.send();
        });
    }

}
