var belowHeader = 0;
var windowSize;
var headerHeight;
var navbarHeight

$(document).ready(function() {

   // Set Window Size
   if ($(window).width() > 992) {
      windowSize = 3;
   }
   else if ($(window).width() <= 992 && $(window).width() > 767) {
      windowSize = 2;
   }
   else if ($(window).width() <= 767) {
      windowSize = 1;
   }

   // Adjust navbar based on below/above header on resize
   $(window).resize(function() {
      if ($(window).width() > 992) {
         windowSize = 3;
         $('.navbar').css({'fontSize': '1rem'});
      }
      else if ($(window).width() <= 992 && $(window).width() > 767) {
         windowSize = 2;
         $('.navbar').css({'fontSize': '1rem'});
      }
      else if ($(window).width() <= 767) {
         windowSize = 1;
         $('.navbar').css({'fontSize': '0.8rem'});
      }
   });

   // Fix/Inline navbar based on below/above header. Trigger expand/collapse animation.
   $(window).scroll(function () {
      headerHeight = $('.header').height() + 12;
      navbarHeight = $('.navbar').height();
      console.log($(window).scrollTop())

      if ($(window).scrollTop() > headerHeight) {
         if (belowHeader == 0) {
            $('.navlogo').addClass('navexpand');
            $('.navlogoimg').addClass('imgexpand');

            if (windowSize == 3) {
               $('.navbar').css({'fontSize': '0.9rem'});
            }
            else if (windowSize == 2) {
               $('.navbar').css({'fontSize': '1rem'});
            }
            else if (windowSize == 1) {
               $('.navbar').css({'fontSize': '0.8rem'});
            }

            $('.navbarfill').css({height: navbarHeight});
            $('.navbarfill').show();
         }
         $('.navbarwrap').css({position: "fixed", top:0});
         belowHeader = 1;
      }
      else if ($(window).scrollTop() <= headerHeight && belowHeader == 1) {
         $('.navlogo').removeClass('navexpand');
         $('.navlogoimg').removeClass('imgexpand');

         if (windowSize == 3) {
            $('.navbar').css({'fontSize': '0.9rem'});
         }
         else if (windowSize == 2) {
            $('.navbar').css({'fontSize': '1rem'});
         }
         else if (windowSize == 1) {
            $('.navbar').css({'fontSize': '0.8rem'});
         }

         $('.navbarwrap').css({position: "absolute", top:headerHeight});
         setTimeout(function(){
            $('.navbarfill').hide();
            $('.navbarwrap').css({position: "static"});
         }, 200);
         belowHeader = 0;
      }
  });
});


// Show page after all assets load. Init Google Map.
$(window).on("load", function() {
   $('html').show();
   initMap();

   if ($(window).width() > 992) {
      windowSize = 3;
   }
   else if ($(window).width() <= 992 && $(window).width() > 767) {
      windowSize = 2;
   }
   else if ($(window).width() <= 767) {
      windowSize = 1;
   }

});

// Google Map Init Function
function initMap() {
   // Create a map object and specify the DOM element for display.
   var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.112347, lng: -93.395466},
      scrollwheel: false,
      zoom: 17
   });
   var image = '../images/icon.png';
   var beachMarker = new google.maps.Marker({
      position: {lat: 45.112347, lng: -93.395466},
      map: map
   });
}

// Find Y offset at current place
function getElementY(query) {
  return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top;
}


// Smooth Scrool Animation
function doScrolling(element, duration) {
   var navbarHeight = $('.navbar').height();
	var startingY = window.pageYOffset;
   var elementY = getElementY(element) - 38.188;
   // If element is close to page's bottom then window will scroll only to some position above the element.
   var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
	var diff = targetY - startingY;
   // Easing function: easeInOutCubic
   // From: https://gist.github.com/gre/1650294
   var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
   var start;

   if (!diff) return;

   // No scrolling animation for mobile screens
   if (windowSize == 1) {
      window.scrollTo(0, startingY + diff);
   }
   else {
   	// Bootstrap our animation - it will get called right before next frame shall be rendered.
   	window.requestAnimationFrame(function step(timestamp) {
          if (!start) start = timestamp;
          // Elapsed miliseconds since start of scrolling.
          var time = timestamp - start;
      		// Get percent of completion in range [0, 1].
          var percent = Math.min(time / duration, 1);
          // Apply the easing.
          // It can cause bad-looking slow frames in browser performance tool, so be careful.
          percent = easing(percent);

          window.scrollTo(0, startingY + diff * percent);

      		// Proceed with animation as long as we wanted it to.
          if (time < duration) {
            window.requestAnimationFrame(step);
          }
      })
   }
}

// Apply event handlers. Example of firing the scrolling mechanism.
document.getElementById('headeranchor').addEventListener('click', doScrolling.bind(null, '#header', 700));
document.getElementById('aboutanchor').addEventListener('click', doScrolling.bind(null, '#intro', 700));
document.getElementById('productsanchor').addEventListener('click', doScrolling.bind(null, '#products', 700));
document.getElementById('teamanchor').addEventListener('click', doScrolling.bind(null, '#team', 700));
document.getElementById('contactanchor').addEventListener('click', doScrolling.bind(null, '#contact', 700));
document.getElementById('associationsanchor').addEventListener('click', doScrolling.bind(null, '#associations', 700));
