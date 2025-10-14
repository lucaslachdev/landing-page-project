// ================================================
// TRADING PRO LANDING PAGE - JAVASCRIPT
// ================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initCountdown();
    initFAQ();
    initModal();
    initScrollAnimations();
    initLiveNotifications();
    initStickyHeader();
    initSmoothScroll();
});

// ================================================
// NAVIGATION
// ================================================
function initNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });

        // Close mobile menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}

// ================================================
// STICKY HEADER
// ================================================
function initStickyHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ================================================
// COUNTDOWN TIMER
// ================================================
function initCountdown() {
    // Set countdown to 24 hours from now
    const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            // Reset countdown to 24 hours
            countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000);
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ================================================
// FAQ ACCORDION
// ================================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ================================================
// MODAL
// ================================================
function initModal() {
    const modal = document.getElementById('leadModal');
    const modalClose = document.getElementById('modalClose');
    const ctaButtons = document.querySelectorAll('.cta-btn-primary, .cta-btn-pricing, .cta-btn-final, .cta-btn-header');
    const leadForm = document.getElementById('leadForm');

    // Open modal when CTA buttons are clicked
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Handle form submission
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            // Here you would normally send data to your backend
            console.log('Form submitted:', { name, email, phone });

            // Show success message
            alert('Obrigado! Em breve entraremos em contato com você.');

            // Close modal
            modal.classList.remove('active');
            document.body.style.overflow = '';

            // Reset form
            leadForm.reset();
        });
    }
}

// ================================================
// SCROLL ANIMATIONS
// ================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll(`
        .pain-card,
        .benefit-card,
        .module-card,
        .testimonial-card,
        .trust-item,
        .pricing-card
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ================================================
// LIVE NOTIFICATIONS
// ================================================
function initLiveNotifications() {
    const notificationsContainer = document.getElementById('liveNotifications');

    if (!notificationsContainer) return;

    const notifications = [
        { name: 'João Silva', city: 'São Paulo', time: '2 minutos atrás' },
        { name: 'Maria Santos', city: 'Rio de Janeiro', time: '5 minutos atrás' },
        { name: 'Carlos Mendes', city: 'Belo Horizonte', time: '8 minutos atrás' },
        { name: 'Ana Paula', city: 'Brasília', time: '12 minutos atrás' },
        { name: 'Pedro Costa', city: 'Porto Alegre', time: '15 minutos atrás' }
    ];

    let currentIndex = 0;

    function showNotification() {
        const notification = notifications[currentIndex];

        const notificationEl = document.createElement('div');
        notificationEl.className = 'notification';
        notificationEl.innerHTML = `
            <div class="notification-avatar" style="background: linear-gradient(135deg, #0066FF 0%, #FFB800 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700;">
                ${notification.name.charAt(0)}
            </div>
            <div class="notification-content">
                <div class="notification-text">
                    <span class="notification-name">${notification.name}</span> de ${notification.city} acabou de garantir sua vaga!
                </div>
                <div style="font-size: 0.8rem; color: #7A8BA5; margin-top: 0.25rem;">
                    ${notification.time}
                </div>
            </div>
        `;

        notificationsContainer.appendChild(notificationEl);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notificationEl.style.opacity = '0';
            notificationEl.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                notificationEl.remove();
            }, 300);
        }, 5000);

        // Show next notification
        currentIndex = (currentIndex + 1) % notifications.length;
    }

    // Show first notification after 3 seconds
    setTimeout(showNotification, 3000);

    // Show new notification every 10 seconds
    setInterval(showNotification, 10000);
}

// ================================================
// SMOOTH SCROLL
// ================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Don't prevent default for # links or modal triggers
            if (href === '#' || this.classList.contains('cta-btn-primary') ||
                this.classList.contains('cta-btn-pricing') ||
                this.classList.contains('cta-btn-final') ||
                this.classList.contains('cta-btn-header')) {
                return;
            }

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================================
// CHART ANIMATION (for hero section)
// ================================================
function initChartAnimation() {
    const chartAnimation = document.querySelector('.chart-animation');

    if (!chartAnimation) return;

    // Create animated chart lines
    const canvas = document.createElement('canvas');
    chartAnimation.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = chartAnimation.offsetWidth;
    canvas.height = chartAnimation.offsetHeight;

    let points = [];
    const numPoints = 50;
    const baseY = canvas.height * 0.7;

    // Initialize points
    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: (canvas.width / numPoints) * i,
            y: baseY + Math.random() * 100 - 50,
            targetY: baseY + Math.random() * 100 - 50
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update points
        points.forEach(point => {
            point.y += (point.targetY - point.y) * 0.05;

            // New target occasionally
            if (Math.random() < 0.02) {
                point.targetY = baseY + Math.random() * 100 - 50;
            }
        });

        // Draw line
        ctx.beginPath();
        ctx.strokeStyle = '#0066FF';
        ctx.lineWidth = 3;
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.stroke();

        // Draw gradient fill
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 102, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 102, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fill();

        requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', function() {
        canvas.width = chartAnimation.offsetWidth;
        canvas.height = chartAnimation.offsetHeight;
    });
}

// Initialize chart animation
setTimeout(initChartAnimation, 100);

// ================================================
// PERFORMANCE OPTIMIZATIONS
// ================================================

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add loading animation to buttons
document.querySelectorAll('button, .btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        }
    });
});

// ================================================
// ANALYTICS & TRACKING (placeholder)
// ================================================
function trackEvent(category, action, label) {
    // Add your analytics tracking code here
    // Example: gtag('event', action, { event_category: category, event_label: label });
    console.log('Event tracked:', category, action, label);
}

// Track CTA clicks
document.querySelectorAll('.cta-btn-primary, .cta-btn-pricing, .cta-btn-final').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('CTA', 'Click', this.textContent.trim());
    });
});

// Track section views
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('Section', 'View', entry.target.id);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// ================================================
// CONSOLE MESSAGE
// ================================================
console.log('%c=¼ Trading Pro - Landing Page', 'font-size: 20px; font-weight: bold; color: #0066FF;');
console.log('%c=€ Developed with d', 'font-size: 14px; color: #FFB800;');
console.log('%cInterested in the code? Let\'s talk!', 'font-size: 12px; color: #7A8BA5;');