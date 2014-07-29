var control_timeout, footerHeight;
$(document).foundation();
$(document).ready(function(){
	$("html").niceScroll({ autohidemode: false });
	$('#menu').localScroll({hash:true, onAfterFirst:function(){$('html, body').scrollTo( {top:'-=25px'}, 'fast' );}});
	$('.flexslider').flexslider({
      animation: "fade",
      directionNav: true,
      controlNav: false,
      pauseOnAction: true,
      pauseOnHover: true,
      direction: "horizontal",
      slideshowSpeed: 5500
    });

});


$(".call-to-action .signupCTA").on('tap', function() {
    $('html, body').animate({ scrollTop: $("#free-trial").offset().top }, "slow");
    ga('send', 'event', 'Calls to Action', '1 MONTH FREE TRIAL Button');
    return false;
});


$(".top-bar .logo a").on('tap', function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
});
function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
var subs = 0
function formSubmit() {
    var _name=$('#name').val();
    var _email=$('#email').val().toLowerCase();
    if(subs==0){
        valid_email = IsEmail(_email)
        if((valid_email==false)||_name.length<1) {
            $('#_valid').toggle();
            setTimeout( function(){$('#_valid').fadeOut( "slow" );}, 1500);
            ga('send', 'event', 'Email Form', 'Failed Submission', 'Invalid Name/Email');
        }
        else {
            $('#email-send').text("Sending email...")
            $.post("/submit-email", { name: _name, email: _email }, function(data) {
                if (data=="success101") {
                    subs = subs + 1
                    $('#email-send')
                        .text("Email Submitted!")
                        .css({"background":"#d3d3d3","color":"#ffffff"});

                    // Facebook Conversion Code for $7.99 Email Submission
                    window.fb_param = {};
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
                    console.log('fb')
                    //$('#fb_pixel').addClass('fb_pixel_submit')

                    ga('send', 'event', 'Email Form', 'Successful Submission', _price);

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
$('#email-send').on('tap', function(e,data){
    e.preventDefault();
    formSubmit();
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-42710923-2', 'smartypal.com');
ga('send', 'pageview');

$(function() {
  $.scrollDepth();
});

$("#privacy-link").on('tap', function() {
    $('#privacy-popup').append('<iframe id="privacy-frame" src="/privacy" width="100%" height="100%"></iframe>');
    $('#privacy-popup').toggle();
    ga('send', 'event', 'Footer Link', 'Privacy and Terms');
});
$("#privacy-x").on('tap', function() {
    $('#privacy-frame').replaceWith('')
    $('#privacy-popup').hide();
});
$("#credits-link").on('tap', function() {
    $('#credits-popup').append('<iframe id="credits-frame" src="/credits" width="100%" height="100%"></iframe>');
    $('#credits-popup').toggle();
    ga('send', 'event', 'Footer Link', 'Credits');
});
$("#credits-x").on('tap', function() {
    $('#credits-frame').replaceWith('')
    $('#credits-popup').hide();
});
