(function ($) {

  "use strict";
    // COLOR MODE
    $('.color-mode').click(function(){
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')
        
        // Save preference to localStorage
        if ($('body').hasClass('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    })

    // Check for saved theme preference or use system preference
    $(document).ready(function() {
        // Check if theme is saved in localStorage
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Apply saved theme
            if (savedTheme === 'dark') {
                $('body').addClass('dark-mode');
                $('.color-mode-icon').addClass('active');
            }
        } else {
            // If no saved preference, use system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                $('body').addClass('dark-mode');
                $('.color-mode-icon').addClass('active');
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
                    } else {
                        $('body').removeClass('dark-mode');
                        $('.color-mode-icon').removeClass('active');
                    }
                }
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


