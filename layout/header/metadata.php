<?php
if (!$favicon) {
    $favicon = \helper\options::options_by_key_type('favicon');
}
$fix_url = $base_url;
?>
<title><?= ucwords($site_title); ?></title>
<meta name="description" content="<?= $site_description ?>" data-react-helmet="true">
<meta name = "title" content = "<?php echo $site_title ?>" data-react-helmet="true">
<?php if (!empty($site_keywords)): ?>
    <meta name="keywords" content="<?= strtolower($site_keywords); ?>">
    <meta name="news_keywords" content="<?= strtolower($site_keywords); ?>">
<?php endif; ?>
<link rel="canonical" href="<?= $fix_url ?>">
<link rel="icon" href="<?php echo $favicon; ?>"/>
<!-- META FOR FACEBOOK -->
<meta property="og:title" content="<?= $site_title; ?>" itemprop="headline" data-react-helmet="true"/>
<meta property="og:type" content="website" />
<meta property="og:url" itemprop="url" content="<?= $fix_url ?>" data-react-helmet="true"/>
<meta property="og:image" itemprop="thumbnailUrl" content="<?= $banner ?>"/>
<meta property="og:description" content="<?= $site_description ?>" itemprop="description" data-react-helmet="true" />
<meta property="og:site_name" content="<?= $site_name ?>" />
<link rel="apple-touch-icon" href="<?php echo $favicon ?>"/>
<!-- META FOR TWITTER -->
<meta name="twitter:title" content="<?= $site_title; ?>" data-react-helmet="true"/>
<meta name="twitter:url" content="<?= $fix_url ?>" data-react-helmet="true"/>
<meta name="twitter:image" content="<?= $banner ?>"/>
<meta name="twitter:description" content="<?= $site_description ?>" data-react-helmet="true"/>
<meta name="twitter:card" content="summary"/>
