(function ($) {

  "use strict";
    // COLOR MODE
    $('.color-mode').click(function(e){
        e.preventDefault();
        $('.color-mode-icon').toggleClass('active');
        $('body').toggleClass('dark-mode');
        
        // Force repaint to fix iOS rendering issues
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger a reflow
        document.body.style.display = '';
        
        // Save preference to localStorage
        if ($('body').hasClass('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            // Add explicit class to navbar collapse for iOS
            $('.navbar-collapse').addClass('dark-navbar-collapse');
            // Force color update for mobile toggle
            $('.toggle-text').css('color', '#ffffff');
        } else {
            localStorage.setItem('theme', 'light');
            // Remove explicit class from navbar collapse for iOS
            $('.navbar-collapse').removeClass('dark-navbar-collapse');
            // Force color update for mobile toggle
            $('.toggle-text').css('color', '#333333');
        }
        
        // Additional fix for iPhone
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // Force repaint of navbar elements
            setTimeout(function() {
                $('.navbar-collapse').hide().show(0);
                // Remove reference to the duplicate mobile toggle
                // $('.nav-item .color-mode').hide().show(0);
            }, 50);
        }
    });

    // Check for saved theme preference or use system preference
    $(document).ready(function() {
        // Check if theme is saved in localStorage
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Apply saved theme
            if (savedTheme === 'dark') {
                $('body').addClass('dark-mode');
                $('.color-mode-icon').addClass('active');
                // Add explicit class to navbar collapse for iOS
                $('.navbar-collapse').addClass('dark-navbar-collapse');
                // Force color update for mobile toggle
                $('.toggle-text').css('color', '#ffffff');
            }
        } else {
            // If no saved preference, use system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                $('body').addClass('dark-mode');
                $('.color-mode-icon').addClass('active');
                // Add explicit class to navbar collapse for iOS
                $('.navbar-collapse').addClass('dark-navbar-collapse');
                // Force color update for mobile toggle
                $('.toggle-text').css('color', '#ffffff');
            }
        }

        // Listen for changes in system color scheme preference
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                // Only apply if user hasn't set a preference
                if (!localStorage.getItem('theme')) {
                    if (e.matches) {
                        $('body').addClass('dark-mode');
                        $('.color-mode-icon').addClass('active');
                        // Add explicit class to navbar collapse for iOS
                        $('.navbar-collapse').addClass('dark-navbar-collapse');
                        // Force color update for mobile toggle
                        $('.toggle-text').css('color', '#ffffff');
                    } else {
                        $('body').removeClass('dark-mode');
                        $('.color-mode-icon').removeClass('active');
                        // Remove explicit class from navbar collapse for iOS
                        $('.navbar-collapse').removeClass('dark-navbar-collapse');
                        // Force color update for mobile toggle
                        $('.toggle-text').css('color', '#333333');
                    }
                }
            });
        }
        
        // Fix for iOS Safari rendering issues with backdrop-filter
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // Add iOS-specific class
            $('body').addClass('ios-device');
            
            // Handle navbar toggle click for iOS
            $('.navbar-toggler').on('click', function() {
                // Force repaint after navbar toggle
                setTimeout(function() {
                    document.body.style.display = 'none';
                    document.body.offsetHeight; // Trigger a reflow
                    document.body.style.display = '';
                    
                    // Additional fix for color mode toggle in navbar
                    if ($('body').hasClass('dark-mode')) {
                        $('.toggle-text').css('color', '#ffffff');
                        // Update selector to target the single color-mode element
                        $('.color-mode').css({
                            'background-color': 'rgba(77, 184, 255, 0.3)',
                            'border': '1px solid rgba(77, 184, 255, 0.6)',
                            'color': '#ffffff'
                        });
                    }
                }, 50);
            });
        }
    });

        // SELECT MODE
      var mot="(Selected)";

        $('.filterbtn').click(function(e){
          var x = document.querySelectorAll(".filterbtn");
          var i;
          for (i = 0; i < x.length; i++) {
            x[i].innerHTML=x[i].innerHTML.replace(mot, "");
          }
          e.currentTarget.innerHTML=e.currentTarget.innerHTML+mot;
      })

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL
    $('.owl-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true
	});

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

})(jQuery);



