/**
 * Performance Improvements for Portfolio Website
 * - Lazy loading images
 * - Fade-in animations
 * - Smooth scrolling
 * - Navbar scroll effect
 */

// Lazy Load Images
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          if (lazyImage.dataset.srcset) {
            lazyImage.srcset = lazyImage.dataset.srcset;
          }
          lazyImage.classList.remove("lazy");
          lazyImage.classList.add("loaded");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    let active = false;

    const lazyLoad = function() {
      if (active === false) {
        active = true;

        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
              lazyImage.src = lazyImage.dataset.src;
              if (lazyImage.dataset.srcset) {
                lazyImage.srcset = lazyImage.dataset.srcset;
              }
              lazyImage.classList.remove("lazy");
              lazyImage.classList.add("loaded");

              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
              });

              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
              }
            }
          });

          active = false;
        }, 200);
      }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
    lazyLoad();
  }
});

// Fade-in animations
document.addEventListener("DOMContentLoaded", function() {
  // Elements to animate
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });
  
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });
});

// Navbar scroll effect
document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});

// Add 'loading="lazy"' attribute to images that don't already have it
document.addEventListener("DOMContentLoaded", function() {
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach(img => {
    if (!img.hasAttribute('loading') && !img.classList.contains('lazy')) {
      img.setAttribute('loading', 'lazy');
    }
  });
});

// Convert non-critical background images to lazy loaded inline styles
document.addEventListener("DOMContentLoaded", function() {
  const elementsWithBgImage = document.querySelectorAll('[data-bg]');
  
  const bgImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.backgroundImage = `url(${entry.target.dataset.bg})`;
        bgImageObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elementsWithBgImage.forEach(element => {
    bgImageObserver.observe(element);
  });
});

// Performance metrics logging (for development)
if (window.performance && location.hostname === 'localhost') {
  // Log navigation timing data
  window.addEventListener('load', function() {
    setTimeout(function() {
      const timing = window.performance.timing;
      console.log('Page load time:', timing.loadEventEnd - timing.navigationStart + 'ms');
      console.log('DOM content loaded:', timing.domContentLoadedEventEnd - timing.navigationStart + 'ms');
    }, 0);
  });
} 