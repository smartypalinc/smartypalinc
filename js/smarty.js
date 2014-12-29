//// LIBRARY DEPENDENCIES //// INCLUDED HERE TO REDUCE HTTP REQUESTS

// Google Analytics Scroll Depth
/*!
 * @preserve
 * jquery.scrolldepth.js | v0.5
 * Copyright (c) 2014 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */
!function(e,t,n){"use strict";var r,a,l,i={minHeight:0,elements:[],percentage:!0,userTiming:!0,pixelDepth:!0},o=e(t),c=[],u=0;e.scrollDepth=function(h){function p(e,t,n,i){l?(dataLayer.push({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:e,eventLabel:t,eventValue:1,eventNonInteraction:!0}),h.pixelDepth&&arguments.length>2&&n>u&&(u=n,dataLayer.push({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:"Pixel Depth",eventLabel:f(n),eventValue:1,eventNonInteraction:!0})),h.userTiming&&arguments.length>3&&dataLayer.push({event:"ScrollTiming",eventCategory:"Scroll Depth",eventAction:e,eventLabel:t,eventTiming:i})):(r&&(ga("send","event","Scroll Depth",e,t,(function(){if(t=="Baseline"){return 0;} else {return 25;} })(),{nonInteraction:1}),h.pixelDepth&&arguments.length>2&&n>u&&(u=n,ga("send","event","Scroll Depth","Pixel Depth",f(n),1,{nonInteraction:1})),h.userTiming&&arguments.length>3&&ga("send","timing","Scroll Depth",e,i,t)),a&&(_gaq.push(["_trackEvent","Scroll Depth",e,t,1,!0]),h.pixelDepth&&arguments.length>2&&n>u&&(u=n,_gaq.push(["_trackEvent","Scroll Depth","Pixel Depth",f(n),1,!0])),h.userTiming&&arguments.length>3&&_gaq.push(["_trackTiming","Scroll Depth",e,i,t,100])))}function g(e){return{"25%":parseInt(.25*e,10),"50%":parseInt(.5*e,10),"75%":parseInt(.75*e,10),"100%":e-5}}function s(t,n,r){e.each(t,function(t,a){-1===e.inArray(t,c)&&n>=a&&(p("Percentage",t,n,r),c.push(t))})}function v(t,n,r){e.each(t,function(t,a){-1===e.inArray(a,c)&&e(a).length&&n>=e(a).offset().top&&(p("Elements",a,n,r),c.push(a))})}function f(e){return(250*Math.floor(e/250)).toString()}function m(e,t){var n,r,a,l=null,i=0,o=function(){i=new Date,l=null,a=e.apply(n,r)};return function(){var c=new Date;i||(i=c);var u=t-(c-i);return n=this,r=arguments,0>=u?(clearTimeout(l),l=null,i=c,a=e.apply(n,r)):l||(l=setTimeout(o,u)),a}}var D=+new Date;h=e.extend({},i,h),e(n).height()<h.minHeight||("function"==typeof ga&&(r=!0),"undefined"!=typeof _gaq&&"function"==typeof _gaq.push&&(a=!0),"undefined"!=typeof dataLayer&&"function"==typeof dataLayer.push&&(l=!0),p("Percentage","Baseline"),o.on("scroll.scrollDepth",m(function(){var r=e(n).height(),a=t.innerHeight?t.innerHeight:o.height(),l=o.scrollTop()+a,i=g(r),u=+new Date-D;return c.length>=4+h.elements.length?void o.off("scroll.scrollDepth"):(h.elements&&v(h.elements,l,u),void(h.percentage&&s(i,l,u)))},500)))}}(jQuery,window,document);

// Tocca.js
/*! Tocca.js v0.0.8 || Gianluca Guarini */
!function(a,b){"use strict";if("function"!=typeof a.createEvent)return!1;var c,d,e,f,g,h="undefined"!=typeof jQuery,i=!!("ontouchstart"in window)&&navigator.userAgent.indexOf("PhantomJS")<0,j=function(a,b,c){for(var d=b.split(" "),e=d.length;e--;)a.addEventListener(d[e],c,!1)},k=function(a){return a.targetTouches?a.targetTouches[0]:a},l=function(b,e,f,g){var i=a.createEvent("Event");if(g=g||{},g.x=c,g.y=d,g.distance=g.distance,h)jQuery(b).trigger(e,g);else{i.originalEvent=f;for(var j in g)i[j]=g[j];i.initEvent(e,!0,!0),b.dispatchEvent(i)}},m=!1,n=b.SWIPE_TRESHOLD||80,o=b.TAP_TRESHOLD||200,p=b.TAP_PRECISION/2||30,q=0;i=b.JUST_ON_TOUCH_DEVICES?!0:i,j(a,i?"touchstart":"mousedown",function(a){var b=k(a);e=c=b.pageX,f=d=b.pageY,m=!0,q++,clearTimeout(g),g=setTimeout(function(){e>=c-p&&c+p>=e&&f>=d-p&&d+p>=f&&!m&&l(a.target,2===q?"dbltap":"tap",a),q=0},o)}),j(a,i?"touchend":"mouseup",function(a){var b=[],g=f-d,h=e-c;if(m=!1,-n>=h&&b.push("swiperight"),h>=n&&b.push("swipeleft"),-n>=g&&b.push("swipedown"),g>=n&&b.push("swipeup"),b.length)for(var i=0;i<b.length;i++){var j=b[i];l(a.target,j,a,{distance:{x:Math.abs(h),y:Math.abs(g)}})}}),j(a,i?"touchmove":"mousemove",function(a){var b=k(a);c=b.pageX,d=b.pageY})}(document,window);


////// Universal Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-42710923-1', 'smartypal.com');

$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      if(window.location.pathname == '/launch/' && $(document.activeElement).attr("id") == "email2"){
        formSubmit2();
      }
      if(window.location.pathname == '/' && ($(document.activeElement).attr("id") == "name" || $(document.activeElement).attr("id") == "email")){
        formSubmit();
      }
      return false;
    }
  });
});

var campaign_id = String(window.location.hash).replace('#','');
if(campaign_id.length>0){
    console.log("Campaign Id: " + campaign_id);
    ga('send', 'pageview', {'dimension1':  campaign_id});
}
else{
    ga('send', 'pageview');
}

// CUSTOM JAVASCRIPT

// Form submission function
var subs = 0;
function formSubmit() {
    var _name=$('#name').val();
    var _email=$('#email').val().toLowerCase();
    if(subs===0){
        if(_email.indexOf('@')==-1||_name.length<1) {
            $('#_valid').toggle();
            setTimeout( function(){$('#_valid').fadeOut( "slow" );}, 1500);
            ga('send', 'event', 'Email Form', 'Failed Submission', 'Invalid Name/Email');
        }
        else {
            $('#email-send').text("Sending email...");
            $.ajax({
                type: "POST",
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                data: {
                    'key': 'kYTvkI3alIJpJo9OJw475w',
                    'message': {
                        'from_email': 'info@smartypal.com',
                        'to': [
                            {
                                'email': _email,
                                'name': _name,
                                'type': 'to'
                            }
                        ],
                        'bcc_address': 'info@smartypal.com',
                        'autotext': 'true',
                        'subject': 'Thanks from SmartyPAL!',
                        'html': '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"/><title>Thanks from SmartyPAL!</title></head><body style="margin:0"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="top" bgcolor="#ffffff" style="background-color:#ffffff;"><br><br><table width="600" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="top" style="padding-left:13px;padding-right:13px;background-color:#ffffff;" ><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle" style="font-family: sans-serif;font-size:48px;"><a href="http://smartypal.com"><img src="http://smartypal.com.s3-website-us-east-1.amazonaws.com/img/logo-long.png" width="300px" alt="SmartyPAL Logo"/></a></td></tr><tr><td align="center" valign="middle" style="padding-top:7px;"><table width="240" border="0" cellspacing="0" cellpadding="0"><tr><td height="22" align="center" valign="middle" bgcolor="#FEBE00" style="font-family: Arial, sans-serif;font-size:13px;color:#ffffff;margin: 0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Play&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apply&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Learn&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table></td></tr><tr><td align="left" valign="middle" style="font-family: sans-serif;color:#000000;font-size:18px;padding-top: 40px;"> Thanks for your interest in SmartyPAL! This email confirms your email list sign-up. We will only email you with the latest happenings at SmartyPAL. We promise to not spam you or share your information with third parties. <br><br>If you haven\'t already, be sure to check out our FREE iPad app, <a href="http://bit.ly/1qgWLk">ZooPAL - A Gift</a>. <br><div style="padding-top:25px;"><a href="http://bit.ly/1qgWLk3"><img src="http://smartypal.com.s3-website-us-east-1.amazonaws.com/img/zoopal.png" height="250" style="display:block;margin: 0 auto;"></a></div><br>Thanks for joining us! <br><br><div style="font-size: 15px !important;width: 160px;border-top: 1px solid #000000;margin-top: 10px;padding-top: 5px;">Sincerely,<br>The SmartyPAL Team</div></td></tr><tr><tr><td align="left" valign="middle" style="font-family: sans-serif;font-size:12px;color:#000000;"></table><br><br></td></tr><tr><td align="center" valign="top">&nbsp;</td></tr></table></body></html>'
                    }
                }
            }).fail(function() {
                $('#email-send').text("Sorry... Try Again");
                setTimeout(function(){$('#email-send').text("Submit");} , 2200);
                ga('send', 'event', 'Email Form', 'Failed Submission', 'Mandrill Failed to Respond');
            }).done(function(response) {
               if(response[0]["status"]=="sent"){
                    subs = subs + 1;
                    $('#email-send')
                        .text("Email Submitted!")
                        .css({"background":"#d3d3d3","color":"#ffffff"});
                    ga('send', 'event', 'Email Form', 'Successful Submission');
               } else {
                    console.log(response);
                    $('#email-send').text("Sorry... try Again");
                    setTimeout( (function(){$('#email-send').text("Submit");})() , 2200);
                    ga('send', 'event', 'Email Form', 'Failed Submission', 'Mandrill Response  != "sent"');
               }
            });
        }
    }
}


var subs = 0;
function formSubmit2() {
    var _email=$('#email2').val().toLowerCase();
    if(subs===0){
        if(_email.indexOf('@')==-1) {
            $('#email-send2').text("Enter valid email");
            setTimeout( function(){$('#email-send2').text("Submit");}, 2500);
            ga('send', 'event', 'Email Form', 'Failed Submission', 'Invalid Name/Email');
        }
        else {
            $('#email-send2').text("Sending email....");
            var count = 0;
            var dots = ["Sending email.&nbsp;&nbsp;&nbsp;", "Sending email..&nbsp;&nbsp;", "Sending email...&nbsp;", "Sending email...."]
            var dots_interval = setInterval(function(){
              count++;
              $('#email-send2').html(dots[count % 4]);
            }, 150);
            $.ajax({
                type: "POST",
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                data: {
                    'key': 'kYTvkI3alIJpJo9OJw475w',
                    'message': {
                        'from_email': 'info@smartypal.com',
                        'to': [
                            {
                                'email': 'info@smartypal.com',
                                'name': 'SmartyPal Team',
                                'type': 'to'
                            }
                        ],
                        'autotext': 'true',
                        'subject': 'Facebook Campaign Conversion',
                        'html': '<html xmlns="http://www.w3.org/1999/xhtml"><body><h1>Facebook Landing Page Conversion</h1><h2>Email: '+_email+'</h2><h2>Campaign ID: '+campaign_id+'</h2></body></html>'
                    }
                }
            }).fail(function() {
                clearInterval(dots_interval);
                $('#email-send2').text("Sorry... Try Again");
                setTimeout(function(){$('#email-send2').text("Submit");} , 2200);
                ga('send', 'event', 'Email Form', 'Failed Submission', 'Mandrill Failed to Respond');
            }).done(function(response) {
               if(response[0]["status"]=="sent"){
                    subs = subs + 1;
                    (function() {
                    var _fbq = window._fbq || (window._fbq = []);
                    if (!_fbq.loaded) {
                    var fbds = document.createElement('script');
                    fbds.async = true;
                    fbds.src = '//connect.facebook.net/en_US/fbds.js';
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(fbds, s);
                    _fbq.loaded = true;
                    }
                    })();
                    window._fbq = window._fbq || [];
                    window._fbq.push(['track', campaign_id, {'value':'0.01','currency':'USD'}]);
                    clearInterval(dots_interval);
                    $('#launch-form').replaceWith('<p style="color: #4e97cc;margin-top: 4%;">Success!<br>Thanks for your interest in SmartyPal.</p>');
                    ga('send', 'event', 'Email Form', 'Successful Submission', campaign_id);
               } else {
                    console.log(response);
                    clearInterval(dots_interval);
                    $('#email-send2').text("Sorry... try Again");
                    setTimeout( (function(){$('#email-send2').text("Submit");})() , 2200);
                    ga('send', 'event', 'Email Form', 'Failed Submission', 'Mandrill Response  != "sent"');
               }
            });
        }
    }
}

// Scroll depth events (requires external library)
$(function() {
  $.scrollDepth();
});

/* Custom tracking of visit duration
var timeOnPage = 0;
ga('send', 'event', 'Trigger Event', 'trigger', 'metric1: Time on Page', { 'metric1': 0});
setInterval(function(){ timeOnPage += 10000 ;ga('send', 'event', 'Trigger Event', 'trigger', 'metric1: Time on Page', { 'metric1': timeOnPage/1000 }); console.log(timeOnPage/1000) }, 10000);
*/

// Track outbound links
var outbounds = $("a").filter(function(index){
    try{
        var h = $(this).attr("href");
        return h.indexOf("http") > -1 && h.indexOf("smartypal.com") == -1;
    } catch(err){
        return false;
    }
});
$(outbounds).click(function(){
    ga('send', 'event', 'Outbound Link', $(this).attr("href"), document.URL );
    console.log($(this).attr("href"))
});



// Event listeners
$('#email-send').on('tap', function(e,d){
    e.preventDefault();
    formSubmit();
});

$('#email-send2').on('tap', function(e,d){
    console.log("click");
    e.preventDefault();
    formSubmit2();
});


$("#top-link").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
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
$("#main-text a").click(function() {
    ga('send', 'event', 'Call to Action', 'Download ZooPAL Link');
});
$("#privacy-link").on('tap', function() {
    $('#privacy-popup div').html('<iframe id="privacy-frame" src="/privacy.html" width="100%" height="100%"></iframe>');
    $('#privacy-popup').toggle();
    ga('send', 'event', 'Footer Link', 'Privacy and Terms');
});
$("#privacy-x").on('tap', function() {
    $('#privacy-frame').replaceWith('');
    $('#privacy-popup').hide();
});
$("#credits-link").on('tap', function() {
    $('#credits-popup div').html('<iframe id="credits-frame" src="/credits.html" width="100%" height="100%"></iframe>');
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
