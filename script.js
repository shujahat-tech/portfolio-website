/* ============================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   ============================================ */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
        offset: 100
    });

    // Initialize all functions
    initTypingAnimation();
    initDarkMode();
    initScrollToTop();
    initCounterAnimation();
    initSmoothScrolling();
    initContactForm();
    initNavbarHighlight();
});

/* ============================================
   TYPING ANIMATION
   ============================================ */

function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const text = "Hi, I'm Shujahat";
    let index = 0;
    typingText.textContent = '';

    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }

    type();
}

/* ============================================
   DARK MODE TOGGLE
   ============================================ */

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Load dark mode preference from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateDarkModeIcon(darkModeToggle);
    }

    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        updateDarkModeIcon(darkModeToggle);
    });

    function updateDarkModeIcon(button) {
        const icon = button.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

/* ============================================
   SCROLL TO TOP BUTTON
   ============================================ */

function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */

function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    function startCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;

            const updateCounter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(updateCounter);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 40);
        });
    }

    window.addEventListener('scroll', function() {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const statsSectionTop = statsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (statsSectionTop < windowHeight && !hasAnimated) {
                hasAnimated = true;
                startCounters();
            }
        }
    });
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update navbar active state
                updateNavbarActive(this.getAttribute('href'));
            }
        });
    });
}

/* ============================================
   NAVBAR ACTIVE STATE
   ============================================ */

function initNavbarHighlight() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

function updateNavbarActive(target) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === target) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   CONTACT FORM
   ============================================ */

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate API call (replace with actual backend API)
        setTimeout(() => {
            // Show success message
            showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');

            // Reset form
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        }, 2000);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormMessage(message, type) {
        formMessage.innerHTML = `
            <div class="alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show" role="alert">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>'} ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Collapse navbar on link click
document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', function() {
        const navbarToggle = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarCollapse.classList.contains('show')) {
            navbarToggle.click();
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

/* ============================================
   LAZY LOADING IMAGES
   ============================================ */

// Implement lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading state management
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

/* ============================================
   SERVICE WORKER (Optional - for PWA support)
   ============================================ */

if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js').catch(() => {});
}

/* ============================================
   ACCESSIBILITY ENHANCEMENTS
   ============================================ */

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close navbar on Escape key
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
        }
    }
});

// Announce dynamic content changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

/* ============================================
   ADDITIONAL INTERACTIVE FEATURES
   ============================================ */

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Animate skill bars on scroll
const skillSection = document.querySelector('.skills-section');
if (skillSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.progress-bar').forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(skillSection);
            }
        });
    });
    observer.observe(skillSection);
}

/* ============================================
   MODAL/POPUP FUNCTIONALITY
   ============================================ */

// Project modal functionality (optional)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add click functionality for project details
        const projectTitle = this.querySelector('h5').textContent;
        // You can add modal or navigation logic here
    });
});

/* ============================================
   PRINT STYLESHEET SUPPORT
   ============================================ */

// Handle print styles
if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    darkModeMediaQuery.addEventListener('change', (e) => {
        if (e.matches && localStorage.getItem('darkMode') !== 'false') {
            document.body.classList.add('dark-mode');
        } else if (!e.matches && localStorage.getItem('darkMode') !== 'true') {
            document.body.classList.remove('dark-mode');
        }
    });
}

/* ============================================
   PERFORMANCE MONITORING
   ============================================ */

// Basic performance tracking (optional)
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', pageLoadTime, 'ms');
        }, 0);
    });
}

/* ============================================
   ERROR HANDLING
   ============================================ */

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled rejection:', e.reason);
});

/* ============================================
   INITIALIZATION COMPLETE
   ============================================ */

console.log('Portfolio Website Initialized Successfully!');
