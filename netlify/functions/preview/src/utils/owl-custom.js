// Ultra-wide Owl Carousel
$(document).ready(function () {
  $(".owl-carousel.ultra-wide").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    center: true,
    dots: true,
    smartSpeed: 500,
    lazyLoadEager: 1,
    
    navText: [
      '<img src="https://res.cloudinary.com/nrityagram/image/upload/v1646318418/chevron-left-2_bta3sl.png" alt="left arrow">',
      '<img src="https://res.cloudinary.com/nrityagram/image/upload/v1646318418/chevron-right-2_dped9m.png" alt="right arrow">',
    ],
    
    responsive: {
      0: {
        items: 1,
        stagePadding: 0,
        dots: true,
        nav: false,
      },
      768: {
        items: 1,
        stagePadding: 127,
      },
      800: {
        items: 1,
        stagePadding: 132,
      },
      1024: {
        items: 1,
        stagePadding: 169,
      },
      1200: {
        items: 1,
        stagePadding: 198,
      },
      1300: {
        items: 1,
        stagePadding: 213,
      },
      1400: {
        items: 1,
        stagePadding: 231,
      },
      1500: {
        items: 1,
        stagePadding: 248,
      },
      1600: {
        items: 1,
        stagePadding: 264,
      },
      1700: {
        items: 1,
        stagePadding: 281,
      },
      1800: {
        items: 1,
        stagePadding: 297,
      },
      1920: {
        items: 1,
        // 16.5vw is the padding on both sides of center item
        // 0.165 * 1920 = 317
        stagePadding: 317,
      },
      2000: {
        items: 1,
        stagePadding: 330,
      },
      2100: {
        items: 1,
        stagePadding: 347,
      },
    },
  });
});

// Synced Owl Carousels
// Example: https://codepen.io/achanda007/pen/QWzMwae
$(document).ready(function() {

  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var syncedSecondary = true;

  sync1.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: true,
    autoplay: false,
    dots: true,
    loop: true,
    responsiveRefreshRate : 200,

  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : 1,
    dots: false,
    nav: false,
    smartSpeed: 200,
    slideSpeed : 500,
    responsiveRefreshRate : 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;
    
    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);
    
    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }
    
    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();
    
    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }
  
  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }
  
  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });
});