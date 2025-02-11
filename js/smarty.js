//// LIBRARY DEPENDENCIES //// INCLUDED HERE TO REDUCE HTTP REQUESTS

// Tocca.js
//! Tocca.js v0.0.8 || Gianluca Guarini
!function(a,b){"use strict";if("function"!=typeof a.createEvent)return!1;var c,d,e,f,g,h="undefined"!=typeof jQuery,i=!!("ontouchstart"in window)&&navigator.userAgent.indexOf("PhantomJS")<0,j=function(a,b,c){for(var d=b.split(" "),e=d.length;e--;)a.addEventListener(d[e],c,!1)},k=function(a){return a.targetTouches?a.targetTouches[0]:a},l=function(b,e,f,g){var i=a.createEvent("Event");if(g=g||{},g.x=c,g.y=d,g.distance=g.distance,h)jQuery(b).trigger(e,g);else{i.originalEvent=f;for(var j in g)i[j]=g[j];i.initEvent(e,!0,!0),b.dispatchEvent(i)}},m=!1,n=b.SWIPE_TRESHOLD||80,o=b.TAP_TRESHOLD||200,p=b.TAP_PRECISION/2||30,q=0;i=b.JUST_ON_TOUCH_DEVICES?!0:i,j(a,i?"touchstart":"mousedown",function(a){var b=k(a);e=c=b.pageX,f=d=b.pageY,m=!0,q++,clearTimeout(g),g=setTimeout(function(){e>=c-p&&c+p>=e&&f>=d-p&&d+p>=f&&!m&&l(a.target,2===q?"dbltap":"tap",a),q=0},o)}),j(a,i?"touchend":"mouseup",function(a){var b=[],g=f-d,h=e-c;if(m=!1,-n>=h&&b.push("swiperight"),h>=n&&b.push("swipeleft"),-n>=g&&b.push("swipedown"),g>=n&&b.push("swipeup"),b.length)for(var i=0;i<b.length;i++){var j=b[i];l(a.target,j,a,{distance:{x:Math.abs(h),y:Math.abs(g)}})}}),j(a,i?"touchmove":"mousemove",function(a){var b=k(a);c=b.pageX,d=b.pageY})}(document,window);


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-42710923-1', 'auto');
ga('send', 'pageview');

/*/ Track outbound links */
var outbounds = $("a").filter(function(index){
    try{
        var h = $(this).attr("href");
        return h.indexOf("http") > -1 && h.indexOf("smartypal.com") == -1;
    } catch(err){
        return false;
    }
});
$(outbounds).click(function(){
    ga('send', 'event', 'Outbound Link', $(this).attr("href"), 'From page: '.concat(document.URL) );
    console.log($(this).attr("href"))
});

// Team member info modals event tracking
$('button.info-icon').on('tap', function(e,d){
    var name = $(this).attr('data-target').split("Modal")[0].split("#")[1]
    var Name = name.charAt(0).toUpperCase() + name.substring(1);
    ga('send', 'event', 'Team Member Info', Name );
});

$('.ipad a#video-link').on('tap', function(e,d){
    if($('#videoModal').length==0){
        $('.ipad a#video-link').append('<div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="videoModal" aria-hidden="true">' +
                        '<div class="modal-dialog">' +
                            '<div class="modal-content">' +
                                '<div class="modal-body">' +
                                    '<video autoplay id="promo-video" class="video-js vjs-default-skin"' +
                                      'controls preload="auto" width="100%" height="auto"' +
                                      'poster="http://video-js.zencoder.com/oceans-clip.png">' +
                                         '<source src="video/promo-short-web-1280x720.mp4" type="video/mp4" />' +
                                         '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>'+
                                    '</video>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
        )
        $('#videoModal').modal("show")
    }
    ga('send', 'event', 'Promo Video', 'Played video' );
    $('#videoModal').on('hidden.bs.modal', function () {
        setTimeout(function(){$("#videoModal").remove()}, 125);
        ga('send', 'event', 'Promo Video', 'Closed video' );
    });
});


