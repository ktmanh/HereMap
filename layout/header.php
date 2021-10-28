<?php

function getIP()
{
    foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key) :
        if (array_key_exists($key, $_SERVER) === true) :
            foreach (explode(',', $_SERVER[$key]) as $ip) :
                if (filter_var($ip, FILTER_VALIDATE_IP) !== false) :
                    return $ip;
                endif;
            endforeach;
        endif;
    endforeach;
}

$ip = getIP();
$ip = "1.54.56.118";
$json = file_get_contents('http://ip-api.com/json/' . $ip);
$geo_data = json_decode($json);
$initLat = $geo_data->lat;
$initLng = $geo_data->lon;
$API_KEY = \helper\options::options_by_key_type('api_key');
if (!$API_KEY) {
    $API_KEY = '7ew1wrClOuP5rz-zSYfH7BdLB9y5SJmBIKy3eMJBvLg';
}
$theme_url = "/" . DIR_THEME;
?>

<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <?php
    echo $custom;
    ?>
    <link rel="stylesheet" href="/<?php echo DIR_THEME ?>/rs/css/all.css">
    <link rel="stylesheet" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap" rel="stylesheet">
    <script>
        var path = "<?php echo $theme_url; ?>";
        var pathImage = "<?php echo $theme_url; ?>rs/imgs/";
        var pos = {
            lat: "<?php echo $initLat; ?>",
            lng: "<?php echo $initLng; ?>"
        }
        const APIKEY = "<?php echo $API_KEY; ?>";
    </script>
    <?php
    //echo \helper\themes::get_layout('header/analytics');
    ?>
</head>

<body>