/**
 * Navbar Behavior Script
 * - Hide on scroll down, show on scroll up
 * - Highlight active section based on scroll position
 * - Smooth toggle for mobile menu
 * - Improved accessibility
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
        const navbarToggler = $(".navbar-toggler");
        const navbarCollapse = $(".navbar-collapse");
        
        // Add CSS class for transition
        navbar.addClass("navbar-transition");
        
        // Function to handle scroll events
        $(window).scroll(function() {
            // Hide/show navbar based on scroll direction
            const st = $(this).scrollTop();
            
            // On mobile, don't hide navbar when menu is expanded
            if (navbarCollapse.hasClass('show')) {
                navbar.removeClass("navbar-hidden");
            } else {
                // Detect scroll direction
                if (st > lastScrollTop && st > navbarHeight) {
                    // Scrolling down
                    navbar.addClass("navbar-hidden");
                } else {
                    // Scrolling up
                    navbar.removeClass("navbar-hidden");
                }
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
        
        // Improved mobile menu toggle behavior
        navbarToggler.on('click', function() {
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = $(this).attr("aria-expanded") === "true";
            $(this).attr("aria-expanded", !isExpanded);
            
            // Add animation class when toggling
            if (!navbarCollapse.hasClass('show')) {
                navbarCollapse.addClass('collapsing-in');
                setTimeout(function() {
                    navbarCollapse.removeClass('collapsing-in');
                }, 300);
            }
            
            // Ensure navbar is visible when menu is toggled
            navbar.removeClass('navbar-hidden');
        });
        
        // Close mobile menu when clicking a nav link
        navLinks.on('click', function() {
            if (navbarCollapse.hasClass('show')) {
                navbarToggler.click(); // Simulate click on navbar toggler to close menu
            }
        });
        
        // Close menu when clicking outside
        $(document).on('click', function(event) {
            if (navbarCollapse.hasClass('show') && 
                !$(event.target).closest('.navbar-collapse').length && 
                !$(event.target).closest('.navbar-toggler').length) {
                navbarToggler.click();
            }
        });
        
        // Ensure proper positioning of navbar on mobile
        function adjustMobileNavbar() {
            if (window.innerWidth <= 991) {
                // Make sure navbar is visible when toggling on mobile
                if (navbarCollapse.hasClass('show')) {
                    navbar.removeClass('navbar-hidden');
                }
                
                // Ensure the navbar collapse has the right position
                navbarCollapse.css('top', navbar.outerHeight() + 'px');
                
                // Add specific mobile classes
                navbar.addClass('navbar-mobile');
            } else {
                navbar.removeClass('navbar-mobile');
                navbarCollapse.css('top', '');
            }
        }
        
        // Run on resize and on navbar toggle
        $(window).resize(adjustMobileNavbar);
        navbarToggler.on('click', function() {
            setTimeout(adjustMobileNavbar, 10);
        });
        
        // Initial call
        adjustMobileNavbar();
    });
})(jQuery); 