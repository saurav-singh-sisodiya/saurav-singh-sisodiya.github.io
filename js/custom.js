/**
 * Custom JavaScript for Portfolio
 * - Theme toggle functionality
 * - Responsive navigation behavior
 * - Duration calculation for experience
 */

(function ($) {
  "use strict";

  // Theme Toggle Functionality
  $('.color-mode').click(function(e) {
    e.preventDefault();
    $('.color-mode-icon').toggleClass('active');
    $('body').toggleClass('dark-mode');
    
    // Save preference to localStorage
    if ($('body').hasClass('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
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

  // Calculate years of experience
  $(document).ready(function() {
    function calculateDuration(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffInMs = end - start;
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      const years = diffInDays / 365;
      return years.toFixed(1); // Returns years with one decimal place
    }

    // Update the experience duration
    const startDate = '2022-05-01'; // Start date for Data Engineer role
    const endDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    const duration = calculateDuration(startDate, endDate);
    
    if (document.querySelector('#date_difference_small')) {
      document.querySelector('#date_difference_small').textContent = duration;
    }
  });

  // Project filtering with Isotope
  $(document).ready(function() {
    // Initialize Isotope if the required elements exist
    if ($('#project .container .row .maindivpro button').length && 
        $('#project .container .row .mainaltercard').length) {
      
      let $btns = $('#project .container .row .maindivpro button');
      
      // Initialize Isotope
      let $grid = $('#project .container .row .mainaltercard').isotope({
        itemSelector: '.altercard',
        layoutMode: 'fitRows'
      });
      
      // Filter items on button click
      $btns.on('click', function(e) {
        let selector = $(e.target).attr("data-filter");
        $grid.isotope({
          filter: selector
        });
        
        // Update active button
        $btns.removeClass('active');
        $(e.target).addClass('active');
        
        return false;
      });
      
      // Trigger click on "popular" filter on page load
      $('#popular').trigger('click');
    }
  });

  // Smooth scrolling for internal links
  $(document).ready(function() {
    $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      
      const target = this.hash;
      const $target = $(target);
      
      if ($target.length) {
        $('html, body').animate({
          scrollTop: $target.offset().top - 70
        }, 800, 'swing');
      }
    });
  });

  // Skills animation
  $(document).ready(function() {
    // Keep track of which bars have been animated
    const animatedBars = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get all progress bars in this section
          entry.target.querySelectorAll('.progress-bar').forEach(bar => {
            // Only animate if this bar hasn't been animated before
            if (!animatedBars.has(bar)) {
              bar.classList.add('animate');
              animatedBars.add(bar); // Mark this bar as animated
              
              // Get the target percentage from the parent's data-progress attribute
              const progressContainer = bar.closest('.skill-progress');
              if (progressContainer && progressContainer.dataset.progress) {
                const targetProgress = parseInt(progressContainer.dataset.progress);
                const textElement = bar.querySelector('.progress-text');
                
                if (textElement) {
                  // Animate the number
                  let currentProgress = 0;
                  const duration = 1500; // 1.5 seconds to match CSS transition
                  const steps = 60; // 60 steps for smooth animation
                  const increment = targetProgress / steps;
                  const stepDuration = duration / steps;
                  
                  const timer = setInterval(() => {
                    currentProgress += increment;
                    if (currentProgress >= targetProgress) {
                      currentProgress = targetProgress;
                      clearInterval(timer);
                    }
                    textElement.textContent = Math.round(currentProgress) + '%';
                  }, stepDuration);
                }
              }
            }
          });
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe all skill rating sections
    document.querySelectorAll('.skill-rating').forEach(section => {
      observer.observe(section);
    });
  });

})(jQuery);



