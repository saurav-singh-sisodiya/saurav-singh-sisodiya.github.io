/**
 * Performance Improvements for Portfolio Website
 * - Lazy loading images
 * - Fade-in animations
 * - Smooth scrolling
 * - Navbar scroll effect
 * - Resource hints for faster loading
 * - Mobile-specific optimizations
 */

// Lazy Load Images with better mobile support
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
    }, {
      rootMargin: "0px 0px 200px 0px" // Load images 200px before they appear
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

// Fade-in animations with better mobile performance
document.addEventListener("DOMContentLoaded", function() {
  // Elements to animate
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a small delay on mobile to prevent jank
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 100);
        } else {
          entry.target.classList.add('visible');
        }
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px 50px 0px"
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

// Add resource hints for common third-party resources
document.addEventListener("DOMContentLoaded", function() {
  // Add preconnect for external resources
  const preconnectUrls = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com'
  ];
  
  preconnectUrls.forEach(url => {
    if (!document.querySelector(`link[rel="preconnect"][href="${url}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
});

// Optimize event handlers for scroll events to improve mobile performance
let ticking = false;
window.addEventListener("scroll", function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      // Handle all scroll-dependent functions here
      const scrollPosition = window.scrollY;
      
      // Add scrolled class to navbar
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (scrollPosition > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true }); // Add passive event listener for better scrolling performance

// Detect slow connections and apply low-data mode
document.addEventListener("DOMContentLoaded", function() {
  if (navigator.connection) {
    const connection = navigator.connection;
    
    if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      document.body.classList.add('low-data-mode');
      
      // Replace high-quality images with low-quality ones
      document.querySelectorAll('img[data-low-src]').forEach(img => {
        img.src = img.getAttribute('data-low-src');
      });
      
      // Disable animations
      document.body.classList.add('reduce-motion');
    }
  }
});

// Reduce motion for users who prefer reduced motion
document.addEventListener("DOMContentLoaded", function() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
  }
});

// Optimize mobile menu animations
document.addEventListener("DOMContentLoaded", function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    // Use lightweight animation on mobile
    if (window.innerWidth <= 768) {
      navbarToggler.addEventListener('click', function() {
        navbarCollapse.style.transition = 'height 0.25s ease-out';
      });
    }
  }
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