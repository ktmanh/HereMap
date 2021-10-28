<script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" type="text/javascript" charset="utf-8"></script>
<script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" type="text/javascript" charset="utf-8"></script>
<script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" type="text/javascript" charset="utf-8"></script>
<script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" type="text/javascript" charset="utf-8"></script>

<script src="/<?php echo DIR_THEME ?>rs/js/config.js"></script>
<script src="/<?php echo DIR_THEME ?>rs/js/UI.js"></script>
<script src="/<?php echo DIR_THEME ?>rs/js/event_handlers.js"></script>
<script src="/<?php echo DIR_THEME ?>rs/js/user.js"></script>
<script src="/<?php echo DIR_THEME ?>rs/js/marker.js"></script>
<script src="/<?php echo DIR_THEME ?>rs/js/markers_list.js"></script>
<script src="/<?php echo DIR_THEME ?>rs/js/searchplace.js"></script>
<script src="/<?php echo DIR_THEME ?>rs/js/search_suggest.js"></script>
<script src="/<?php echo DIR_THEME ?>rs/js/router.js"></script>
<script src="/<?php echo DIR_THEME ?>rs/js/mapper.js"></script>
<script src="/<?php echo DIR_THEME ?>rs/js/shell.js"></script>
<script>
    window.onload = function(e) {
        start();
    }

    function start() {
        Shell.init();
    }

    function nearMe(element) {
        Shell.search_place.name = element.getAttribute('data-query');
        document.querySelector(".findingCategory").innerHTML = name;
        Shell.search_place.categories = element.getAttribute('data-type');
        Shell.search_place.limit = document.querySelector("#limitFinding").value;
        Shell.search_place.radius = (document.querySelector("#myRange").value) * 1000;
        Shell.search_place.searchingPlace();
        removeUserChoice(element);
    }
    //thay doi phuong tien chi duong
    function transportMode(element) {
        let transport_mode = element.getAttribute('data-type');
        Shell.mapper.router.transport_mode = transport_mode || 'car';
        Shell.mapper.router.showDirection();
    }

    function removeUserChoice(element) {
        let param_place = '.pickButton[onclick="nearMe(this)"]';
        let list_place = document.querySelectorAll(param_place);
        for (let place of list_place) {
            place.classList.remove("userchoice");
        }
        element.classList.add("userchoice");
    }
</script>
</body>
<html>