



<script>
    let url = '/place-search.xhr';

    call_xhr("hotel");

    function call_xhr(q) {
        var data = new FormData();
        data.append("q", q);
        data.append("limit", 10);
        postRequest(url, data).then((res) => {
            console.log(res);
        });
    }

    function postRequest(url, params) {
        return new Promise(function(resolve, reject) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open('POST', url, true);
            xmlHttp.responseType = "json";
            xmlHttp.onload = function() {
                if (xmlHttp.status == 200) {
                    resolve(xmlHttp.response);
                } else {
                    reject("Error");
                }
            };
            xmlHttp.send(params);
        });
    }
</script>