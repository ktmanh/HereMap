<?php
$custom = \helper\themes::get_layout('header/metadata_home');
$data['custom'] = $custom;
$slogan = \helper\options::options_by_key_type('company_slogan', 'company');
echo \helper\themes::get_header($data);
echo \helper\themes::get_layout('xhr_test',array('slogan'=>$slogan));
//echo \helper\themes::get_layout('footer');
?>   
