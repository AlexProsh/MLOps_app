// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function adf_getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function adfinityMakeSticky(params={}) {
    var id = params.id ?? "adfinity-sticky";
    var h = document.getElementById(id);
    var stickPoint = false;
    console.log('adfnity maked sticky');

    var topOffsetStartSticky = (typeof params.topOffset != 'undefined') ? parseInt(params.topOffset) : 0;

    h.style.position = 'static';

    adfUtils.on('ready', function(){
        stickPoint = adfUtils.getCoords(h).top;
    });

    window.addEventListener('scroll', function (e) {
        var curTopOffset = adfUtils.getCoords(h).top;
        var offset = window.scrollY;
        var isFixed = (h.style.position == 'fixed');
        if ((curTopOffset - offset < topOffsetStartSticky) && !isFixed) {
            stickPoint = curTopOffset;
            h.style.width = h.clientWidth + 'px';
            h.style.position = 'fixed';
            h.style.top = topOffsetStartSticky + 'px';
        } else if (isFixed && (offset <= stickPoint)) {
            h.style.position = 'static';
        }
    });

}

function setCookie(name, value, options = {}, path = '/') {

    options = {
        path: path,
        domain: document.location.hostname,
        // ��� ������������� �������� ������ �������� �� ���������
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (var optionKey in options) {
        updatedCookie += "; " + optionKey;
        var optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}


var interstitialLoaded = false;


var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))
    || window.screen.width < 728
) {
    isMobile = true;
}

var isFramed = false;
try {
    isFramed = window != window.top || document != top.document || self.location != top.location;
} catch (e) {
    isFramed = true;
}
//end Creating interstitital

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
// function getCookie(name) {
//     var matches = document.cookie.match(new RegExp(
//         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// }
//
// //End Getting cookie
// console.log(getCookie('isInterstitialWatched'));
// // var subdomainIsSetted = false;
// function setCookie(name, value, options = {}, path = '/') {
//     // if(subdomainIsSetted == false) {
//     //     subdomainIsSetted = true;
//     //     setCookie(name, value, options, a_subdomain);
//     //
//     // }
//     if(!document.location.href.match('littleone.com')) {
//         // var body = document.querySelector('body');
//         // var interstitial = document.getElementById('interstitial-mega-wrapper');
//         // body.prepend(interstitial);
//     }
//
//
//     options = {
//         path: path,
//         domain: document.location.hostname,
//         // ��� ������������� �������� ������ �������� �� ���������
//         ...options
//     };
//
//     if (options.expires instanceof Date) {
//         options.expires = options.expires.toUTCString();
//     }
//
//     var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
//
//     for (var optionKey in options) {
//         updatedCookie += "; " + optionKey;
//         var optionValue = options[optionKey];
//         if (optionValue !== true) {
//             updatedCookie += "=" + optionValue;
//         }
//     }
//
//     document.cookie = updatedCookie;
// }

//Brain of refreshing
function makeAdfoxRefresh(id, sec) {
    var checkTimer;
    var banner = document.getElementById(id);
    var firstTimeView = true;
    var timerId;
    checkTimer = setInterval(() => {
        if (banner === null) {
            banner = document.getElementById(id);
        } else {
            clearInterval(checkTimer);
            var handler = onVisibilityChange(banner, function () {
                firstTimeView = isElementInViewport(banner) === true;
                if (firstTimeView === true) {
                    if (banner.style.display !== 'none') {
                        banner.addEventListener('click', function () {
                            window.Ya.adfoxCode.reload(id);
                        });
                        console.log('зашел в зону видимости первый раз и запомнил это, создал релоад')
                        if (timerId) {
                            clearInterval(timerId);
                        }
                        timerId = setInterval(() => {
                            window.Ya.adfoxCode.reload(id);
                            console.log('Наш рефреш id блока ' + id);
                        }, sec * 1000);
                        firstTimeView = false;
                    }
                } else {
                    console.log('Вышел из зоны видимости и запомнил это, удалил релоад')
                    firstTimeView = true;
                    clearInterval(timerId);
                }
            });
            if (window.addEventListener) {
                addEventListener('DOMContentLoaded', handler, false);
                addEventListener('load', handler, false);
                addEventListener('scroll', handler, false);
                addEventListener('resize', handler, false);
            } else if (window.attachEvent) {
                attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
                attachEvent('onload', handler);
                attachEvent('onscroll', handler);
                attachEvent('onresize', handler);
            }
        }

    }, 1000);
    // var timerId = setInterval(() => window.Ya.adfoxCode.reload(id), 20000);
}

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function onVisibilityChange(el, callback) {
    var old_visible = false;
    return function () {
        var visible = isElementInViewport(el);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}

//Brain of refreshing
var overlayLoaded = false;

function makeAdsPoppup(startTime, duration, id) {
    if (overlayLoaded === false) {
        overlayLoaded = true;
        var adfoxBlock = document.getElementById(id);
        adfoxBlock.style.display = 'none';
        // console.log(getCookie("isPoppupFlag"));
        // if(getCookie("isPoppupFlag") === undefined) {
        // var date = new Date(Date.now() + 900e3);
        //date = date.toUTCString();
        // document.cookie = "isPoppupFlag=true; expires=" + date;
        // }

        setTimeout(() => {
            // console.log(getCookie("isPoppupFlag"));
            //if(getCookie("isPoppupFlag") === "true") {
            // var date = new Date(Date.now() + 900e3);
            // date = date.toUTCString();
            //document.cookie = "isPoppupFlag=false; expires="+date;
            createPoppupBanner(duration, id);
            //}
        }, startTime * 1000);
    }

    function createPoppupBanner(duration, id) {
        var adfoxBlock = document.getElementById(id);
        var time = duration;
        var banner = document.getElementById('poppup-ads-banner');
        var closeAdButton = document.getElementById('poppup-close-ad');
        var adsPoppup = document.getElementById('ads-poppup');
        banner.style.display = 'flex';
        adfoxBlock.style.display = 'block';
        var timerId = setInterval(function () {
            closeAdButton.innerText = time.toString();
            time = time - 1;

        }, 1000);
        setTimeout(() => {
            clearInterval(timerId);
            closeAdButton.innerHTML = '<img class="ad-close-arrow" src="https://cdn.adfinity.pro/foralls/imgs/arrow-down-sign-to-navigate.svg" width="15">';
            closeAdButton.addEventListener('click', function () {
                adsPoppup.innerHTML = '';
                closeAdButton.style.cursor = 'pointer';
                banner.style.display = 'none';
                adfoxBlock.style.display = 'none';
                window.Ya.adfoxCode.destroy(id);
            });
        }, time * 1000);
    }
}


var adfinityOverlayIsRendered = false;
var overlayUiRender = true;

function makeAdfinityOverlay(adfoxCallback,
                             duration,
                             startTime,
                             id,
                             width = 320,
                             height = 100,
                             refreshing = false,
                             autoClose = false,
                             checkIfRendered = false,
                             excludeUi = false,
                             startScrollTop = 0,
) {
    if (window.innerWidth <= 1023) {
        adfinityOverlayIsRendered = false;
        var adfinityOverlayIsClosed = false;
        var firstLoad = true;

        if (excludeUi) {
            overlayUiRender = false;
        }


        var blockInit = false; // признак инициации блока

        if(startTime > 0 || startScrollTop > 0){
            if(startTime > 0){
                setTimeout(() => {
                    initBlock();
                }, startTime * 1000);
            }
            if(startScrollTop > 0){
                document.addEventListener('scroll', function () {
                    if(window.scrollY >= parseInt(startScrollTop)){
                        initBlock();
                    }
                });
            }
        } else {
            initBlock();
        }



        function initBlock() {
            if(blockInit){
                return false;
            }
            blockInit = true;
            if (refreshing !== false) {
                createPoppupBanner(duration, id);
                var refreshingInteval = setInterval(function () {
                    if (!firstLoad) {
                        if (adfinityOverlayIsClosed) {
                            adfinityOverlayIsClosed = false;
                            createPoppupBanner(duration, id);
                        }
                    }
                }, refreshing * 1000);
            } else {
                createPoppupBanner(duration, id);
            }
        }

        function createPoppupBanner(duration, id) {

            var adfoxInsertBlock = document.createElement('div');
            adfoxInsertBlock.id = id;

            if (document.body != null) {
                document.body.insertBefore(adfoxInsertBlock, document.body.firstChild);
            }

            adfoxCallback();

            if(checkIfRendered) {
                checkIfRenderedInterval = setInterval(function () {
                    adfinityOverlayIsRendered = document.getElementById(id).children.length > 0;
                    if(adfinityOverlayIsRendered) {
                        clearInterval(checkIfRenderedInterval);
                        if(excludeUi) {
                            var intervalToCheckExcludeUi = setInterval(function () {
                                if(overlayUiRender === 'clear') {
                                    clearInterval(intervalToCheckExcludeUi);
                                }

                                if(overlayUiRender && overlayUiRender !=='clear') {
                                    clearInterval(intervalToCheckExcludeUi);
                                    createDom();
                                }
                            }, 50)
                        } else {
                            createDom();
                        }

                    }
                }, 50);
            } else {
                if(excludeUi) {
                    var intervalToCheckExcludeUi = setInterval(function () {
                        if(overlayUiRender === 'clear') {
                            clearInterval(intervalToCheckExcludeUi);
                        }

                        if(overlayUiRender && overlayUiRender !=='clear') {
                            clearInterval(intervalToCheckExcludeUi);
                            createDom();
                        }
                    }, 50)
                } else {
                    createDom();
                }
            }

            function createDom() {
                overlayUiRender = false;
                adfinityOverlayIsRendered = false;
                firstLoad = false;

                var poppupWrapper = document.createElement('div');
                poppupWrapper.id = 'adfinity-overlay';
                poppupWrapper.classList.add('poppup-banner-ads-wrapper');

                var poppupArrow = document.createElement('div');
                poppupArrow.classList.add('poppup-banner-ads-arrow');
                poppupArrow.id = 'adfinity-overlay-close-button';

                var poppupOverlayAds = document.createElement('div');
                poppupOverlayAds.id = 'adfinity-overlay-ads';
                poppupOverlayAds.classList.add('mobile-poppup');

                var poppupOverlayHeader = document.createElement('div');
                poppupOverlayHeader.classList.add('adfinity-overlay-header');

                // var adfLogo = document.createElement('img');
                // adfLogo.src = 'https://cdn.adfinity.pro/foralls/imgs/logo.svg';
                // adfLogo.classList.add('adf-logo');

                var adfLogoLink = document.createElement('a');
                // adfLogoLink.appendChild(adfLogo);
                adfLogoLink.href = 'https://adfinity.pro?utm_source=ads&utm_medium=m_overlay&utm_campaign=' + window.location.hostname;
                adfLogoLink.rel = 'nofollow';
                adfLogoLink.classList.add('adf-logo');
                adfLogoLink.target = '_blank';

                var poppupCloseButtonWrapper = document.createElement('div');
                poppupCloseButtonWrapper.classList.add('poppup-close-button-wrapper');

                var closeText = document.createElement('span');
                closeText.classList.add('poppup-close-text');

                poppupWrapper.appendChild(poppupOverlayHeader);

                poppupOverlayHeader.appendChild(adfLogoLink);
                poppupCloseButtonWrapper.appendChild(closeText);
                poppupCloseButtonWrapper.appendChild(poppupArrow);
                poppupOverlayHeader.appendChild(poppupCloseButtonWrapper);

                closeText.innerText = 'До закрытия блока';


                poppupWrapper.appendChild(poppupOverlayAds);

                poppupOverlayAds.appendChild(adfoxInsertBlock);

                var hMeasur = (height.toString().indexOf('vh') >= 0) ? 'vh' : 'px';
                poppupOverlayAds.style.maxHeight = parseInt(height) + hMeasur;
                poppupOverlayAds.style.width = parseInt(width) + 'px';

                if (document.body != null) {
                    document.body.insertBefore(poppupWrapper, document.body.firstChild);
                }

                var time = duration;
                var closeAdButton = document.getElementById('adfinity-overlay-close-button');
                var adsPoppup = document.getElementById('adfinity-overlay-ads');

                poppupWrapper.style.display = 'flex';


                var timerId = setInterval(function () {
                    closeAdButton.innerText = time.toString();
                    time = time - 1;
                }, 1000);

                setTimeout(() => {
                    clearInterval(timerId);
                    closeText.remove();
                    // closeAdButton.style.background = '#fc5a5a';
                    closeAdButton.innerHTML = '<img class="ad-close-arrow" src="https://cdn.adfinity.pro/foralls/imgs/arrow-down-close.svg" width="15">';
                    closeAdButton.addEventListener('click', closeOverlay);
                    if (autoClose) {
                        closeOverlay();
                    }
                }, time * 1000);

                function closeOverlay() {
                    poppupArrow.style.cursor = 'pointer';
                    poppupArrow.innerHTML = 'X';
                    poppupWrapper.style.display = 'none';
                    adfoxInsertBlock.style.display = 'none';
                    window.Ya.adfoxCode.destroy(id);
                    adfinityOverlayIsClosed = true;

                    poppupWrapper.remove();
                }

            }

        }
    }
}


var adfinityDOverlayIsRendered = false;

function adfinityMakeDesktopOverlay(adfoxCallCode,
                                    adfoxId,
                                    timeToClose,
                                    refreshAfterClose = false,
                                    position = 'right',
                                    autoClose = false,
                                    width = '336px',
                                    height = '280px') {
    var savedTime = timeToClose;
    var firstLoad = true;
    var overlayIsClosed = false;

    if (!refreshAfterClose) {
        createDesctopOverlay()
    } else {
        if (firstLoad) {
            createDesctopOverlay()
            firstLoad = false;
        }
    }

    function createDesctopOverlay() {
        timeToClose = savedTime;
        adfinityDOverlayIsRendered = false;
        overlayIsClosed = false;
        timeToClose++;
        var adfoxDiv = document.createElement('div');
        adfoxDiv.id = adfoxId;
        document.body.appendChild(adfoxDiv);


        var adfDesctopOverlayTopBarRightsideCloseButton = document.createElement('div');
        adfDesctopOverlayTopBarRightsideCloseButton.classList.add('adf_desctop_overlay_topbar_rightside_closebutton');

        var adfDesctopOverlayTopBarRightSideText = document.createElement('div');
        adfDesctopOverlayTopBarRightSideText.innerText = 'До закрытия рекламы'
        adfDesctopOverlayTopBarRightSideText.classList.add('adf_desctop_overlay_topbar_rightside_text');


        var adfDesctopOverlayLogoLink = document.createElement('a');
        // adfDesctopOverlayLogoLink.appendChild(adfDesctopOverlayLogo);
        adfDesctopOverlayLogoLink.href = 'https://adfinity.pro?utm_source=ads&utm_medium=d_overlay&utm_campaign=' + window.location.hostname;
        adfDesctopOverlayLogoLink.rel = 'nofollow';
        adfDesctopOverlayLogoLink.target = '_blank';


        var adfDesctopOverlayTopBarLeftsideDiv = document.createElement('div');
        adfDesctopOverlayTopBarLeftsideDiv.classList.add('adf_desctop_overlay_topbar_leftside');
        adfDesctopOverlayTopBarLeftsideDiv.appendChild(adfDesctopOverlayLogoLink);

        var adfDesctopOverlayTopBarRightsideDiv = document.createElement('div');
        adfDesctopOverlayTopBarRightsideDiv.classList.add('adf_desctop_overlay_topbar_rightside');
        adfDesctopOverlayTopBarRightsideDiv.appendChild(adfDesctopOverlayTopBarRightSideText);
        adfDesctopOverlayTopBarRightsideDiv.appendChild(adfDesctopOverlayTopBarRightsideCloseButton);


        var adfDesctopOverlayAdsContentDiv = document.createElement('div');
        adfDesctopOverlayAdsContentDiv.classList.add('adf_desctop_overlay_ads_content');
        adfDesctopOverlayAdsContentDiv.appendChild(adfoxDiv);
        adfDesctopOverlayAdsContentDiv.style.width = width;
        adfDesctopOverlayAdsContentDiv.style.height = height;
        var adfDesctopOverlayTopBarDiv = document.createElement('div');
        adfDesctopOverlayTopBarDiv.classList.add('adf_desctop_overlay_topbar');
        adfDesctopOverlayTopBarDiv.appendChild(adfDesctopOverlayTopBarLeftsideDiv);
        adfDesctopOverlayTopBarDiv.appendChild(adfDesctopOverlayTopBarRightsideDiv);


        var adfDesctopOverlayDiv = document.createElement('div');
        adfDesctopOverlayDiv.classList.add('adf_desctop_overlay');
        adfDesctopOverlayDiv.appendChild(adfDesctopOverlayTopBarDiv);
        adfDesctopOverlayDiv.appendChild(adfDesctopOverlayAdsContentDiv);
        adfDesctopOverlayDiv.style.bottom = '-10000000px';

        document.body.appendChild(adfDesctopOverlayDiv)

        if (position) {
            if (position === 'left') {
                adfDesctopOverlayDiv.style.left = '0';
            }
            if (position === 'right') {
                adfDesctopOverlayDiv.style.right = '0';
            }
            if(position == 'full'){ // перетяжка
                adfDesctopOverlayDiv.classList.add('adfinity-overlay-peretyagka');
            }
        }

        adfoxCallCode();

        var startInterval = setInterval(function () {
            if (adfinityDOverlayIsRendered) {
                adfDesctopOverlayDiv.style.bottom = '0';
                adfDesctopOverlayAdsContentDiv.style.width = "auto";
                adfDesctopOverlayAdsContentDiv.style.height = "auto";
                adfDesctopOverlayAdsContentDiv.style.maxWidth = width;
                adfDesctopOverlayAdsContentDiv.style.maxHeight = height;
                var ticsInterval = setInterval(function () {
                    if (timeToClose > 0) {
                        makeByTick();
                    } else {
                        clearInterval(ticsInterval);
                        var crossButton = document.createElement('img');
                        crossButton.src = 'https://cdn.adfinity.pro/foralls/imgs/arrow-down-close.svg';
                        adfDesctopOverlayTopBarRightsideCloseButton.innerHTML = '';
                        adfDesctopOverlayTopBarRightsideCloseButton.appendChild(crossButton);
                        adfDesctopOverlayTopBarRightSideText.innerText = '';

                        adfDesctopOverlayTopBarRightsideCloseButton.style.cursor = 'pointer';
                        adfDesctopOverlayTopBarRightsideCloseButton.addEventListener('click', closeAds);
                        if (autoClose === true) {
                            closeAds();
                        }
                    }
                }, 1000)
                clearInterval(startInterval);
            }
        }, 50)

        function makeByTick() {
            timeToClose--;
            adfDesctopOverlayTopBarRightsideCloseButton.innerHTML = '<span>' + timeToClose + '<span>';
        }

        function closeAds() {
            window.Ya.adfoxCode.destroy(adfoxId);
            adfDesctopOverlayDiv.remove();
            overlayIsClosed = true;
            if (refreshAfterClose) {
                var reinvokeInterval = setTimeout(function () {
                    if (overlayIsClosed) {
                        createDesctopOverlay();
                        clearInterval(reinvokeInterval);
                    }
                }, refreshAfterClose * 1000)
            }
        }
    }
}


//Creating interstitital
function makeInterstitial(progressTime, crestTime, id) {
    if (interstitialLoaded === false) {
        interstitialLoaded = true;
        var body = document.getElementsByTagName('body');
        var time = progressTime;
        document.body.style.overflowY = 'hidden';
        document.body.style.overflowX = 'hidden';
        document.body.classList.add("off-stpd-shts")
        var timerBlock = document.getElementById('own-timer');
        var counter = time;
        var wrapper = document.getElementById('interstitial-mega-wrapper');
        var progressLine = document.getElementById('progress-line');
        var progressBar = document.getElementById('load-progress');

        var cancelText = document.createElement("span");
        if (!document.location.href.match('eg.ru') && !document.location.href.match('autotopik.ru')) {
            cancelText.innerHTML = "Рекламу можно закрыть через";
        }

        cancelText.style.fontSize = '14px';
        cancelText.style.zIndex = '99999';
        cancelText.style.marginRight = '40px';
        cancelText.style.paddingTop = '6px';
        cancelText.style.color = 'white';
        progressBar.prepend(cancelText);
        var intervalId = setInterval(() => doByTicks(), 1000);
        wrapper.style.display = 'block';

        setTimeout(() => {
            // if(document.location.href.match('littleone.com')) {
            //     console.log(document.location.href);
            //     setTimeout(() => {
            //         document.body.style.overflowY = 'scroll';
            //         window.Ya.adfoxCode.destroy(id);
            //         wrapper.innerHTML = '';
            //         wrapper.style.display = 'none';
            //     }, 5000)//время до закрытия в милисекундах
            // }

            clearInterval(intervalId);

            setTimeout(() => {
                var own_timer = document.getElementById('own-timer');
                own_timer.style.background = '#fc5a5a';
                timerBlock.innerHTML = '<img class="cancel-button" src="https://cdn.adfinity.pro/foralls/imgs/cancel.svg">';
                cancelText.innerHTML = '';
                timerBlock.addEventListener('click', function () {
                    document.body.style.overflowY = 'scroll';
                    document.body.style.overflowX = 'auto';
                    document.body.classList.remove("off-stpd-shts")
                    window.Ya.adfoxCode.destroy(id);
                    wrapper.innerHTML = '';
                    wrapper.style.display = 'none';
                });
            }, 1000)
        }, crestTime * 1000)

        function doByTicks() {
            console.log('tick');
            timerBlock.innerText = counter.toString();
            if (progressLine.style.animation === '') {
                progressLine.style.animation = 'progress ' + progressTime + 's forwards';
            }
            counter = counter - 1;
        }
    }

}

var adfinityInterstitialIsRendered = false;
var adfinityTransferCode = false;
var adfinityInterstitialUiRender = true;

function makeAdfinityInterstitial(adfoxCallCode = function () {
}, id, progressTime, closeTime, checkIfRendered = false, excludeYandexFromUi = false) {

    if (window.location.host == 'rusonline.org') {
        checkIfRendered = true;
    }

    if (excludeYandexFromUi) {
        adfinityInterstitialUiRender = false;
    }

    if (window.innerWidth <= 1023) {
        var uiIsRendered = false;
        var adfoxCodeWrapper = document.createElement('div');
        adfoxCodeWrapper.id = id;
        if (document.body != null) {
            document.body.insertBefore(adfoxCodeWrapper, document.body.firstChild);
        }

        adfoxCallCode();

        console.log('test');

        var intervalToCheckUiRender = setInterval(function () {
            if (adfinityInterstitialUiRender && !uiIsRendered) {
                clearInterval(intervalToCheckUiRender);
                uiIsRendered = true;

                var interstitialMegaWrapper = document.createElement('div');
                interstitialMegaWrapper.id = 'interstitial-mega-wrapper';
                interstitialMegaWrapper.classList.add('no-pop');

                interstitialMegaWrapper.style.position = 'absolute';
                interstitialMegaWrapper.style.left = '-10000px';
                interstitialMegaWrapper.style.top = '-10000px';

                var adfWaterMark = document.createElement('div');
                adfWaterMark.classList.add('adfinity-water-mark');

                // var adfLogo = document.createElement('img');
                // adfLogo.src = 'https://cdn.adfinity.pro/foralls/imgs/logo.svg';
                // adfLogo.classList.add('adf-logo');
                //
                // var adfLogoLink = document.createElement('a');
                // adfLogoLink.appendChild(adfLogo);
                // adfLogoLink.href = 'https://adfinity.pro?utm_source=ads&utm_medium=interstitial&utm_campaign=' + window.location.hostname;
                // adfLogoLink.rel = 'nofollow';
                // adfLogoLink.target = '_blank';
                // adfLogoLink.classList.add('adf-logo');

                var interstitialWrapper = document.createElement('div');
                interstitialWrapper.classList.add('own-intestitial-wrapper');

                var ownInterstitalLoadProgressBar = document.createElement('div');
                ownInterstitalLoadProgressBar.classList = 'own-intestitial-load-progress-bar';
                ownInterstitalLoadProgressBar.id = 'load-progress';

                var progressText = document.createElement('span');
                progressText.classList.add('progress-text');

                var ownTimer = document.createElement('span');
                ownTimer.id = 'own-timer';

                var ownInterstitialProgressLine = document.createElement('div');
                ownInterstitialProgressLine.classList.add('own-intestitial-load-progress-line');
                ownInterstitialProgressLine.id = 'progress-line';

                var ownInterstitialContent = document.createElement('div');
                ownInterstitialContent.classList.add('own-interstitial-content');

                // adfWaterMark.appendChild(adfLogoLink);

                // ownInterstitalLoadProgressBar.appendChild(adfLogoLink);

                interstitialMegaWrapper.appendChild(interstitialWrapper);

                interstitialWrapper.appendChild(ownInterstitalLoadProgressBar);

                ownInterstitalLoadProgressBar.appendChild(progressText);

                progressText.appendChild(ownTimer);

                ownInterstitalLoadProgressBar.appendChild(ownInterstitialProgressLine);

                interstitialWrapper.appendChild(ownInterstitialContent);

                ownInterstitialContent.appendChild(adfoxCodeWrapper);

                var cancelText = document.createElement("span");
                if (!document.location.href.match('eg.ru') && !document.location.href.match('autotopik.ru')) {
                    cancelText.innerHTML = "До закрытия блока";
                }

                cancelText.style.fontSize = '14px';
                cancelText.style.zIndex = '99999';
                cancelText.style.marginRight = '40px';
                cancelText.style.paddingTop = '6px';
                cancelText.style.color = '#A3A2A2';
                ownInterstitalLoadProgressBar.append(cancelText);


                if (document.body != null) {
                    document.body.insertBefore(interstitialMegaWrapper, document.body.firstChild);
                }


                var ticksInterval = null;
                var closeTimeToTicks = closeTime;

                if (checkIfRendered) {
                    var intervalToCheckIfRender = setInterval(function () {
                        if (adfinityInterstitialIsRendered && document.getElementById(id).childNodes.length !== 0 && !adfinityTransferCode) {
                            clearInterval(intervalToCheckIfRender);
                            document.body.classList.add("off-stpd-shts");
                            interstitialMegaWrapper.style.position = 'fixed';
                            interstitialMegaWrapper.style.left = '0px';
                            interstitialMegaWrapper.style.top = '0px';
                            document.body.style.overflowY = 'hidden';
                            document.body.style.overflowX = 'hidden';
                            startTimer();
                        }
                    }, 50);
                    // if(closeTime <= 2) {
                    //     setTimeout(function() {
                    //         if(!adfinityInterstitialIsRendered) {
                    //
                    //             clearInterval(intervalToCheckIfRender);
                    //             showClose();
                    //         }
                    //     }, closeTime * 1100);
                    // }
                } else {
                    document.body.classList.add("off-stpd-shts");
                    interstitialMegaWrapper.style.position = 'fixed';
                    interstitialMegaWrapper.style.left = '0px';
                    interstitialMegaWrapper.style.top = '0px';
                    document.body.style.overflowY = 'hidden';
                    document.body.style.overflowX = 'hidden';
                    startTimer();
                }

                function startTimer() {
                    ticksInterval = setInterval(() => tickTimeAndProgress(), 1000);
                    setTimeout(() => {
                        clearInterval(ticksInterval);
                        setTimeout(() => {
                            showClose();
                        }, 1000)
                    }, closeTime * 1000)
                }

                function showClose() {
                    ownTimer.style.background = '#fc5a5a';
                    ownTimer.innerHTML = '<img class="cancel-button" src="https://cdn.adfinity.pro/foralls/imgs/crest-new.svg">';
                    cancelText.innerHTML = '';
                    progressText.addEventListener('click', function () {
                        document.body.style.overflowY = 'scroll';
                        document.body.style.overflowX = 'auto';
                        document.body.classList.remove("off-stpd-shts")
                        interstitialMegaWrapper.style.display = 'none';
                        adfinityInterstitialIsRendered = false;
                        if (!!window.Ya.adfoxCode) {
                            if (document.getElementById(id).childNodes.length !== 0) {
                                window.Ya.adfoxCode.destroy(id);
                            }
                        }
                        interstitialMegaWrapper.innerHTML = '';
                    });
                }

                function tickTimeAndProgress() {
                    ownTimer.innerText = closeTimeToTicks.toString();
                    if (ownInterstitialProgressLine.style.animation === '') {
                        ownInterstitialProgressLine.style.animation = 'progress ' + progressTime + 's forwards';
                    }
                    closeTimeToTicks = closeTimeToTicks - 1;
                }
            }
        }, 100);

    }
}

function adfinityStopScrollV(adfoxCallCode,
                             id,
                             timer,
                             creativeBg = false,
                             progressLineColor = false,
                             progresText = 'Подожите',
                             destroyCreativeAfterClose = false,
                             textColor = 'white',
                             width = '300px',
                             height = '600px') {
    if (window.screen.width < 728) {
        var savedTime = timer;

        document.body.style.overflowY = 'hidden';
        document.body.style.touchAction = 'none';

        var adfoxCodeWrapper = document.createElement('div');
        adfoxCodeWrapper.id = id;
        adfoxCodeWrapper.style.height = height;
        adfoxCodeWrapper.style.width = width;

        if (document.body != null) {
            document.body.insertBefore(adfoxCodeWrapper, document.body.firstChild);
        }

        var wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('adfinity-stop-scrollv-wrapper');

        var creativeWrapperDiv = document.createElement('div');
        creativeWrapperDiv.classList.add('adfinity-stop-scrollv-creative-wrapper');

        var progressLine = document.createElement('div');
        progressLine.classList.add('adfinity-stop-scrollv-progress-line');

        var progressAnimation = document.createElement('div');
        progressAnimation.classList.add('adfinity-stop-scrollv-progress-animation');

        var timerWrapperP = document.createElement('p');

        var textSpan = document.createElement('span');
        textSpan.style.color = textColor;
        textSpan.classList.add('adfinity-stop-scrollv-text');
        textSpan.innerText = progresText;

        var timerSpan = document.createElement('span');
        timerSpan.classList.add('adfinity-stop-scrollv-timer');

        if (document.body != null) {
            document.body.insertBefore(wrapperDiv, document.body.firstChild);
        }

        progressLine.append(timerWrapperP);

        timerWrapperP.append(textSpan);

        timerWrapperP.append(timerSpan);

        wrapperDiv.append(progressLine);
        wrapperDiv.append(progressAnimation);
        wrapperDiv.append(creativeWrapperDiv);
        creativeWrapperDiv.append(adfoxCodeWrapper);

        if (progressLineColor) {
            progressAnimation.style.background = progressLineColor;
        }

        if (creativeBg) {
            creativeWrapperDiv.style.background = creativeBg;
        }

        adfoxCallCode();
        adfoxCodeWrapper.style.height = 'auto';
        adfoxCodeWrapper.style.width = 'auto';
        adfoxCodeWrapper.style.maxWidth = '300px';
        adfoxCodeWrapper.style.maxHeight = '600px';
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        } else {
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
                setTimeout(window.scrollTo(0, 0), 100);
            }
        }

        if (creativeBg) {
            creativeWrapperDiv.style.background = creativeBg;
        }

        var tickInterval = setInterval(doByTick, 1000);

        if (progressAnimation.style.animation === '') {
            progressAnimation.style.animation = 'progress ' + timer + 's forwards';
        }

        function doByTick() {
            timerSpan.innerText = savedTime;
            if (savedTime >= 1) {
                savedTime--;
            } else {
                timerEnd();
            }
        }

        function timerEnd() {
            clearInterval(tickInterval);
            var closeButton = document.createElement('div')
            closeButton.classList.add('adfinity-stop-scrollv-close-button');
            closeButton.innerHTML = '<img class="cancel-button" src="https://cdn.adfinity.pro/foralls/imgs/crest-new.svg">';
            ;
            timerWrapperP.append(closeButton);
            timerSpan.remove();
            closeButton.addEventListener('click', function () {
                removeAds();
            })
        }

        function removeAds() {
            document.body.style.overflowY = 'auto';
            document.body.style.touchAction = 'auto';

            if (!destroyCreativeAfterClose) {
                wrapperDiv.remove();
            } else {
                progressLine.remove();
                progressAnimation.remove();
            }
        }

    }
}

function adfinityStopScroll(adfoxCallCode,
                            id,
                            timer,
                            text,
                            creativeBg = false,
                            creativeTextColor = false,
                            timerBg = false,
                            showTimer = true,
                            width = '300px',
                            height = '600px') {
    if (window.screen.width < 728) {
        var savedTime = timer;
        document.body.style.overflowY = 'hidden';
        document.body.style.touchAction = 'none';

        var adfoxCodeWrapper = document.createElement('div');
        adfoxCodeWrapper.id = id;
        adfoxCodeWrapper.style.height = height;
        adfoxCodeWrapper.style.width = width;

        if (document.body != null) {
            document.body.insertBefore(adfoxCodeWrapper, document.body.firstChild);
        }

        var wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('adfinity-stop-scroll-wrapper');

        var creativeWrapperDiv = document.createElement('div');
        creativeWrapperDiv.classList.add('adfinity-stop-scroll-creative-wrapper');

        var timerWrapperDiv = document.createElement('div');
        timerWrapperDiv.classList.add('adfinity-stop-scroll-timer-wrapper');

        var timerWrapperP = document.createElement('p');

        var textSpan = document.createElement('span');
        textSpan.classList.add('adfinity-stop-scroll-text');
        textSpan.innerText = text;

        var timerSpan = document.createElement('span');
        timerSpan.classList.add('adfinity-stop-scroll-timer');

        if (document.body != null) {
            document.body.insertBefore(timerWrapperDiv, document.body.firstChild);
            document.body.insertBefore(wrapperDiv, document.body.firstChild);
        }

        wrapperDiv.append(creativeWrapperDiv);

        creativeWrapperDiv.append(adfoxCodeWrapper);

        timerWrapperDiv.append(timerWrapperP);

        timerWrapperP.append(textSpan);

        timerWrapperP.append(timerSpan);

        adfoxCallCode();
        adfoxCodeWrapper.style.height = 'auto';
        adfoxCodeWrapper.style.width = 'auto';
        adfoxCodeWrapper.style.maxWidth = '300px';
        adfoxCodeWrapper.style.maxHeight = '600px';

        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        } else {
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
                setTimeout(window.scrollTo(0, 0), 100);
            }
        }

        if (creativeBg) {
            creativeWrapperDiv.style.background = creativeBg;
        }

        if (!showTimer) {
            timerWrapperDiv.style.display = 'none';
        }

        if (timerBg) {
            timerWrapperDiv.style.background = timerBg;
        }

        if (creativeTextColor) {
            timerWrapperDiv.style.color = creativeTextColor;
        }

        var tickInterval = setInterval(doByTick, 1000);

        function doByTick() {
            timerSpan.innerText = savedTime;
            if (savedTime >= 1) {
                savedTime--;
            } else {
                clearInterval(tickInterval);
                timerWrapperDiv.remove();
                document.body.style.overflowY = 'auto';
                document.body.style.touchAction = 'auto';
            }
        }
    }
}

var pageNumber = false;

function makeInfinityScrollBanner(adfoxId, className, adfoxCallCode = function () {
    console.log('empty call code')
}, adfoxHeaderBiddingPush = function () {
    console.log('empty header bidding')
}, refresh = false) {
    if (typeof document.querySelectorAll(className)[0] !== 'undefined') {
        var originalId = adfoxId;
        if (pageNumber === false) {
            pageNumber = 1;
            var firstADfoxBlock = document.createElement('div');
            firstADfoxBlock.id = adfoxId;
            document.body.appendChild(firstADfoxBlock);
            document.querySelectorAll(className)[0].appendChild(document.getElementById(adfoxId));
            callAdfox(adfoxId, refresh);
        } else {
            var insertBlocks = document.querySelectorAll(className);
            for (var i in insertBlocks) {
                if (typeof insertBlocks[i].children != 'undefined') {
                    if (insertBlocks[i].children.length === 0) {
                        pageNumber++;
                        adfoxIndexed = originalId + "-" + pageNumber;
                        adfoxId = adfoxIndexed;
                        var adfoxBlock = document.createElement("div");
                        adfoxBlock.id = adfoxId
                        insertBlocks[i].appendChild(adfoxBlock)
                        document.getElementById(adfoxIndexed)
                        callAdfox(adfoxIndexed, refresh)
                        return true;
                    }
                }
            }
        }

        function callAdfox(id, refresh = false) {
            adfoxHeaderBiddingPush(id);
            adfoxCallCode(id);
            if (refresh) {
                makeAdfoxRefresh(id)
            }
        }
    }
}

function makeDTopSticky(id, margin = 0) {
    var timer = false;
    var closeFlag = false;
    var started = false;
    var h = document.getElementById(id);
    var stuck = false;
    var stickPoint = getDistance();

    function getDistance() {
        var topDist = h.offsetTop;
        return topDist;
    }

    document.addEventListener('scroll', function () {
        if (started === false) {
            timer = setTimeout(() => closeFlag = true, 3000);
            started = true;
        }
        var distance = getDistance() - window.pageYOffset;
        var offset = window.pageYOffset;
        if (distance <= 0 && !stuck && closeFlag !== true) {
            h.style.position = 'fixed';
            h.style.top = margin + 'px';
            h.style.left = '0px';
            stuck = true;
        } else if (stuck && (offset <= stickPoint) || closeFlag === true) {
            h.style.position = 'static';
            stuck = false;
        }
    })
}

var wasCalled = false;

function callIfInView(blockClass, key, callback = function () {
}) {
    if (!wasCalled) {
        var blocks = document.getElementsByClassName(blockClass);
        if (typeof blocks[key] != 'undefined') {
            if (isElementInViewport(blocks[key])) {
                callback();
                wasCalled = true;
            }
        }
    }
}




function adfinityMulti(adfinityConfig){
    if(typeof adfinityConfig != 'object' || typeof adfinityConfig.blocks != 'object'){
        console.log('Не верный формат конфигурационного файла');
        return false;
    }

    for (var confBlock of adfinityConfig.blocks) {
        if(typeof confBlock.containerId != 'string'){
            console.log('Не задан containerId', confBlock);
            continue;
        }

        switch (confBlock.format){
            case "overlay":
                // Приготовить параметры вызова нашей функции формата
                var preparedFormatParams = adfinityPrepareFormatParams(confBlock.format, confBlock.containerId, confBlock.params);
                // сформировать колбек для adfox
                var adfoxCollback = adfinityMakeAdfoxCollback(confBlock.containerId, confBlock.adfox);
                if(adfoxCollback === false || preparedFormatParams === false) continue;
                makeAdfinityOverlay(adfoxCollback, ...preparedFormatParams);
                break;
            case "topSticky":
                adfinityAdapterSticky(confBlock);
                break;
        }
    }
}

function adfinityMakeAdfoxCollback(containerId, config) {
    // проверка входных параметров
    var listTypes = ['async', 'adaptive'];
    var err = false;
    if(typeof config != 'object'){
        err = 'Не задан конфиг для adfox';
    }else if(typeof config.ownerId == 'undefined'){
        err = 'Не задан ownerId';
    }else if(typeof config.params == 'undefined'){
        err = 'Не заданы параметры блока';
    }else if(typeof config.type == 'undefined'){
        err = 'Не задан тип блока type';
    }else if(listTypes.indexOf(config.type) == -1){
        err = 'Не верный тип блока type';
    }else if(config.type == 'adaptive'){
        if(typeof config.bannerStates != 'object'){
            err = 'Для адаптивного блока не задан обязательный параметр bannerStates';
        } else if(typeof config.adaptiveOptions != 'object'){
            err = 'Для адаптивного блока не задан обязательный параметр bannerStates';
        }
    }
    if (err !== false){
        console.log(err);
        return false;
    }

    // подготовка параметров для генерации кода adfox
    var bannerOptions = {
        containerId: containerId,
        ownerId: config.ownerId,
        params: config.params
    }
    if (typeof config.onLoad == 'function') bannerOptions.onLoad = config.onLoad;
    if (typeof config.onRender == 'function') bannerOptions.onRender = config.onRender;
    if (typeof config.onError == 'function') bannerOptions.onError = config.onError;
    if (typeof config.onStub == 'function') bannerOptions.onStub = config.onStub;
    if (typeof config.lazyLoad == 'object') bannerOptions.lazyLoad = config.lazyLoad;

    if(config.type == 'async'){
        return function () {window.yaContextCb.push(() => {
            Ya.adfoxCode.create(bannerOptions);
        });};
    } else if(config.type == 'adaptive'){
        return function () {
            window.yaContextCb.push(() => {
                Ya.adfoxCode.createAdaptive(bannerOptions, config.bannerStates, config.adaptiveOptions);
            });
        };
    }

}

function adfinityPrepareFormatParams(format, containerId, params) {
    var blockFormats = {
        'overlay':{
            functionName: 'makeAdfinityOverlay',
            containerIdArg: 'id',
            callbakArg: 'adfoxCallback',
        },
    };
    var stringify = window[blockFormats[format].functionName].toString();
    var ar = stringify.split('(', 2)[1].split(')', 2)[0].split(',');
    var args = [];
    for (var i of ar) {
        ar = i.trim().split('=');
        var arg = {name: ar[0].trim()};
        if(arg.name == '' || arg.name == blockFormats[format].callbakArg)
            continue;
        var defVal = ar[1]
        if(typeof defVal != 'undefined'){
            defVal = defVal.trim();
            if(defVal == 'false'){
                defVal = false;
            } else if(!isNaN(parseFloat(defVal))){
                defVal = parseFloat(defVal);
            } else {
                defVal = defVal.replace(/^['"]+|['"]+$/g, '');
            }
            arg.defVal = defVal;
        }
        args.push(arg);
    }

    var paramsOk = true;
    var preparedParams = [];
    for (var arg of args) {
        if(arg.name == blockFormats[format].containerIdArg){ // аргумент id контейнера
            preparedParams.push(containerId);
        } else if(typeof params[arg.name] == 'undefined') { // не переден парамерет
            if(typeof arg.defVal == 'undefined') { // не передан обязательный параметр
                console.error('Для блока ' + containerId + ' не задан обязательный параметр ' + arg.name);
                paramsOk = false;
            } else {
                preparedParams.push(arg.defVal); // значение по умолчанию
            }
        } else {
            preparedParams.push(params[arg.name]); // переданный параметр
        }
    }

    if (!paramsOk)
        return false;

    return preparedParams;
}

function adfinityAdapterSticky(confBlock) {

    function initBlock(confBlock){
        if(blockInit) return false; // не иницировать повторно
        blockInit = true;

        var adfoxBlock = document.createElement('div');
        adfoxBlock.id = confBlock.containerId;
        var wrapper = document.createElement('div');
        wrapper.id = 'adfinity-sticky';
        wrapper.classList.add('adfinity-top-ads-wrapper');
        wrapper.append(adfoxBlock);
        if (document.body != null) {
            document.body.insertBefore(wrapper, document.body.firstChild);
        }

        var params = confBlock.params;
        if(typeof params.height != 'undefined'){
            wrapper.style.maxHeight = params.height;
        }

        if(typeof params.duration != 'undefined'){
            confBlock.adfox.onRender = function(){
                setTimeout(function(){
                    adfoxBlock.remove();
                }, parseInt(params.duration) * 1000);
            }
        }

        var adfoxCollback = adfinityMakeAdfoxCollback(confBlock.containerId, confBlock.adfox);
        adfoxCollback();
    }

    var blockInit = false; // признак инициации блока
    var params = confBlock.params;
    if(typeof params.startTime != 'undefined' || typeof params.startScrollTop != 'undefined'){
        if(typeof params.startTime != 'undefined'){
            setTimeout(() => {
                initBlock(confBlock);
            }, params.startTime * 1000);
        }
        if(typeof params.startScrollTop != 'undefined'){
            document.addEventListener('scroll', function () {
                if(window.scrollY >= parseInt(params.startScrollTop)){
                    initBlock(confBlock);
                }
            });
        }
    } else {
        initBlock(confBlock);
    }

}


adfUtils = {

    /**
     * Смещение элемента в документе
     * @param elem
     * @returns {{top: number, left: number}}
     */
    getCoords(elem) {
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.scrollX || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return {
            top: top,
            left: left
        };
    },
    on(eventName, handler){
        eventName = (eventName == 'ready') ? 'DOMContentLoaded' : eventName;
        if (window.addEventListener) {
            addEventListener(eventName, handler, false);
        } else if (window.attachEvent) {
            attachEvent('on' + eventName, handler); // Internet Explorer 9+ :(
        }
    }
}

// VAST

function vastSoundBtn(player, hide = false) {

    var player_container = player.container;

    var vast_sound_btn = player_container.querySelector('.vast_sound_btn');
    if(!vast_sound_btn){
        if(hide){
            return;
        }
        player_container.insertAdjacentHTML('afterbegin', '<div class="vast_sound_btn vast_sound_btn_off"></div>');
        vast_sound_btn = player_container.querySelector('.vast_sound_btn');
        vast_sound_btn.addEventListener('click', (e) => vastSoundSwith(e, player));
    }
    vast_sound_btn.classList.remove('vast_sound_btn_off');
    if(hide){
        vast_sound_btn.classList.add('vast_sound_btn_hide');
    } else {
        vast_sound_btn.classList.remove('vast_sound_btn_hide');
    }
    var click = new Event('click');
    vast_sound_btn.dispatchEvent(click);
}
function vastSoundSwith(e, player) {
    var classList = e.currentTarget.classList;
    if(classList.contains('vast_sound_btn_off')){
        classList.remove('vast_sound_btn_off');
        player.setMute(false);
    } else {
        classList.add('vast_sound_btn_off');
        player.setMute(true);
    }
}


var Style = {
    base: [
        "color: #fff",
        "background-color: #ddd",
        "padding: 2px 4px",
        "border-radius: 2px",
        "margin: 10px 0"
    ],
    warning: [
        "color: #fff",
        "background-color: red"
    ],
    yellow: [
        "background-color: yellow"
    ]
}
var adf_log = (text, extra = []) => {
    var style = Style.base.join(';') + ';';
    style += extra.join(';'); // Add any additional styles
    console.log(`%c${text}`, style);
}

function getVastLoader(blockId, url, resolve, reject){
    url = url.replaceAll('[ADFINITY_PAGE]', location.href);
    adf_log(url, Style.yellow);

    return function () {
        if(window.player){
            window.player.destroy()
        }

        var playerWidth = 640;
        var playerHeight = 360;
        var viewportWidth = _getViewportWidth();
        if (viewportWidth < 640) {
            playerWidth = 480;
            playerHeight = 270;
        }
        if (viewportWidth < 480) {
            playerWidth = 320;
            playerHeight = 180;
        }



        var idVast = `vast_${blockId}`;
        var adfoxContaner = document.getElementById(blockId);
        var container = document.getElementById(idVast);
        if(!container){
            var htmlInsert = `<div class="rmp-container" id="${idVast}"><div class="rmp-content"><video class="rmp-video" src="" playsinline></video></div></div>`;
            adfoxContaner.insertAdjacentHTML('afterend', htmlInsert);
            container = document.getElementById(idVast);
        }

        var params = {
            ajaxTimeout: 5000,
            vpaidSettings: {
                width: playerWidth,
                height: playerHeight,
                viewMode: 'normal',
                desiredBitrate: 500
            },
        };

        // create RmpVast instance
        var player = new RmpVast(idVast, params); // инициировать васт-плейер
        window.player = player;

        container.addEventListener('adloaded', () => {
            // vastShow(container, adfoxContaner);
            adfoxContaner.style.display = 'none';
            container.style.width = playerWidth + 'px';
            container.style.height = playerHeight + 'px';
            container.style.margin = '0 auto';
            // vastSoundBtn(player); // загрузить кнопку включения звука
            // player.setMute(false);
        });
        container.addEventListener('adcomplete', () => {
            // vastSoundBtn(player, true); // скрыть кнопку выключения звука
            resolve();
            console.log('AdStopped');
        });
        container.addEventListener('aderror', () => {
            // vastSoundBtn(player, true); // скрыть кнопку выключения звука
            var errorMessage = player.getAdErrorMessage();
            var errorCode = player.getAdVastErrorCode();
            var errorLog = errorCode + ' - ' + errorMessage;
            console.log(errorLog);
            reject(errorLog);
        });
        container.addEventListener('addestroyed', () => {
            // vastSoundBtn(player, true); // скрыть кнопку выключения звука
            var errorMessage = player.getAdErrorMessage();
            var errorCode = player.getAdVastErrorCode();
            var errorLog = errorCode + ' - ' + errorMessage;
            console.log(errorLog);
            reject(errorLog);
        });







        var events = [
            'adloaded',
            'addurationchange',
            'adclick',
            'adclosed',
            'adimpression',
            'adinteraction',
            'aduseracceptinvitation',
            'adcollapse',
            'adstarted',
            'adtagloaded',
            'adprogress',
            'adviewable',
            'adviewundetermined',
            'adinitialplayrequestfailed',
            'adinitialplayrequestsucceeded',
            'adpaused',
            'adresumed',
            'adtagstartloading',
            'adsizechange',
            'adlinearchange',
            'adexpandedchange',
            'adremainingtimechange',
            'advolumemuted',
            'advolumechanged',
            'adcomplete',
            'adskipped',
            'adskippablestatechanged',
            'adfirstquartile',
            'admidpoint',
            'adthirdquartile',
            'aderror',
            'addestroyed',
            'adpodcompleted'
        ];
        var _logEvent = function (event) {
            if (event && event.type) {
                var data = event.type;
                // data += ' - ' + (_getNow() - nowOffset) + ' ms';
                // console.log(event);
                console.log(data);
                // eventLogs.insertAdjacentHTML('afterbegin', '<p>' + data + '</p>');
                if (event.type === 'aderror') {
                    var errorMessage = rmpVast.getAdErrorMessage();
                    var errorCode = rmpVast.getAdVastErrorCode();
                    var errorLog = errorCode + ' - ' + errorMessage;
                    console.log(errorLog);
                //     eventLogs.insertAdjacentHTML('afterbegin', '<p>' + errorLog + '</p>');
                }
            }
        };
        for (var j = 0, lenJ = events.length; j < lenJ; j++) {
            container.addEventListener(events[j], _logEvent);
        }








        player.loadAds(url);
    }
}
var _getViewportWidth = function () {
    var viewportWidth = 0;
    if (document.documentElement && typeof document.documentElement.clientWidth === 'number') {
        viewportWidth = document.documentElement.clientWidth;
    } else if (typeof window.innerWidth === 'number') {
        viewportWidth = window.innerWidth;
    }
    return viewportWidth;
};
// function vastHide(container){
//     container.style.maxHeight = 0;
// }
// function vastShow(container, adfoxContaner){
//     adfoxContaner.style.display = 'none';
//     container.style.maxHeight = 'max-content';
// }

/**
 * Водопад
 * @param blockId
 * @param adfoxCall
 * @param vasts
 * @param adfoxTimeout - время показа адфокса
 * @returns {(function(): Promise<void>)|*}
 */
function waterfall(blockId, adfoxCall, vasts, adfoxTimeout = 5){
    return async () => {
        // Задержка на время показа адфокса
        adfoxTimeout = parseInt(adfoxTimeout);
        adfoxTimeout = isNaN(adfoxTimeout) ? 5 : adfoxTimeout;
        console.log('adfoxCall')
        await new Promise(resolve => {
            adfoxCall(resolve); // загрузить в контейнер адфокса качестве прелоадера
            setTimeout(resolve, adfoxTimeout * 1000);
        });

        // дождаться, пока сформируется обертка контейнера
        // иначе контейнер васта загружается рядом с контейнером адфока.
        // И, когда вокруг последнего создается обертка, контейнер васта оказывается вне нее
        // а переносить контейнер в созданную оболочку нельзя, т.к. он при этом обязательно
        // обновляется и, следовательно, загруженный в него креатив исчезает
        var container = document.getElementById(blockId);
        await new Promise(resolve => {
            var ti = setInterval(()=>{
                if(container.parentNode.nodeName != 'BODY'){
                    clearInterval(ti);
                    resolve();
                }
            }, 4)
        });


        var numVast = 0;
        function next() {
            var promise = new Promise(function(resolve, reject) {
                if(vasts[numVast]){
                    // загрузить и запустить очередной васт
                    var vastLoader = getVastLoader(blockId, vasts[numVast], resolve, reject);
                    numVast++;
                    vastLoader();
                } else {
                    resolve('finish'); // последний васт
                }
            });
            promise.then(
                (e) => {
                    console.log(e);
                    if(e != 'finish'){ // если не последний заданный васт, по перейти к следующему
                        next();
                    } else {
                        console.log(blockId, adfoxCall, vasts, adfoxTimeout)
                        // closeWrapper(blockId); // закрыть оболочку
                        restartWaterfall(blockId, adfoxCall, vasts, adfoxTimeout); // перезапустить оболочку
                    }
                },
                (e) => {
                    console.error(e);
                    // closeWrapper(blockId); // закрыть оболочку
                    next();
                }
            )
        }
        next();

        // function closeWrapper(blockId) {
        //     document.getElementById(blockId).parentNode.parentNode.querySelector('.poppup-banner-ads-arrow').click()
        // }

    }
}
function restartWaterfall(blockId, adfoxCall, vasts, adfoxTimeout) {
    adf_log('restartWaterfall')
    var idVast = `vast_${blockId}`;
    var adfoxContaner = document.getElementById(blockId);
    var container = document.getElementById(idVast);
    adfoxContaner.style.display = 'block';
    container.remove();
    Ya.adfoxCode.destroy(blockId);
    waterfall(blockId, adfoxCall, vasts, adfoxTimeout)();
}

// 23_02_07