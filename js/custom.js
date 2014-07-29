//// LIBRARY DEPENDENCIES //// INCLUDED HERE TO REDUCE HTTP REQUESTS

// Google Analytics Scroll Depth
/*!
 * @preserve
 * jquery.scrolldepth.js | v0.5
 * Copyright (c) 2014 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */
!function(e,t,n){"use strict";var r,a,l,i={minHeight:0,elements:[],percentage:!0,userTiming:!0,pixelDepth:!0},o=e(t),c=[],u=0;e.scrollDepth=function(h){function p(e,t,n,i){l?(dataLayer.push({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:e,eventLabel:t,eventValue:1,eventNonInteraction:!0}),h.pixelDepth&&arguments.length>2&&n>u&&(u=n,dataLayer.push({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:"Pixel Depth",eventLabel:f(n),eventValue:1,eventNonInteraction:!0})),h.userTiming&&arguments.length>3&&dataLayer.push({event:"ScrollTiming",eventCategory:"Scroll Depth",eventAction:e,eventLabel:t,eventTiming:i})):(r&&(ga("send","event","Scroll Depth",e,t,25,{nonInteraction:1}),h.pixelDepth&&arguments.length>2&&n>u&&(u=n,ga("send","event","Scroll Depth","Pixel Depth",f(n),1,{nonInteraction:1})),h.userTiming&&arguments.length>3&&ga("send","timing","Scroll Depth",e,i,t)),a&&(_gaq.push(["_trackEvent","Scroll Depth",e,t,1,!0]),h.pixelDepth&&arguments.length>2&&n>u&&(u=n,_gaq.push(["_trackEvent","Scroll Depth","Pixel Depth",f(n),1,!0])),h.userTiming&&arguments.length>3&&_gaq.push(["_trackTiming","Scroll Depth",e,i,t,100])))}function g(e){return{"25%":parseInt(.25*e,10),"50%":parseInt(.5*e,10),"75%":parseInt(.75*e,10),"100%":e-5}}function s(t,n,r){e.each(t,function(t,a){-1===e.inArray(t,c)&&n>=a&&(p("Percentage",t,n,r),c.push(t))})}function v(t,n,r){e.each(t,function(t,a){-1===e.inArray(a,c)&&e(a).length&&n>=e(a).offset().top&&(p("Elements",a,n,r),c.push(a))})}function f(e){return(250*Math.floor(e/250)).toString()}function m(e,t){var n,r,a,l=null,i=0,o=function(){i=new Date,l=null,a=e.apply(n,r)};return function(){var c=new Date;i||(i=c);var u=t-(c-i);return n=this,r=arguments,0>=u?(clearTimeout(l),l=null,i=c,a=e.apply(n,r)):l||(l=setTimeout(o,u)),a}}var D=+new Date;h=e.extend({},i,h),e(n).height()<h.minHeight||("function"==typeof ga&&(r=!0),"undefined"!=typeof _gaq&&"function"==typeof _gaq.push&&(a=!0),"undefined"!=typeof dataLayer&&"function"==typeof dataLayer.push&&(l=!0),p("Percentage","Baseline"),o.on("scroll.scrollDepth",m(function(){var r=e(n).height(),a=t.innerHeight?t.innerHeight:o.height(),l=o.scrollTop()+a,i=g(r),u=+new Date-D;return c.length>=4+h.elements.length?void o.off("scroll.scrollDepth"):(h.elements&&v(h.elements,l,u),void(h.percentage&&s(i,l,u)))},500)))}}(jQuery,window,document);

// Tocca.js
/*! Tocca.js v0.0.8 || Gianluca Guarini */
!function(a,b){"use strict";if("function"!=typeof a.createEvent)return!1;var c,d,e,f,g,h="undefined"!=typeof jQuery,i=!!("ontouchstart"in window)&&navigator.userAgent.indexOf("PhantomJS")<0,j=function(a,b,c){for(var d=b.split(" "),e=d.length;e--;)a.addEventListener(d[e],c,!1)},k=function(a){return a.targetTouches?a.targetTouches[0]:a},l=function(b,e,f,g){var i=a.createEvent("Event");if(g=g||{},g.x=c,g.y=d,g.distance=g.distance,h)jQuery(b).trigger(e,g);else{i.originalEvent=f;for(var j in g)i[j]=g[j];i.initEvent(e,!0,!0),b.dispatchEvent(i)}},m=!1,n=b.SWIPE_TRESHOLD||80,o=b.TAP_TRESHOLD||200,p=b.TAP_PRECISION/2||30,q=0;i=b.JUST_ON_TOUCH_DEVICES?!0:i,j(a,i?"touchstart":"mousedown",function(a){var b=k(a);e=c=b.pageX,f=d=b.pageY,m=!0,q++,clearTimeout(g),g=setTimeout(function(){e>=c-p&&c+p>=e&&f>=d-p&&d+p>=f&&!m&&l(a.target,2===q?"dbltap":"tap",a),q=0},o)}),j(a,i?"touchend":"mouseup",function(a){var b=[],g=f-d,h=e-c;if(m=!1,-n>=h&&b.push("swiperight"),h>=n&&b.push("swipeleft"),-n>=g&&b.push("swipedown"),g>=n&&b.push("swipeup"),b.length)for(var i=0;i<b.length;i++){var j=b[i];l(a.target,j,a,{distance:{x:Math.abs(h),y:Math.abs(g)}})}}),j(a,i?"touchmove":"mousemove",function(a){var b=k(a);c=b.pageX,d=b.pageY})}(document,window);

// CUSTOM JAVASCRIPT

// Form submission function
// Requires "_price" variable to be defined on page to properly register Facebook conversions GA events
function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
var subs = 0;
function formSubmit() {
    var _name=$('#name').val();
    var _email=$('#email').val().toLowerCase();
    if(subs===0){
        valid_email = IsEmail(_email);
        if((valid_email===false)||_name.length<1) {
            $('#_valid').toggle();
            setTimeout( function(){$('#_valid').fadeOut( "slow" );}, 1500);
            ga('send', 'event', 'Email Form', 'Failed Submission', 'Invalid Name/Email');
        }
        else {
            $('#email-send').text("Sending email...");
            $.post("/submit-email", { name: _name, email: _email }, function(data) {
                if (data=="success101") {
                    subs = subs + 1;
                    $('#email-send')
                        .text("Email Submitted!")
                        .css({"background":"#d3d3d3","color":"#ffffff"});

                    // Facebook Conversion Code for $7.99 Email Submission
                    window.fb_param = {}; // IMPORTANT TO DEFINE fb_param VARIABLE GLOBALLY
                    if(_price=='$7.99') { fb_param.pixel_id = '6012033061246'; }
                    if(_price=='$4.99') { fb_param.pixel_id = '6012028781846'; }
                    fb_param.value = '0.00';
                    fb_param.currency = 'USD';
                    (function(){
                      var fpw = document.createElement('script');
                      fpw.async = true;
                      fpw.src = '//connect.facebook.net/en_US/fp.js';
                      var ref = document.getElementsByTagName('script')[0];
                      ref.parentNode.insertBefore(fpw, ref);
                    })();
                    //$('#fb_pixel').addClass('fb_pixel_submit')
                    ga('send', 'event', 'Email Form', 'Successful Submission', _price);
                    $.get("/pushover");

                } else {
                    console.log(data);
                    $('#email-send').text("Sorry... try Again");
                    setTimeout( (function(){$('#email-send').text("Submit");})() , 2200);
                    ga('send', 'event', 'Email Form', 'Failed Submission', 'Server Response  != "success101"');
                }
            }).fail(function() {
                $('#email-send').text("Sorry... Try Again");
                setTimeout(function(){$('#email-send').text("Submit");} , 2200);
                ga('send', 'event', 'Email Form', 'Failed Submission', 'Server Failed to Respond');
            });
        }
    }

}

////// Universal Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-42710923-2', 'smartypal.com');
ga('send', 'pageview');

// Scroll depth events (requires external library)
$(function() {
  $.scrollDepth();
});

/* Custom tracking of visit duration
var timeOnPage = 0;
ga('send', 'event', 'Trigger Event', 'trigger', 'metric1: Time on Page', { 'metric1': 0});
setInterval(function(){ timeOnPage += 10000 ;ga('send', 'event', 'Trigger Event', 'trigger', 'metric1: Time on Page', { 'metric1': timeOnPage/1000 }); console.log(timeOnPage/1000) }, 10000);
*/


// Event listeners
$('#email-send').on('tap', function(e,d){
    e.preventDefault();
    formSubmit();
});
$("#top-link").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});
$(".call-to-action .signupCTA").on('tap', function() {
    $('html, body').animate({ scrollTop: $("#signup_form").offset().top - 25 }, "slow");
    ga('send', 'event', 'Calls to Action', '1 MONTH FREE TRIAL Button');
    return false;
});
$("#free-trial-link").click(function() {
    $("html, body").animate({ scrollTop: $("#signup_form").offset().top - 25 }, "slow");
    return false;
});
$("#features-link").click(function() {
    $("html, body").animate({ scrollTop: $("#features").offset().top }, "slow");
    return false;
});
$("#contact-link").click(function() {
    $("html, body").animate({ scrollTop: $("#contact").offset().top }, "slow");
    return false;
});
$(".top-bar .logo a").on('tap', function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});
$("#privacy-link").on('tap', function() {
    $('#privacy-popup div').html('<iframe id="privacy-frame" src="/privacy" width="100%" height="100%"></iframe>');
    $('#privacy-popup').toggle();
    ga('send', 'event', 'Footer Link', 'Privacy and Terms');
});
$("#privacy-x").on('tap', function() {
    $('#privacy-frame').replaceWith('');
    $('#privacy-popup').hide();
});
$("#credits-link").on('tap', function() {
    $('#credits-popup div').html('<iframe id="credits-frame" src="/credits" width="100%" height="100%"></iframe>');
    $('#credits-popup').toggle();
    ga('send', 'event', 'Footer Link', 'Credits');
});
$("#credits-x").on('tap', function() {
    $('#credits-frame').replaceWith('');
    $('#credits-popup').hide();
});


// JS Styling

// Social Icon Hovers
var socials = $("#whatyouget .price-table-features li a");
var colors = ["#A0CC1A", "rgb(255, 84, 84)", "#FBBF51", "#CE95C8"];
$.each(socials, function(i) {
    $(socials[i]).mouseenter(function(){
        $(socials[i]).find(".icon").css("color", colors[i]);
    })
    .mouseleave(function(){
        $(socials[i]).find(".icon").css("color", "#4E97CC");
    });
});