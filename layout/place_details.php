<div id="routeInstructionsPanel">
    <div class="instructions-details">
        <div class="title">Your Route</div>
        <div class="route-error">Didn't find a route for that journey</div>
        <div class="instructions-sumary">
            <div><span class="index"><i class="fas fa-map-marker" title="From"></i></span><span class="addr-from"></span></div>
            <div><span class="index"><i class="fas fa-flag-checkered" title="To"></i></span><span class="addr-to"></span></div>
            <div><span class="index"><i class="fas fa-road" title="Distance"></i></span><span class="distance"></span></div>
            <div><span class="index"><i class="fas fa-clock" title="Travel time"></i></span><span class="time"></span></div>
        </div>
        <div class="instructions-block"></div>
    </div>
</div>
<div class="place-details-panel-inner">
    <script>
        // Fix width on place-details-panel-inner to prevent break layout when showing scroll
        $('div.place-details-panel-inner').css('width', $('div.place-details-panel-inner').parent().width() + 'px');
    </script>
    <?php if ( ! empty($doc['images'])): ?>
        <div class="place-feature-photo">
            <div style="background: url('<?php echo $doc['images'][0]['url']; ?>') no-repeat; background-size: cover; height: 150px"
                 title="<?php echo $doc['images'][0]['caption']; ?>"></div>
        </div>
    <?php endif; ?>
    <div class="place-details">
        <div class="address-block place-details-panel-inner-row">
            <div class="place-row-icon">
                <i class="fas fa-briefcase" title="Address"></i>
            </div>
            <div class="place-row-content">
                <div class="place-name"><h1><?php echo $place_name; ?></h1></div>
                <?php if ( ! empty($doc['aggregateRating']['value'])): ?>
                    <div class="place-rating">
                        <?php echo \helper\themes::get_layout('vote',
                            [
                                'post_id'     => $place_id, 'aggregateRating' => $doc['aggregateRating']['value'], 'name' => $place_name, 'read_only' => true,
                                'reviewCount' => $doc['reviewCount'],
                            ]); ?>
                    </div>
                <?php endif; ?>

                <?php if ( ! empty($doc['categories'])):
                    $cat_len = count($doc['categories']); ?>
                    <div class="place-categories">
                        <?php foreach ($doc['categories'] as $key_cat => $category): ?>
                            <a class="search-nearby" href="/search/nearby?category=<?php echo $category; ?>&currentLocation=<?php echo $doc['latLng']['lat'].','.$doc['latLng']['lon'] ?>"><?php
                            echo $category; ?></a><?php echo (($key_cat + 1) < $cat_len) ? ', ' : ''; ?>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>

                <div class="place-address">
                    <div class="place-address">
                        <div itemprop="address" itemtype="http://schema.org/PostalAddress">
                            <?php if ( ! empty($place_addr_line1)): ?><span itemprop="streetAddress"><?php echo $place_addr_line1; ?></span><br><?php endif; ?>
                            <?php if ( ! empty($place_addr_line2)): ?><span itemprop="streetAddress"><?php echo $place_addr_line2; ?></span><br><?php endif; ?>
                            <?php if ( ! empty($full_country_name)): ?><span itemprop="streetAddress"><?php echo $full_country_name; ?></span><br><?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <?php if ( ! empty($doc['phone'])): ?>
            <div class="phoneBlock place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-phone-square-alt" title="Phone"></i>
                </div>
                <div class="place-row-content">
                                <span class="tel" itemprop="telephone">
                                    <a href="tel:<?php echo preg_replace('/[^0-9]+/i', '', $doc['phone']); ?>"><?php echo $doc['phone']; ?></a>
                                </span>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['email'])): ?>
            <div class="phoneBlock place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-envelope" title="E-mail"></i>
                </div>
                <div class="place-row-content">
                    <a href="<?php echo $doc['email']; ?>" class="url" itemprop="url" rel="nofollow" target="_blank">E-mail</a>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['url'])): ?>
            <div class="phoneBlock place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-globe" title="Website"></i>
                </div>
                <div class="place-row-content">
                    <a href="<?php echo $doc['url']; ?>" class="url" itemprop="url" rel="nofollow" target="_blank">Website</a>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['tagLine'])): ?>
            <div class="phoneBlock place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-tag" title="Tag line"></i>
                </div>
                <div class="place-row-content">
                    <a href="<?php echo $doc['tagLine']['url']; ?>" class="url" itemprop="url" rel="nofollow" target="_blank"><?php echo $doc['tagLine']['text']; ?></a>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['priceRange'])): ?>
            <div class="phoneBlock place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-dollar-sign" title="Price Range"></i>
                </div>
                <div class="place-row-content">
                    <span>Price Range: <?php echo $doc['priceRange']; ?></span>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['hotelQualityRating'])): ?>
            <div class="phoneBlock place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-star" title="Hotel Quality Rating"></i>
                </div>
                <div class="place-row-content">
                    <span>Hotel Quality: <?php echo $doc['hotelQualityRating']; ?></span>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['servesCuisine'])): ?>
            <div class="phoneBlock place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-utensils" title="Cuisine"></i>
                </div>
                <div class="place-row-content">
                    <span>Cuisine: <?php echo $doc['servesCuisine']; ?></span>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['recommendedMeal']) && 'unknownattribute' != $doc['recommendedMeal'][0]):
            $recom_len = count($doc['recommendedMeal']); ?>
            <div class="phoneBlock place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-thumbs-up" title="Recommended Meal"></i>
                </div>
                <div class="place-row-content">
                                <span><?php foreach ($doc['recommendedMeal'] as $key_recomm => $recommend) {
                                        echo ucfirst($recommend);
                                        if (($key_recomm + 1) < $recom_len) {
                                            echo ', ';
                                        }
                                    } ?></span>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['reservationUrl'])): ?>
            <div class="phoneBlock place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-link" title="Book Now"></i>
                </div>
                <div class="place-row-content">
                    <a href="<?php echo $doc['reservationUrl']; ?>" class="url" itemprop="url" rel="nofollow" target="_blank">Book Now</a>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['roomCount'])): ?>
            <div class="hours-block place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-door-open" title="No. of Rooms"></i>
                </div>
                <div class="place-row-content">
                    <span>No. of Rooms: <?php echo $doc['roomCount']; ?></span>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['checkInTime'])): ?>
            <div class="hours-block place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-user-check" title="Check-in Time"></i>
                </div>
                <div class="place-row-content">
                    <span>Check-In: <?php echo $doc['checkInTime']; ?></span>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['checkOutTime'])): ?>
            <div class="hours-block place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-user-check" title="Check-out Time"></i>
                </div>
                <div class="place-row-content">
                    <span>Check-Out: <?php echo $doc['checkOutTime']; ?></span>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['openingHours'])): ?>
            <div class="hours-block place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-clock" title="Opening Hours"></i>
                </div>
                <div class="place-row-content"><span>Opening Hours</span>
                    <div class="all-hours">
                        <ul class="timeframes">
                            <?php foreach ($doc['openingHours'] as $key => $opening_hours) : ?>
                                <li class="timeframe">
                                    <span class="timeframe-days"><?php echo ucfirst($key); ?></span>
                                    <span class="timeframe-hours">
                                                <ul>
                                                    <li><?php echo date('h:i A', strtotime($opening_hours[0]['open'])); ?> –
                                                        <?php echo date('h:i A', strtotime($opening_hours[0]['close'])); ?></li>
                                                </ul>
                                            </span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($doc['paymentsAccepted'])): ?>
            <div class="place-desc-block place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="far fa-credit-card" title="Payments Accepted"></i>
                </div>
                <div class="place-row-content"><span>Payments Accepted</span>
                    <div class="flex-container" style="margin-top: 10px">
                        <?php foreach ($doc['paymentsAccepted'] as $item) {
                            echo "<span class='item'>$item</span>";
                        } ?>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <?php if ( ! empty($place_desc)): ?>
            <div class="place-desc-block place-details-panel-inner-row">
                <div class="place-row-icon">
                    <i class="fas fa-info-circle" title="About this place"></i>
                </div>
                <div class="place-row-content">
                    <span class="desc"><?php echo html_entity_decode($place_desc); ?></span>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <?php if ( ! empty($doc['images'])): ?>
        <div class="place-attributes">
            <div class="featuresTitle place-details-panel-inner-row place-details-panel-inner-title">
                <i class="fas fa-image" title="<?php echo $place_name; ?> photos"></i> Photos (<?php echo count($doc['images']); ?>)
            </div>
            <div class="place-details-panel-inner-row place-details-panel-inner-photo place-details-attribute-row">
                <?php foreach ($doc['images'] as $key_img => $image):
                    $image['url'] = preg_replace('/^http:/i', 'https:', $image['url']);
                    ?>
                    <a href="<?php echo $image['url']; ?>">
                        <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['caption']; ?>" title="<?php echo $image['caption']; ?>"/>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>
    <?php endif; ?>

    <?php if ( ! empty($doc['parkingLocations']) && ! empty($doc['parkingLocations'][0])): ?>
        <div class="place-attributes">
            <div class="featuresTitle place-details-panel-inner-row place-details-panel-inner-title">
                <i class="fas fa-parking" title="Parking locations"></i> Parking (<?php echo count($doc['parkingLocations']); ?>)
            </div>
            <div class="flex-container">
                <?php foreach ($doc['parkingLocations'] as $item) {
                    echo "<span class='item'>$item</span>";
                } ?>
            </div>
        </div>
    <?php endif; ?>

    <?php if ( ! empty($doc['wifi'])): ?>
        <div class="place-attributes">
            <div class="featuresTitle place-details-panel-inner-row place-details-panel-inner-title">
                <i class="fas fa-wifi" title="Parking locations"></i> Wi-Fi
            </div>
            <div class="flex-container">
                <span class='item'><?php echo $doc['wifi'] ?></span>
            </div>
        </div>
    <?php endif; ?>

    <?php if ( ! empty($doc['amenities']) && ! empty($doc['amenities'][0])): ?>
        <div class="place-attributes amenities">
            <div class="featuresTitle place-details-panel-inner-row place-details-panel-inner-title">
                <i class="fas fa-concierge-bell" title="Parking locations"></i> Services and Conveniences
            </div>
            <div class="flex-container">
                <?php foreach ($doc['amenities'] as $item) {
                    echo "<span class='item'><i class=\"fas fa-check\"></i>&nbsp;".$item['description']."</span>";
                } ?>
            </div>
        </div>
    <?php endif; ?>

    <?php if ( ! empty($doc['ambience']) && ! empty($doc['ambience'][0])): ?>
        <div class="place-attributes amenities">
            <div class="featuresTitle place-details-panel-inner-row place-details-panel-inner-title">
                <i class="fas fa-leaf" title="Parking locations"></i> Ambience
            </div>
            <div class="flex-container">
                <?php foreach ($doc['ambience'] as $item) {
                    echo "<span class='item'><i class=\"fas fa-check\"></i>&nbsp;".$item."</span>";
                } ?>
            </div>
        </div>
    <?php endif; ?>

    <?php if ( ! empty($doc['reviews'])): ?>
        <div id="reviewsSection" class="place-attributes">
            <div class="featuresTitle place-details-panel-inner-row place-details-panel-inner-title">
                <img src="<?php echo \helper\url::theme_url() ?>resources/images/yelp-logo-small.png" style="float: right;" alt="Reviews from Yelp.com"> Reviews from Yelp.com
                (<?php echo $doc['reviewCount']; ?>)
            </div>
            <div class="place-details-panel-inner-row place-details-attribute-row">
                <?php foreach ($doc['reviews'] as $key_review => $review): ?>
                    <ul class="review-list">
                        <li>
                            <?php echo \helper\themes::get_layout('vote',
                                [
                                    'post_id'   => $place_id.'-'.$key_review, 'aggregateRating' => $review['reviewRating'], 'name' => $review['reviewRating']['author']['name'],
                                    'read_only' => true,
                                ]); ?>
                            <span><?php echo date('M d, Y', strtotime($review['created'])); ?></span><br>
                            <span><?php echo $review['reviewBody']; ?> <a href="<?php echo preg_replace('/(adjust_creative=mapquest&|&utm_source=mapquest)/', '', $review['reviewUrl']); ?>"
                                                                          target="_blank" rel="nofollow">(read more)</a> </span>
                        </li>
                    </ul>
                <?php endforeach; ?>
                <a href="<?php echo preg_replace('/\?.+$/i', '', $doc['reviews'][0]['reviewUrl']) ?>" target="_blank" rel="nofollow">See all <?php echo $doc['reviewCount']; ?> Yelp
                    reviews</a>
            </div>
        </div>
    <?php endif; ?>
</div>

<script>
    $(document).ready(function (e) {
        // Re-active lightbox for place's photos
        if ($('div.place-details-panel-inner-photo a').length != 0) {
            $('div.place-details-panel-inner-photo a').simpleLightbox({
                'animationSpeed': 200
            });
        }
        initLat = <?php echo $doc['latLng']['lat'];?>;
        initLng = <?php echo $doc['latLng']['lon'];?>;
        placeLabel = "<?php echo $place_name.', '.$place_addr_line1.' '.$place_addr_line2;?>";
        placeThumb = "<?php echo !empty($doc['images']) ? $doc['images'][0]['url'] : '';?>";
        // No zooming or adding info bubble on map if user is getting directions
        if ($('#routeInstructionsPanel').is(":hidden") && showBubbleOnMap) {
            // Remove all existing markers on the map before adding a new one
            removeObjectById("customMarker");
            removeObjectById("groupDOMMarker");

            // Hide list place if its existed
            $("div.place-list-panel-inner").hide();
            $(".btn-place-details-close").hide();
            $("div.place-details-panel").fadeIn('fast');

            // Add info bubble on map
            addInfoBubble(map, ui, initLat, initLng, placeLabel, placeThumb);
            map.setCenter({lat: initLat, lng: initLng - 0.005});
            map.setZoom(zoomIntersection);
        }

        // Search businesses around a given place
        $('.search-nearby').click(function (e) {
            e.preventDefault();
            var urlPath = ($(this).attr('href'));
            var category = getURLParameter(urlPath, 'category');
            var currentLocation = getURLParameter(urlPath, 'currentLocation');
            var page = getURLParameter(urlPath, 'page');
            var limit = getURLParameter(urlPath, 'limit');

            $("div.place-details-panel").hide();
            $(".btn-place-details-close").hide();
            $("div.place-list-panel-inner").fadeIn('fast');

            searchBusinessesAround(category, currentLocation, page, limit, urlPath);
        });
    });
</script>