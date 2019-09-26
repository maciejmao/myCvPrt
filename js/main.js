/* ===================================================================
 * Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";

    var cfg = {
        scrollDuration : 800 // smoothscroll duration
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


    /* Preloader
     * -------------------------------------------------- */
    var ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

            //scroll to section (hash)
            if (window.location.hash)
            {
                var target = window.location.hash,
                $target    = $(target);
                if ($target.length)
                {
                    $('html, body').stop().animate({
                        'scrollTop': $target.offset().top
                    }, cfg.scrollDuration, 'swing');  
                }
            }
        
        });
    };


    /* Move header
     * -------------------------------------------------- */
    var ssMoveHeader = function () {

        var hero = $('.page-hero'),
            hdr = $('header'),
            triggerHeight = hero.outerHeight() - 170;


        $WIN.on('scroll', function () {

            var loc = $WIN.scrollTop();

            if (loc > triggerHeight) {
                hdr.addClass('sticky');
            } else {
                hdr.removeClass('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.addClass('offset');
            } else {
                hdr.removeClass('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.addClass('scrolling');
            } else {
                hdr.removeClass('scrolling');
            }

        });

        // $WIN.on('resize', function() {
        //     if ($WIN.width() <= 768) {
        //             hdr.removeClass('sticky offset scrolling');
        //     }
        // });

    };


    /* Mobile Menu
     * ---------------------------------------------------- */ 
    var ssMobileMenu = function() {

        var toggleButton = $('.header-menu-toggle'),
            nav = $('.header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });

    };


    /* Masonry
     * ---------------------------------------------------- */ 
    var ssMasonryFolio = function () {

        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };

	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
    var ssModalPopup = function () {
        $('.item-folio__thumb a').magnificPopup({
            type:'inline',
            fixedContentPos: false,
            removalDelay: 300,
            //showCloseBtn: false,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
              },
        });
    
        $(document).on('click', '.popup-modal-dismiss', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        });
    };

    /* Highlight the current section in the navigation bar
     * ------------------------------------------------------ */
    var ssWaypoints = function() {

        var sections = $(".target-section"),
            navigation_links = $(".header-nav li a");

        sections.waypoint( {

            handler: function(direction) {

                var active_section;

                active_section = $('section#' + this.element.id);

                if (direction === "up") active_section = active_section.prevAll(".target-section").first();

                var active_link = $('.header-nav li a[href="#' + active_section.attr("id") + '"]');

                navigation_links.parent().removeClass("current");
                active_link.parent().addClass("current");

            },

            offset: '25%'

        });
        
    };


   /* Stat Counter
    * ------------------------------------------------------ */
    var ssStatCount = function() {

        var statSection = $(".s-stats"),
        stats = $(".stats__count");

        statSection.waypoint({

            handler: function(direction) {

                if (direction === "down") {

                    stats.each(function () {
                        var $this = $(this);
                        var dcase = $this.data('case');

                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                switch (dcase) {
                                    case 'business':
                                    $this.text(Math.ceil(curValue)+ "+");
                                    break;
                                    case 'projects':
                                    $this.text(">" + Math.ceil(curValue));
                                    break;
                                    default:
                                    $this.text(Math.ceil(curValue));
                                }
                            }
                        });
                    });

                } 

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    };

    /* Skills transitions
        * ------------------------------------------------------ */
    var ssSkills = function() {

        var skillSection = $(".s-skills"),
        skills = $(".skill-bars li div");
        skills.css("width", "0");

        skillSection.waypoint({

            handler: function(direction) {

                if (direction === "down") {
                    skills.each(function () {
                        $(this).removeAttr('style').addClass('transition');
                    });

                } 

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    };



   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var ssSmoothScroll = function() {

        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
        
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing', function () {
                window.location.hash = target;
            });

        });
    };

   /* Back to Top
    * ------------------------------------------------------ */
    var ssBackToTop = function() {

        var pxShow  = 500,   // height on which the button will show
        fadeInTime  = 400,   // how slow/fast you want the button to show
        fadeOutTime = 400,   // how slow/fast you want the button to hide
        scrollSpeed = 300,   // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
        goTopButton = $(".go-top")

        // Show or hide the sticky footer button
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };

   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMoveHeader();
        ssMobileMenu();
        ssMasonryFolio();
        ssModalPopup();
        ssWaypoints();
        ssSkills();
        ssStatCount();
        ssSmoothScroll();

    })();


})(jQuery);