$(document).ready(function() {
   var belowHeader = 0;
   $(window).scroll(function () {
      var headerHeight = $('.header').height() + 14;
      var navbarHeight = $('.navbar').height();
      console.log($(window).scrollTop())
      if ($(window).scrollTop() > headerHeight && belowHeader == 0) {
         $('.navlogo').addClass('navexpand');
         $('.navlogoimg').addClass('imgexpand');
         $('.navbar').css({'fontSize': '1.6vw'});
         $('.navbarwrap').css({position: "fixed", top:0});
         $('.navbarfill').css({height: navbarHeight + 1});
         $('.navbarfill').show();
         belowHeader = 1;
      }
      else if ($(window).scrollTop() <= headerHeight && belowHeader == 1) {
         $('.navlogo').removeClass('navexpand');
         $('.navlogoimg').removeClass('imgexpand');
         $('.navbar').css({'fontSize': '1.2vw'});
         $('.navbarwrap').css({position: "absolute", top:headerHeight});
         setTimeout(function(){
            $('.navbarfill').hide();
            $('.navbarwrap').css({position: "static"});
         }, 200);
         belowHeader = 0;
      }
  });
});



function getElementY(query) {
  return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
}

function doScrolling(element, duration) {
   var navbarHeight = $('.navbar').height();
	var startingY = window.pageYOffset;
  var elementY = getElementY(element) - 38.188;
  // If element is close to page's bottom then window will scroll only to some position above the element.
  var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
	var diff = targetY - startingY
  // Easing function: easeInOutCubic
  // From: https://gist.github.com/gre/1650294
  var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
  var start

  if (!diff) return

	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed miliseconds since start of scrolling.
    var time = timestamp - start
		// Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    window.scrollTo(0, startingY + diff * percent)

		// Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

// Apply event handlers. Example of firing the scrolling mechanism.
document.getElementById('headeranchor').addEventListener('click', doScrolling.bind(null, '#header', 600))
document.getElementById('aboutanchor').addEventListener('click', doScrolling.bind(null, '#intro', 600))
document.getElementById('productsanchor').addEventListener('click', doScrolling.bind(null, '#products', 600))
