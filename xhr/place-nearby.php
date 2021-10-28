<?php

// Request must be in AJAX
if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    $query = trim($_POST['category']);
    $param_current_location = isset($_POST['currentLocation']) ? trim($_POST['currentLocation']) : '';
    $categories = !empty($query) ? explode(',', $query) : null;
    $view_bounds = !empty($param_current_location) ? explode(',', $param_current_location) : null;
    $page = isset($_POST['page']) && !empty($_POST['page']) ? (int) $_POST['page'] : 1;
    $limit = isset($_POST['limit']) && !empty($_POST['limit']) ? $_POST['limit'] : 10;
    $from = ( ( $page - 1 ) * $limit );

    // Return no records if no valid view bounds found
    if (empty($view_bounds) || count($view_bounds) < 2) {
        echo json_encode(['result' => false, 'places' => null, 'title' => \helper\options::options_by_key_type('site_title', 'general'), 'message' => 'No results.']);
        return;
    }

    try {
        // instantiate a ES client
        $client = \helper\marker::es_builder();
        $params = [
            'index' => 'markers',
            'type' => 'business',
            'size' => $limit,
            'from' => $from,
            'body' => [],
        ];

        // append categories parameters
        if (!empty($categories)) {
            foreach ($categories as $category) {
                $params['body']['query']['bool']['must'][]['match']['categories'] = $category;
            }
        } else {
            $params['body']['query']['bool']['must']['match_all'] = new \stdClass();
        }

        // append view bound parameters
        if (count($view_bounds) == 4) {
            // near by the current map's view bound
            $params['body']['query']['bool']['filter'] = [
                [
                    'geo_bounding_box' => [
                        'latLng' => [
                            'top_left' => [
                                'lat' => $view_bounds[0],
                                'lon' => $view_bounds[1],
                            ],
                            'bottom_right' => [
                                'lat' => $view_bounds[2],
                                'lon' => $view_bounds[3],
                            ],
                        ],
                    ],
                ],
            ];
        } else {
            // near by a pinned location
            $params['body']['query']['bool']['filter'] = [
                [
                    'geo_distance' => [
                        'distance' => '2mi', // 2 miles
                        'latLng' => [
                            'lat' => $view_bounds[0],
                            'lon' => $view_bounds[1],
                        ],
                    ],
                ],
            ];
        }
        $response = $client->search($params);
        $milliseconds = $response['took'];
        $total = $response['hits']['total'];
        $docs = $response['hits']['hits'];

        $place_list_params = [
            'category' => $query,
            'docs' => $docs,
            'view_bounds' => $view_bounds,
            'total' => $total,
            'limit' => $limit,
            'page' => $page,
        ];

        $meta_title = (!empty($query) ? $query . ' near me | ' : '' ) . \helper\options::options_by_key_type('site_name', 'general');

        echo json_encode(['result' => true, 'places' => $docs, 'title' => $meta_title, 'message' => 'OK!']);
    } catch (Exception $e) {
        echo json_encode([
            'result' => false,
            'htmlResponse' => null,
            'title' => \helper\options::options_by_key_type('site_title', 'general'),
            'message' => 'There is a problem with the data server. Please contact administrator.',
        ]);

        return;
    }
} else {
    header('Location: ' . load_url()->domain_url());
}
?>