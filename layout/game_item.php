<?php echo \helper\themes::get_layout('menu_layout'); ?>
<div class="form-container">
    <div class="inner-form">
        <div class="topBox">
            <div class="logo-bar">
                <a class="logoBox">
                    <img width="160" height="50" src="<?php echo \helper\image::get_thumbnail(\helper\options::options_by_key_type('logo'), 160, 50, 'm'); ?>" alt="<?php \helper\options::options_by_key_type('site_name'); ?>" title="<?php \helper\options::options_by_key_type('site_name'); ?>" />
                </a>
            </div>
            <div class="flex-top-form">
                <div class="menuBox">
                    <div class="flex-group flex-menuBox">
                        <div class="icon iconMenu" onclick="mainNav.openMenu()">
                            <img width="20" height="20" src="/<?php echo DIR_THEME ?>rs/imgs/iconMenu.svg" alt="<?php echo \helper\options::options_by_key_type('site_name'); ?> icon-menu" title="<?php echo \helper\options::options_by_key_type('site_name'); ?> icon-menu" />
                        </div>
                        <div class="searchLocation">
                            <input id="fieldStarting" class="fieldStarting" type="text" placeholder="Start searching..." value="" autocomplete="off" />

                        </div>
                        <div class="icon iconDirections" onclick="mainNav.showDirectionBox()">
                            <img width="35" height="34" src="/<?php echo DIR_THEME ?>rs/imgs/iconDirections.svg" alt="<?php echo \helper\options::options_by_key_type('site_name'); ?> icon-directions" title="<?php echo \helper\options::options_by_key_type('site_name'); ?> icon-directions" />
                        </div>
                        <ul id="suggestionStarting" class="suggestionLocation"></ul>
                    </div>
                </div>
                <div class="categories">
                    <div class="search-form">
                        <div class="flex-group flex-categories"></div>
                    </div>

                    <div class="search-form" style="display: flex;align-items: center;justify-content: space-between;">
                        <button class="showMore" onclick="mainNav.showMore()">More Options</button>
                        <span class="text-overflow findingCategory"></span>
                    </div>
                    <div class="search-form extendMenu">
                        <div class="rangeBox">
                            <div class="slidecontainer">
                                <input type="range" min="5" max="100" value="10" class="slider" step="5" id="myRange" />
                                <div class="inner-showRange">
                                    <span id="demo"></span><span>(km)</span>
                                </div>
                            </div>
                        </div>
                        <div class="limitBox">
                            <select id="limitFinding">
                                <option value="10" selected>10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div class="menuBtn">

                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-form">
                <div class="search-form">
                    <div class="flex-group flex-transports"></div>
                </div>
                <div class="search-form">
                    <div class="back" onclick="mainNav.back()">
                        < Back</div>
                    </div>
                    <div class="search-form">
                        <div class="search-group">
                            <div class="svg-Icon">
                                <img src="/<?php echo DIR_THEME ?>rs/imgs/start.png" width="30" height="30" alt="current location" title="current location" />
                            </div>
                            <input id="field-location" type="text" class="search-field field-location" placeholder="Current or Start location" autocomplete="off" />

                        </div>
                        <ul id="suggestionLocation" class="suggestionLocation"></ul>
                    </div>

                    <div class="search-form" id="viaForm">
                        <div class="search-group">
                            <div class="svg-Icon">
                                <img src="/<?php echo DIR_THEME ?>rs/imgs/via.png" width="30" height="30" alt="via location" title="via location" />
                            </div>
                            <input id="field-via-destination" type="text" class="search-field field-destination" placeholder="Where are you going?" autocomplete="off" />
                            <div class="svg-Icon rightIcon" onclick="mainNav.closeVia()">
                                <svg fill="#ccc" height="20" viewBox="0 0 311 311.09867" width="20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m16.042969 311.097656c-4.09375 0-8.191407-1.554687-11.304688-4.691406-6.25-6.25-6.25-16.386719 0-22.636719l279.058594-279.058593c6.253906-6.253907 16.386719-6.253907 22.636719 0 6.25 6.25 6.25 16.382812 0 22.632812l-279.0625 279.0625c-3.136719 3.136719-7.230469 4.691406-11.328125 4.691406zm0 0" />
                                    <path d="m295.125 311.097656c-4.09375 0-8.191406-1.554687-11.304688-4.691406l-279.082031-279.082031c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.632813 0l279.0625 279.082031c6.25 6.25 6.25 16.386719 0 22.636719-3.136719 3.136719-7.230469 4.691406-11.308594 4.691406zm0 0" />
                                </svg>
                            </div>
                        </div>
                        <ul id="suggestionViaDestination" class="suggestionLocation"></ul>
                    </div>

                    <div class="search-form">
                        <div class="search-group">
                            <div class="svg-Icon">
                                <img src="/<?php echo DIR_THEME ?>rs/imgs/finish.png" width="30" height="30" alt="via location" title="via location" />
                            </div>
                            <input id="field-destination" type="text" class="search-field field-destination" placeholder="Where are you going?" autocomplete="off" />
                        </div>
                        <ul id="suggestionDestination" class="suggestionLocation"></ul>
                    </div>

                    <div class="search-form">
                        <button class="addVia" onclick="mainNav.openVia()">
                            <span class="icon-add">
                                <img src="/<?php echo DIR_THEME ?>rs/imgs/add.svg" width="20" height="20" alt="current location" title="current location">
                            </span>
                            Add stop
                        </button>
                    </div>
                    <div class="search-form">
                        <button class="submitForm getDirection" onclick="mainNav.showRouteLine()">Get Direction</button>
                    </div>
                </div>
                <div class="instructions">
                    <div class="search-form">
                        <div class="panel" id="panel"></div>
                    </div>
                </div>
            </div>
            <br />
            <div class="topBox" style="margin-bottom:30px">
                <h1 class="site-title"><?php echo \helper\options::options_by_key_type('site_name'); ?></h1>
                <p class="site-description"><?php echo \helper\options::options_by_key_type('site_description'); ?></p>
                <div class="guide">
                    <h2>How to using?</h2>
                    <?php if ($slogan) : ?>
                        <?php echo html_entity_decode($slogan); ?>
                    <?php else : ?>
                        <p>Type on input "Start searching..." to select the start point.</p>
                        <p>Click to the category below to find something you want are near you from your position or starting point.</p>
                        <p>Tips: You can choose more results, a longer radius to finding some category near you</p>
                        <p>To directions, there are 2 ways to do that.</p>
                        <ol>
                            <li>Right-click on the map to set start, via, destination points. Click to "Set as a destination" for directions.</li>
                            <li>Click to icon directions green color to move to layout directions. And type location you want to go and click "Get directions".</li>
                        </ol>
                        <p>There is more than one choice you can try. And see the result below.</p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <div class="hiddenFixed" onclick="mainNav.hiddenFixedBox(this)"><</div>
        </div>

        <div id="mapContainer"></div>