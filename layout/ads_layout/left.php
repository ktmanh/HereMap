<div class="ads-left" style="top:<?php echo $top; ?>">
    <?php if ($enable_ads): ?>
        <div class="ads-title">
            Advertisement
        </div>
    <?php endif; ?>
    <div class="ads-content">
        <?php if ($enable_ads) {
            include 'ads/left.php';
        } ?>
    </div>
</div>