
<?php

header("Content-type: text/xml");
$field_order = 'publish_date';
$order_type = 'desc';
$games = \helper\game::get_paging(1, 500, $keywords, $type, $display, $is_hot, $is_new, $field_order, $order_type, $category_id);
foreach ($games as $game) {
    $tags = \helper\game::find_related_tag($game->id);
    if (count($tags)) {
        foreach ($tags as $t) {
            $tag[$t->id] = $t;
        }
    }
}

$stop_right_menu = \helper\menu::get_menu('header_menu');
$feeds = '<?xml version="1.0" ?>';
$feeds .= '<rss version="2.0">';
$feeds .= '<channel>';
$feeds .= '<title>' . \helper\options::options_by_key_type('site_name') . '</title>';
$feeds .= '<link>' . \helper\options::options_by_key_type('base_url') . '</link>';
$feeds .= '<description>' . \helper\options::options_by_key_type('site_description') . '</description>';
$feeds .= '<language>en-us</language>';
$feeds .= '<image>';
$feeds .= '<url>' . \helper\options::options_by_key_type('base_url') . \helper\options::options_by_key_type('logo') . '</url>';
$feeds .= '<link>' . \helper\options::options_by_key_type('base_url') . '</link>';
$feeds .= '</image>';
foreach ($games as $game) {
    $feeds .= '<item>';
    $feeds .= '<title>' . $game->name . '</title>';
    $feeds .= '<link>' . \helper\options::options_by_key_type('base_url') . '/' . $game->slug . '</link>';
    $feeds .= '<description>' . $game->excerpt . '</description>';
    $feeds .= '<image>';
    $feeds .= '<url>' . \helper\options::options_by_key_type('base_url') . $game->image . '</url>';
    $feeds .= '<link>' . \helper\options::options_by_key_type('base_url') . '/' . $game->slug . '</link>';
    $feeds .= '</image>';
    $feeds .= '<pubDate>' . date('r', strtotime($game->publish_date)) . '</pubDate>';
    $feeds .= '</item>';
}
foreach ($tag as $t) {
    $feeds .= '<item>';
    $feeds .= '<title>Play Game By Tags: ' . ucwords($t->name) . '</title>';
    $feeds .= '<link>' . \helper\options::options_by_key_type('base_url') . '/tags/' . $t->slug . '</link>';
    $feeds .= '<description>Play Game By Tags: ' . ucwords($t->name) . '</description>';
    $feeds .= '<image>';
    $feeds .= '<url>' . \helper\options::options_by_key_type('base_url') . $t->image . '</url>';
    $feeds .= '<link>' . \helper\options::options_by_key_type('base_url') . '/tags/' . $t->slug . '</link>';
    $feeds .= '</image>';
    $feeds .= '</item>';
}
foreach ($stop_right_menu as $t) {
    if (strpos($t->url, '://')) {
        continue;
    } else {
        $t->url = \helper\options::options_by_key_type('base_url') . $t->url;
    }
    $feeds .= '<item>';
    $feeds .= '<title>' . ucwords($t->title) . '</title>';
    $feeds .= '<link>' . $t->url . '</link>';
    $feeds .= '<description>' . ucwords($t->title) . '</description>';
    $feeds .= '<image>';
    $feeds .= '<url>' . \helper\options::options_by_key_type('base_url') . \helper\options::options_by_key_type('logo') . '</url>';
    $feeds .= '<link>' . \helper\options::options_by_key_type('base_url') . '/tags/' . $t->slug . '</link>';
    $feeds .= '</image>';
    $feeds .= '</item>';
}

$feeds .= '</channel>';

$feeds .= '</rss> ';
echo $feeds;
?>