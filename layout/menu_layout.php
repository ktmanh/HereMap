<div class="menu_layout">
    <div class="innerMenu_layout">
        <div class="logoMenu_layout">
            <a class="logoBox">
                <img width="160" height="50" src="<?php echo \helper\image::get_thumbnail(\helper\options::options_by_key_type('logo'), 160, 50, 'm'); ?>" alt="<?php echo \helper\options::options_by_key_type('site_name'); ?>" title="<?php echo \helper\options::options_by_key_type('site_name'); ?>" />
            </a>
            <div class="closeBox" onclick="mainNav.closeMenu()">
                <img  width="16px" height="16px" src="/<?php echo DIR_THEME ?>rs/imgs/close.svg" alt="close" title="close" />
            </div>
        </div>
        <div class="somethingBox">
            <ul>
                <li>
                    <a class="a-st" onclick="mainNav.closeMenu()">Map</a>
                </li>
                <li>
                    <a class="a-st" onclick="mainNav.OpenDirection()">Get Directions</a>
                </li>
<!--                <li>
                    <a class="a-st" onclick="mainNav.openGuide()">User manual</a>
                </li>-->
                <li>
                    <a class="a-st" onclick="mainNav.openAboutUs()">About us</a>
                </li>
            </ul>
            <div class="about">
                <h2><?php echo \helper\options::options_by_key_type('site_name'); ?></h2>
                <div style="height:10px"></div>
                <p class="site-description"><?php echo \helper\options::options_by_key_type('site_description'); ?></p>
            </div>
        </div>
    </div>
</div>
