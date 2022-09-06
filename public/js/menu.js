$(function() {
    function slideMenu() {
      var activeState = $(".menu-container .menu-list").hasClass("active");
      $(".menu-container .menu-list").animate({left: activeState ? "0%" : "-100%"}, 400);
    }
    $(".menu-wrapper").click(function(event) {
      event.stopPropagation();
      $("#hamburger-menu").toggleClass("open");
      $(".menu-container .menu-list").toggleClass("active");
      slideMenu();
  
      $("body").toggleClass("overflow-hidden");
    });
  
  }); // jQuery load