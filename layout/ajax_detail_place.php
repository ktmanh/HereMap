<div class="inner-information-place">
    <div class="image-box">
        <img src="<?php echo $doc['images'][0]['url']; ?>" onerror="this.src='/<?php echo DIR_THEME; ?>resources/images/no_image.png'" width="100%" height="273" />
        <div class="close-pannel">
            <img src="/<?php echo DIR_THEME ?>resources/images/close-button.png" width="20" height="20" />
        </div>
    </div>
    <div class="title-box">
        <h2 class="article-title"><?php echo $doc['name']; ?></h2>
        <p class="rate-review">
            <?php if ($doc['aggregateRating']['@vendor']): ?>
                <!--<span class="total-rate" style="margin-right: 8px"><?php echo $doc['aggregateRating']['@vendor']; ?></span>-->
            <?php endif; ?>
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
            <span class="rating-box">
                <?php
                for ($i = 1; $i <= 5; $i++):
                    ?>
                    <?php if ($i > $score): ?>
                        <i class="fa fa-star-o" aria-hidden="true"></i>
                    <?php else: ?>
                        <i class="fa fa-star true-rate" aria-hidden="true"></i>
                    <?php endif; ?>
                <?php endfor; ?>
            </span>
            <?php if ($score == 0): ?>
                <span class="review-time">(!no data)</span>
            <?php endif; ?>
            <?php if ($doc['reviewCount']): ?>
                <span class="total-review">(<?php echo $doc['reviewCount'] ?> reviews)</span>
            <?php endif; ?>
            <span class="direct-to" data-lat="<?php echo $doc['latLng']['lat']; ?>" data-lon="<?php echo $doc['latLng']['lon'] ?>">
                <img src="/<?php echo DIR_THEME ?>resources/images/direction-sign-alt.png" width="32" height="32" title="Direct" />
            </span>
        </p>
        <?php if (count($doc['categories'])): ?>
            <p class="total-review"><?php echo $doc['categories'][0]; ?></p>
        <?php endif; ?>
        <p class="article-adress">
            <?php echo $doc['address']['address1'] ? $doc['address']['address1'] : ''; ?>
            <?php echo $doc['address']['locality'] ? $doc['address']['locality'] : ' '; ?>
            <?php echo $doc['address']['region'] ? $doc['address']['region'] : ' '; ?>
            <?php echo $doc['address']['country'] ? $doc['address']['country'] : ' '; ?>
        </p>
    </div>
    <div class="all-information">
        <?php if ($doc['hotelQualityRating']): ?>
            <div class="each-infomation">
                <span class="icon-each-infomration icon-quality">
                    <i class="fa fa-star" aria-hidden="true"></i>
                </span>
                <div class="title-each-information">Hotel Quality: <?php echo $doc['hotelQualityRating']; ?></div>
            </div>
        <?php endif; ?>
        <?php if ($doc['phone']): ?>
            <div class="each-infomation">
                <span class="icon-each-infomration icon-phone">
                    <i class="fa fa-phone-square" aria-hidden="true"></i>
                </span>
                <div class="title-each-information"><a href="tel:<?php echo $doc['phone']; ?>"><?php echo $doc['phone']; ?></a></div>
            </div>
        <?php endif; ?>
        <?php if ($doc['roomCount']): ?>
            <div class="each-infomation">
                <span class="icon-each-infomration icon-phone">
                    <i class="fas fa-boxes" aria-hidden="true"></i>
                </span>
                <div class="title-each-information">No. of rooms: <?php echo $doc['roomCount']; ?></div>
            </div>
        <?php endif; ?>
        <?php if ($doc['checkInTime']): ?>
            <div class="each-infomation">
                <span class="icon-each-infomration icon--check-in">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                </span>
                <div class="title-each-information">Check-in: <?php echo $doc['checkInTime']; ?></div>
            </div>
        <?php endif; ?>
        <?php if ($doc['checkOutTime']): ?>
            <div class="each-infomation">
                <span class="icon-each-infomration icon-check-out">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                </span>
                <div class="title-each-information">Check-out: <?php echo $doc['checkOutTime']; ?></div>
            </div>
        <?php endif; ?>
        <?php if ($doc['description']): ?>
            <div class="each-infomation">
                <span class="icon-each-infomration icon-description">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                </span>
                <div class="title-each-information">
                    <?php echo $doc['description']; ?>
                </div>
            </div>
        <?php endif; ?>
        <?php if (count($doc['images']) > 1): ?>
            <div class="each-infomation">
                <span class="icon-each-infomration icon-images">
                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                </span>
                <div class="title-each-information">
                    <div class="num-photo">Photos (<?php echo count($doc['images']); ?>)</div>
                    <div class="slider">
                        <div class="slider-inner">
                            <?php foreach ($doc['images'] as $img): ?>
                                <div class="slider-item">
                                    <div class="box">
                                        <img src="<?php echo $img['url']; ?>" onerror="this.src='/<?php echo DIR_THEME; ?>resources/images/no_image.png'" alt="image" title="image" />
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                        <div class="control">
                            <button id="prev"><span>Prev</span></button>
                            <button id="next"><span>next</span></button>
                        </div>

                    </div>
                </div>
            </div>
            <script>
                sliderMe();
                window.addEventListener("resize", sliderMe)
            </script>
        <?php endif; ?>
        <!--https://codepen.io/nurofsun/pen/VwwVEWP-->
        <?php if (count($doc['reviews'])): ?>
            <div class="each-infomation">
                <span class="icon-each-infomration icon-review">
                    <i class="fa fa-comments" aria-hidden="true"></i>
                </span>
                <div class="title-each-information">
                    <!--https://bbbootstrap.com/snippets/bootstrap-comment-section-form-ratings-98792632-->
                    <div id="num-review">Review (<?php echo $doc['reviewCount']; ?>)</div>
                    <div class="reviewPost">
                        <?php foreach ($doc['reviews'] as $review): ?>
                            <div class="card">
                                <div class="row">
                                    <div class="col-2"> 
                                        <img src="<?php echo $review['author']['imageUrl']; ?>" onerror="this.src='/<?php echo DIR_THEME ?>resources/images/profile-default.png'" width="40" class="rounded-circle mt-2" /> 
                                    </div>
                                    <div class="col-10">
                                        <div class="comment-box">
                                            <h4><?php echo $review['author']['name']; ?></h4>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="rating-box review-rating">
                                            <?php
                                            for ($i = 0; $i < 5; $i++):
                                                ?>
                                                <?php if ($i > 3): ?>
                                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                                <?php else: ?>
                                                    <i class="fa fa-star true-rate" aria-hidden="true"></i>
                                                <?php endif; ?>
                                            <?php endfor; ?>
                                            <span class="review-time"><?php echo \helper\datetime::time_ago($review['created']); ?></span>
                                        </div>
                                        <p class="review-content">
                                            <?php echo $review['reviewBody']; ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>
<script>
    document.querySelector(".close-pannel").addEventListener('click', function () {
        $("#ajax-append-detail").hide();
        $("#ajax-append-search").show();
    })

    $(".direct-to").on('click', function () {
        var lat = $(this).data('lat');
        var lon = $(this).data('lon');
        var waypoint0;
        if (pickCoords) {
            waypoint0 = {
                lat: pickCoords.lat,
                lng: pickCoords.lng
            }
        } else {
            waypoint0 = {
                lat: initLat,
                lng: initLng
            }
        }
        var waypoint1 = {
            lat: lat,
            lng: lon
        }
        calculateRoutes(platform, waypoint0, waypoint1);
    });
</script>