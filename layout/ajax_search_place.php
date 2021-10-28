<?php
$paging = new \pi\lib\pagination();
$page = $result['page'];
if (!$page) {
    $page = 1;
}
$total = $result['total'];
$limit = 10;
$num_links = 4;
$paging_content = $paging->render_rawdata($page, $total, $limit, $num_links);
?>

<div class="inner-information-place">
    <div class="item-search-place">
        <?php foreach ($result['docs'] as $doc): ?>
            <div class="inner-item-search-place">
                <div class="image-item-search-box" onclick="detail_place('<?php echo $doc['_id']; ?>')" data-id="<?php echo $doc['_id']; ?>">
                    <img src="<?php echo $doc['_source']['images'][0]['url']; ?>" onerror="this.src='/<?php echo DIR_THEME ?>resources/images/no_image.png'" width="75" height="75" alt="error" title="" />
                </div>
                <div class="content-item-search-box">
                    <div class="search-place-title" onclick="detail_place('<?php echo $doc['_id']; ?>')" data-id="<?php echo $doc['_id']; ?>"><?php echo $doc['_source']['name']; ?></div>
                    <div class="search-place-address">
                        <?php echo $doc['_source']['address']['address1'] ? $doc['_source']['address']['address1'] : ''; ?>
                        <?php echo $doc['_source']['address']['locality'] ? $doc['_source']['address']['locality'] : ' '; ?>
                        <?php echo $doc['_source']['address']['region'] ? $doc['_source']['address']['region'] : ' '; ?>
                        <?php echo $doc['_source']['address']['country'] ? $doc['_source']['address']['country'] : ''; ?>
                    </div>
                    <p class="rate-review">
                        <span class="rating-box">
                            <?php
                            if ($doc['aggregateRating']) {
                                $score = ceil($doc['aggregateRating']['value'] / 2);
                                if ($score > 5) {
                                    $score = 5;
                                }
                            } else {
                                $score = 0;
                            }
                            ?>
                            <?php for ($i = 0; $i < 5; $i++): ?>
                                <?php if ($i >= $score): ?>
                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                <?php else: ?>
                                    <i class="fa fa-star true-rate" aria-hidden="true"></i>
                                <?php endif; ?>
                            <?php endfor; ?>
                        </span>
                        <?php if ($score == 0): ?>
                            <span class="review-time">(!no data)</span>
                        <?php endif; ?>
                        <?php if ($doc['_source']['reviewCount']): ?>
                            <span class="review-time"><?php echo $doc['_source']['reviewCount']; ?> reviews</span>
                        <?php endif; ?>
                    </p>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <?php echo \helper\themes::get_layout('pagination', array('paging_content' => $paging_content)); ?>
</div>

<script>
    function detail_place(id) {
        showPlaceDetail(id);
    }
    function paging_ajax(page) {
        $("#loading_img").removeClass("hiddenz");
        var q = $("#search-place").val();
        searchPlace(page, q);
    }
</script>