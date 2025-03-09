/**
 * Navbar Behavior Script
 * - Hide on scroll down, show on scroll up
 * - Highlight active section based on scroll position
 */

(function ($) {
    "use strict";

    $(document).ready(function() {
        // Variables for scroll direction detection
        let lastScrollTop = 0;
        const navbar = $(".navbar");
        const navbarHeight = navbar.outerHeight();
        const sections = $("section");
        const navLinks = $(".navbar-nav .nav-link");
        
        // Add CSS class for transition
        navbar.addClass("navbar-transition");
        
        // Function to handle scroll events
        $(window).scroll(function() {
            // Hide/show navbar based on scroll direction
            const st = $(this).scrollTop();
            
            // Detect scroll direction
            if (st > lastScrollTop && st > navbarHeight) {
                // Scrolling down
                navbar.addClass("navbar-hidden");
            } else {
                // Scrolling up
                navbar.removeClass("navbar-hidden");
            }
            
            lastScrollTop = st;
            
            // Highlight active section
            let currentSection = "";
            
            sections.each(function() {
                const sectionTop = $(this).offset().top - navbarHeight - 10;
                const sectionBottom = sectionTop + $(this).outerHeight();
                
                if (st >= sectionTop && st < sectionBottom) {
                    currentSection = $(this).attr("id");
                }
            });
            
            // Add active class to current section link
            navLinks.removeClass("active");
            $(".navbar-nav .nav-link[href='#" + currentSection + "']").addClass("active");
        });
    });
})(jQuery); 