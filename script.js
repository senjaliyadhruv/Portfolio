// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Navigation functionality
    initNavigation();

    // Smooth scrolling for navigation links
    initSmoothScrolling();

    // Typing animation
    initTypingAnimation();

    // Intersection Observer for animations
    initScrollAnimations();

    // Contact form functionality
    initContactForm();

    // Navbar scroll effect
    initNavbarScrollEffect();

    // Dark mode functionality
    initDarkMode();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link highlighting
    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);
}

// Update active navigation link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = 'Hello, I\'m ';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingElement.textContent = text.slice(0, index + 1);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add staggered animation for skill tags
                if (entry.target.classList.contains('skill-category')) {
                    const tags = entry.target.querySelectorAll('.skill-tag');
                    tags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.animation = `fadeInUp 0.6s ease forwards`;
                        }, index * 100);
                    });
                }

                // Add staggered animation for project cards
                if (entry.target.classList.contains('projects')) {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = `slideInLeft 0.6s ease forwards`;
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections and elements that need animation
    const elementsToObserve = document.querySelectorAll(`
        section,
        .skill-category,
        .project-card,
        .contact-item,
        .about-stats .stat,
        .detail-item,
        .projects
    `);

    elementsToObserve.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };

    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}


// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const floatingIcons = document.querySelectorAll('.icon-float');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        // Apply different parallax rates to floating icons
        floatingIcons.forEach((icon, index) => {
            const iconRate = scrolled * (-0.3 - index * 0.1);
            icon.style.transform += ` translateY(${iconRate}px)`;
        });
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(updateActiveLink, 100));

// Add loading screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    // Small delay before hiding (optional)
    setTimeout(() => {
        loader.classList.add('hidden');

        // Remove from DOM after fade out
        setTimeout(() => {
            loader.remove();
        }, 500); // match CSS transition time
    }, 500); // loader visible for 1 second
});


// Add interactive skill level indicators
function initSkillLevelIndicators() {
    const skillItems = document.querySelectorAll('.skill-item');
    // console.log('Found skill items:', skillItems.length); // Debug

    skillItems.forEach((item, index) => {
        const percentage = item.querySelector('.percentage');
        const progressFill = item.querySelector('.progress-fill');

        // console.log(`Item ${index}:`, {
        //     hasPercentage: !!percentage,
        //     hasProgressFill: !!progressFill,
        //     percentageText: percentage?.textContent
        // }); // Debug

        if (percentage && progressFill) {
            const level = parseInt(percentage.textContent);
            // console.log(`Setting width to: ${level}%`); // Debug

            progressFill.style.width = '0%';

            setTimeout(() => {
                progressFill.style.width = level + '%';
            }, 300);
        }
    });
}

document.addEventListener('DOMContentLoaded', initSkillLevelIndicators);

// Dark mode toggle with full functionality
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');

    document.body.appendChild(darkModeToggle);

    // Check for saved dark mode preference or default to light mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle dark mode functionality
    darkModeToggle.addEventListener('click', () => {
        const body = document.body;
        const isDark = body.classList.contains('dark-mode');

        if (isDark) {
            // Switch to light mode
            body.classList.remove('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'false');
        } else {
            // Switch to dark mode
            body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'true');
        }
    });

    // Optional: Add keyboard support
    darkModeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            darkModeToggle.click();
        }
    });
}
// Initialize EmailJS
emailjs.init("8b-xG2m0suvJXw06c"); // Replace with your public key

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get button and show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;


    // Send email
    emailjs.sendForm('service_biqy35b', 'template_6ad8iqg', this)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);

            // Show success message
            // document.getElementById('successMessage').style.display = 'block';
            document.getElementById('contactForm').reset();

            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

        }, function (error) {
            console.log('FAILED...', error);

            // Show error message
            document.getElementById('errorMessage').style.display = 'block';

            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});