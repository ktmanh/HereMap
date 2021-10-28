<?php
session_start();
$query = trim($_REQUEST['q']);
$limit = trim($_REQUEST['limit']);
if (!$limit) {
    $limit = 10;
}
$page = trim($_POST['page']);
if (!$page) {
    $page = 1;
}
$from = ($page - 1) * $limit;
if (!empty($query)) {
    $client = \helper\marker::es_builder();
    try {
        // instantiate a ES client
        $client = \helper\marker::es_builder();
        $params = [
            'index' => 'markers',
            'type' => 'business',
            'from' => $from,
            'size' => $limit,
            'body' => [
                'query' => [
                    'match' => [
//                                'name' => $query,
                        '_all' => $query, // search in all fields, it might be longer but more accurate
                    ],
                ],
            //                    'highlight' => [
            //                        'pre_tags' => ['<b>'],
            //                        'post_tags' => ['</b>'],
            //                        'fields' => [
            //                            'name' => new \stdClass()
            //                        ]
            //                    ]
            ],
        ];
        $response = $client->search($params);
        $milliseconds = $response['took'];
        $total = $response['hits']['total'];
        $docs = $response['hits']['hits'];
        $result = ['result' => true, 'docs' => $docs, 'page' => $page, 'total' => $total, 'message' => 'Found ' . $total . ' records in ' . $milliseconds . ' milliseconds.'];
        $html = \helper\themes::get_layout('ajax_search_place', array('result' => $result));
        echo json_encode(['result' => $html, 'docs' => $docs, 'total' => $total, 'message' => 'Found ' . $total . ' records in ' . $milliseconds . ' milliseconds.']);
    } catch (Exception $e) {
        echo json_encode(['result' => false, 'docs' => [], 'total' => 0, 'message' => 'There is a problem with the data server. Please contact administrator.']);
    }
} else {
    echo json_encode(['result' => false, 'docs' => [], 'total' => 0, 'message' => 'No results.']);
}
die;
// Request must be in AJAX
if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    // Validate token sent by client
    if ($_POST['token'] == $_SESSION['token']) {
        $query = trim($_POST['q']);
        $limit = trim($_POST['limit']);
        if (!$limit) {
            $limit = 10;
        }
        $page = trim($_POST['page']);
        if (!$page) {
            $page = 1;
        }
        $from = ($page - 1) * $limit;
        if (!empty($query)) {
            try {
                // instantiate a ES client
                $client = \helper\marker::es_builder();
                $params = [
                    'index' => 'markers',
                    'type' => 'business',
                    'from' => $from,
                    'size' => $limit,
                    'body' => [
                        'query' => [
                            'match' => [
//                                'name' => $query,
                                '_all' => $query, // search in all fields, it might be longer but more accurate
                            ],
                        ],
                    //                    'highlight' => [
                    //                        'pre_tags' => ['<b>'],
                    //                        'post_tags' => ['</b>'],
                    //                        'fields' => [
                    //                            'name' => new \stdClass()
                    //                        ]
                    //                    ]
                    ],
                ];
                $response = $client->search($params);
                $milliseconds = $response['took'];
                $total = $response['hits']['total'];
                $docs = $response['hits']['hits'];
                $result = ['result' => true, 'docs' => $docs, 'page' => $page, 'total' => $total, 'message' => 'Found ' . $total . ' records in ' . $milliseconds . ' milliseconds.'];
                $html = \helper\themes::get_layout('ajax_search_place', array('result' => $result));
                echo json_encode(['result' => $html, 'docs' => $docs, 'total' => $total, 'message' => 'Found ' . $total . ' records in ' . $milliseconds . ' milliseconds.']);
            } catch (Exception $e) {
                echo json_encode(['result' => false, 'docs' => [], 'total' => 0, 'message' => 'There is a problem with the data server. Please contact administrator.']);
            }
        } else {
            echo json_encode(['result' => false, 'docs' => [], 'total' => 0, 'message' => 'No results.']);
        }
    } else {
        header('Location: ' . load_url()->domain_url());
    }
} else {
    header('Location: ' . load_url()->domain_url());
}
