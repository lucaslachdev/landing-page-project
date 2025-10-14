/**
 * Delight Enhancements JavaScript Module
 * Professional micro-interactions for financial services landing page
 * Builds trust through subtle, memorable experiences
 */

class DelightEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.setupButtonRipples();
    this.setupSectionReveal();
    this.setupTestimonialEffects();
    this.setupFormEnhancements();
    this.setupChartAnimations();
    this.setupCelebrations();
    this.setupEasterEggs();
    this.setupScrollProgress();
    this.setupCursorEffects();
    this.setupNumberCounters();
    this.setupMagneticButtons();
  }

  // ========================================
  // 1. BUTTON RIPPLE EFFECTS
  // ========================================
  setupButtonRipples() {
    const buttons = document.querySelectorAll('.btn-delightful');

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Add ripple effect
        button.classList.add('clicked');

        // Remove class after animation
        setTimeout(() => {
          button.classList.remove('clicked');
        }, 500);

        // Add haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
      });
    });
  }

  // ========================================
  // 2. SECTION REVEAL ON SCROLL
  // ========================================
  setupSectionReveal() {
    const sections = document.querySelectorAll('.section-reveal');

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // ========================================
  // 3. TESTIMONIAL ENHANCEMENTS
  // ========================================
  setupTestimonialEffects() {
    const testimonials = document.querySelectorAll('.testimonial-card');

    testimonials.forEach((card, index) => {
      // Add entrance animation delay
      card.style.animationDelay = `${index * 0.1}s`;

      // Track hover for analytics
      card.addEventListener('mouseenter', () => {
        this.trackEvent('testimonial_hover', { index });
      });

      // Optional: Click to expand
      card.addEventListener('click', () => {
        card.classList.toggle('expanded');
        this.trackEvent('testimonial_click', { index });
      });
    });
  }

  // ========================================
  // 4. FORM ENHANCEMENTS
  // ========================================
  setupFormEnhancements() {
    const formFields = document.querySelectorAll('.form-field input, .form-field textarea');

    formFields.forEach(field => {
      // Real-time validation feedback
      field.addEventListener('blur', (e) => {
        const parent = e.target.closest('.form-field');

        if (this.validateField(e.target)) {
          parent.classList.add('success');
          parent.classList.remove('error');

          // Play success sound (optional)
          this.playSound('success');
        } else if (e.target.value) {
          parent.classList.add('error');
          parent.classList.remove('success');

          // Gentle shake animation
          this.shakeElement(parent);
        }
      });

      // Clear states on focus
      field.addEventListener('focus', (e) => {
        const parent = e.target.closest('.form-field');
        parent.classList.remove('error');
      });
    });

    // Form submission with celebration
    const forms = document.querySelectorAll('form[data-celebrate]');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmission(form);
      });
    });
  }

  validateField(field) {
    // Basic validation - customize based on field type
    if (field.type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
    }
    if (field.required) {
      return field.value.trim().length > 0;
    }
    return true;
  }

  async handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    // Show loading state
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;

    // Simulate API call (replace with actual submission)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success state
    submitBtn.classList.remove('btn-loading');
    submitBtn.classList.add('success');

    // Trigger celebration
    this.celebrate('form_submit');

    // Track conversion
    this.trackEvent('form_submit', { form: form.id });

    // Reset or redirect after delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove('success');
    }, 3000);
  }

  // ========================================
  // 5. CHART ANIMATIONS
  // ========================================
  setupChartAnimations() {
    const charts = document.querySelectorAll('[data-chart]');

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateChart(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    charts.forEach(chart => observer.observe(chart));
  }

  animateChart(chart) {
    const bars = chart.querySelectorAll('.chart-bar');

    bars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add('chart-bar-animated');
        bar.style.animationDelay = `${index * 0.1}s`;
      }, index * 100);
    });

    // Animate numbers if present
    const numbers = chart.querySelectorAll('[data-count-to]');
    numbers.forEach(num => this.animateNumber(num));
  }

  // ========================================
  // 6. CELEBRATION ANIMATIONS
  // ========================================
  celebrate(type = 'default', options = {}) {
    const defaults = {
      duration: 3000,
      particleCount: 50,
      showCheckmark: true
    };

    const settings = { ...defaults, ...options };

    if (settings.showCheckmark) {
      this.showSuccessCheckmark();
    }

    // Confetti burst
    this.createConfetti(settings.particleCount);

    // Play celebration sound
    this.playSound('celebrate');

    // Track celebration
    this.trackEvent('celebration', { type });
  }

  showSuccessCheckmark() {
    const checkmark = document.createElement('div');
    checkmark.className = 'success-circle';
    document.body.appendChild(checkmark);

    setTimeout(() => {
      checkmark.style.opacity = '0';
      checkmark.style.transform = 'translate(-50%, -50%) scale(0)';
      setTimeout(() => checkmark.remove(), 300);
    }, 1500);
  }

  createConfetti(count) {
    const container = document.createElement('div');
    container.className = 'celebration-container';
    document.body.appendChild(container);

    const colors = ['#3b82f6', '#10b981', '#6366f1', '#8b5cf6', '#ec4899'];

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
      }, i * 30);
    }

    setTimeout(() => container.remove(), 4000);
  }

  // ========================================
  // 7. EASTER EGGS
  // ========================================
  setupEasterEggs() {
    // Logo party on triple click
    const logo = document.querySelector('.logo-easter-egg');
    if (logo) {
      let clickCount = 0;
      let clickTimer = null;

      logo.addEventListener('click', () => {
        clickCount++;

        if (clickCount === 3) {
          logo.classList.add('activated');
          this.celebrate('easter_egg', { particleCount: 30 });

          setTimeout(() => logo.classList.remove('activated'), 2000);
          clickCount = 0;
        }

        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 500);
      });
    }

    // Konami code (↑ ↑ ↓ ↓ ← → ← → B A)
    this.setupKonamiCode();

    // Footer signature reveal
    const footer = document.querySelector('.footer');
    if (footer && !footer.querySelector('.footer-signature')) {
      const signature = document.createElement('div');
      signature.className = 'footer-signature';
      signature.textContent = 'Made with care for your financial future';
      footer.appendChild(signature);
    }

    // Hidden achievement tracker
    this.setupAchievementTracker();
  }

  setupKonamiCode() {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let position = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === code[position].toLowerCase()) {
        position++;

        if (position === code.length) {
          document.body.classList.add('konami-activated');
          this.celebrate('konami', { particleCount: 100 });
          this.showSecretMessage();
          position = 0;

          setTimeout(() => {
            document.body.classList.remove('konami-activated');
          }, 5000);
        }
      } else {
        position = 0;
      }
    });
  }

  setupAchievementTracker() {
    const achievements = {
      'first_visit': false,
      'scrolled_bottom': false,
      'read_testimonials': false,
      'engaged_cta': false,
      'form_started': false
    };

    // Check localStorage for previous achievements
    const saved = localStorage.getItem('achievements');
    if (saved) {
      Object.assign(achievements, JSON.parse(saved));
    }

    // First visit
    if (!achievements.first_visit) {
      achievements.first_visit = true;
      this.showMicroCelebration('Welcome! 🎉');
    }

    // Save achievements
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('achievements', JSON.stringify(achievements));
    });

    // Track scroll to bottom
    this.onScrollToBottom(() => {
      if (!achievements.scrolled_bottom) {
        achievements.scrolled_bottom = true;
        this.showMicroCelebration('You made it to the bottom!');
      }
    });
  }

  showSecretMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem 3rem;
      border-radius: 1rem;
      font-size: 1.5rem;
      font-weight: bold;
      z-index: 10001;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      animation: secretReveal 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    message.textContent = 'Premium Mode Activated! 🚀';
    document.body.appendChild(message);

    setTimeout(() => {
      message.style.opacity = '0';
      message.style.transform = 'translate(-50%, -50%) scale(0)';
      setTimeout(() => message.remove(), 300);
    }, 3000);
  }

  showMicroCelebration(text) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #10b981;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      animation: slideInRight 0.3s ease-out;
    `;
    toast.textContent = text;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ========================================
  // 8. SCROLL PROGRESS
  // ========================================
  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // ========================================
  // 9. CURSOR EFFECTS
  // ========================================
  setupCursorEffects() {
    // Spotlight effect on specific areas
    const spotlightAreas = document.querySelectorAll('.spotlight-area');

    spotlightAreas.forEach(area => {
      area.addEventListener('mousemove', (e) => {
        const rect = area.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        area.style.setProperty('--mouse-x', x + 'px');
        area.style.setProperty('--mouse-y', y + 'px');

        const spotlight = area.querySelector('::before');
        if (spotlight) {
          area.style.setProperty('--spotlight-x', x + 'px');
          area.style.setProperty('--spotlight-y', y + 'px');
        }
      });
    });

    // Optional: Custom cursor (activate for hero section)
    if (document.querySelector('[data-custom-cursor]')) {
      this.setupCustomCursor();
    }
  }

  setupCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }

  // ========================================
  // 10. NUMBER COUNTERS
  // ========================================
  setupNumberCounters() {
    const counters = document.querySelectorAll('[data-count-to]');

    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateNumber(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  animateNumber(element) {
    const target = parseInt(element.dataset.countTo);
    const duration = parseInt(element.dataset.duration) || 2000;
    const start = parseInt(element.textContent) || 0;
    const startTime = Date.now();

    const updateNumber = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth acceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);

      element.textContent = this.formatNumber(current);
      element.classList.add('counting');

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = this.formatNumber(target);
        element.classList.remove('counting');
      }
    };

    updateNumber();
  }

  formatNumber(num) {
    return num.toLocaleString();
  }

  // ========================================
  // 11. MAGNETIC BUTTONS
  // ========================================
  setupMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic-cursor');

    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Magnetic pull effect (subtle)
        const moveX = x * 0.15;
        const moveY = y * 0.15;

        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  shakeElement(element) {
    element.style.animation = 'shake 0.5s';
    setTimeout(() => {
      element.style.animation = '';
    }, 500);
  }

  playSound(type) {
    // Optional: Add subtle audio feedback
    // Requires audio files to be included
    if (this.soundsEnabled && window.AudioContext) {
      // Implement Web Audio API for sound effects
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      if (type === 'success') {
        oscillator.frequency.value = 800;
        gainNode.gain.setValueAtTime(0.1, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
      } else if (type === 'celebrate') {
        oscillator.frequency.value = 1200;
        gainNode.gain.setValueAtTime(0.15, context.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);
      }

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.2);
    }
  }

  trackEvent(eventName, data = {}) {
    // Track interactions for analytics
    console.log('Event:', eventName, data);

    // Example: Send to Google Analytics
    if (window.gtag) {
      gtag('event', eventName, data);
    }

    // Example: Send to custom analytics
    if (window.analytics) {
      window.analytics.track(eventName, data);
    }
  }

  onScrollToBottom(callback) {
    let triggered = false;

    window.addEventListener('scroll', () => {
      if (triggered) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 100;

      if (scrollPosition >= threshold) {
        triggered = true;
        callback();
      }
    });
  }
}

// ========================================
// INITIALIZE ON DOM READY
// ========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.delightEnhancer = new DelightEnhancer();
  });
} else {
  window.delightEnhancer = new DelightEnhancer();
}

// Add necessary CSS keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  @keyframes secretReveal {
    from {
      transform: translate(-50%, -50%) scale(0) rotate(-180deg);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DelightEnhancer;
}
