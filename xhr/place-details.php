<?php

// Request must be in AJAX
if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    // Validate token sent by client
    $id = trim($_POST['id']);
    $place = $_POST['place'];
    if (!empty($id)) {
        try {
            if (!$place) {
                // instantiate a ES client
                $client = \helper\marker::es_builder();
                $params = [
                    'index' => 'markers',
                    'type' => 'business',
                    'id' => $id,
                ];
                // If it wont be found, an exception will be produced, or continue process
                $response = $client->get($params);
                $doc = $response['_source'];
                $html = \helper\themes::get_layout('ajax_detail_place', array('doc' => $doc));
            } else {
                $doc = json_decode($place, true);
            }
        } catch (Exception $e) {
            echo json_encode([
                'result' => false, 'htmlResponse' => null, 'title' => \helper\options::options_by_key_type('site_title', 'general'),
                'message' => 'There is a problem with the data server. Please contact administrator.',
            ]);
        }

        // Convert country ISO code to full country name
        //            if (Locale::getDisplayRegion('-'.trim($doc['address']['country'])) != '') {
        //                $full_country_name = Locale::getDisplayRegion('-'.trim($doc['address']['country']));
        //            } else {
        $full_country_name = trim($doc['address']['country']);
        //            }
        // Place details
        $place_name = $doc['name'] ? trim($doc['name']) : '';
        $place_addr1 = $doc['address']['address1'] ? trim($doc['address']['address1']) : '';
        $place_addr2 = $doc['address']['address2'] ? trim($doc['address']['address2']) : '';
        $place_locality = $doc['address']['locality'] ? trim($doc['address']['locality']) : '';
        $place_region = $doc['address']['region'] ? trim($doc['address']['region']) : '';
        $place_postalCode = $doc['address']['postalCode'] ? trim($doc['address']['postalCode']) : '';
        $place_desc = $doc['description'] ? trim($doc['description']) : '';

        $place_addr_line1 = ($place_addr1 ? $place_addr1 : '') . ($place_addr2 ? ', ' . $place_addr2 : '');
        $place_addr_line2 = ($place_locality ? $place_locality : '') . ($place_region ? ', ' . $place_region : '') . ($place_postalCode ? ' ' . $place_postalCode : '');


        $place_details_params = [
            'doc' => $doc,
            'place_name' => $place_name,
            'place_addr1' => $place_addr1,
            'place_addr2' => $place_addr2,
            'place_locality' => $place_locality,
            'place_region' => $place_region,
            'place_postalCode' => $place_postalCode,
            'place_desc' => $place_desc,
            'place_addr_line1' => $place_addr_line1,
            'place_addr_line2' => $place_addr_line2,
            'full_country_name' => $full_country_name,
        ];

        $meta_title = $place_name . ($doc['categories'][0] ? ' ' . $doc['categories'][0] : '') . ' | ' . $place_addr_line1 . ($place_locality ? ' ' . $place_locality : '') . ($place_region ? ', '
                . $place_region : '');

        echo json_encode(['result' => true, 'html' => $html, 'htmlResponse' => \helper\themes::get_layout('place_details', $place_details_params), 'title' => $meta_title, 'data' => $doc, 'message' => 'OK!']);
    } else {
        echo json_encode(['result' => false, 'htmlResponse' => null, 'title' => \helper\options::options_by_key_type('site_title', 'general'), 'message' => 'No results.']);
    }
} else {
    header('Location: ' . load_url()->domain_url());
}
?>