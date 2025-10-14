/**
 * Advanced Customization Examples
 * Professional delight patterns for financial services
 */

// ========================================
// CUSTOM CELEBRATION PATTERNS
// ========================================

// Success celebration with custom messaging
function celebrateFormSubmission(formType) {
  window.delightEnhancer.celebrate('form_submit', {
    particleCount: 30,
    duration: 2500
  });

  // Show personalized message
  const messages = {
    'consultation': 'Great choice! An advisor will contact you within 24 hours.',
    'newsletter': 'Welcome to the family! Check your inbox for exclusive insights.',
    'calculator': 'Nice! Your personalized savings plan is ready.'
  };

  window.delightEnhancer.showMicroCelebration(
    messages[formType] || 'Success! We\'ll be in touch soon.'
  );
}

// Milestone celebration with achievement tracking
function celebrateMilestone(milestone, value) {
  const milestones = {
    'savings_goal': {
      message: `Congratulations! You've reached $${value.toLocaleString()}!`,
      particles: 100,
      sound: true
    },
    'investment_return': {
      message: `Excellent! Your portfolio grew ${value}% this month!`,
      particles: 75,
      sound: true
    },
    'debt_payoff': {
      message: `Amazing! ${value} debt milestone reached!`,
      particles: 150,
      sound: true
    }
  };

  const config = milestones[milestone];
  if (config) {
    window.delightEnhancer.celebrate(milestone, {
      particleCount: config.particles
    });
    window.delightEnhancer.showMicroCelebration(config.message);
  }
}

// ========================================
// PROGRESSIVE LOADING STATES
// ========================================

class ProgressiveLoader {
  constructor(element, steps) {
    this.element = element;
    this.steps = steps;
    this.currentStep = 0;
  }

  async start() {
    this.element.classList.add('btn-loading');

    for (const step of this.steps) {
      await this.executeStep(step);
      this.currentStep++;
    }

    this.complete();
  }

  async executeStep(step) {
    // Update loading text
    const btn = this.element.querySelector('.loading-text');
    if (btn) {
      btn.textContent = step.message;
    }

    // Simulate step execution
    await new Promise(resolve => setTimeout(resolve, step.duration));

    // Optional: Show progress
    const progress = ((this.currentStep + 1) / this.steps.length) * 100;
    this.updateProgress(progress);
  }

  updateProgress(percent) {
    const progressBar = this.element.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.width = percent + '%';
    }
  }

  complete() {
    this.element.classList.remove('btn-loading');
    this.element.classList.add('success');

    window.delightEnhancer.celebrate('process_complete', {
      particleCount: 40
    });
  }
}

// Usage example:
function processFinancialCalculation(buttonElement) {
  const loader = new ProgressiveLoader(buttonElement, [
    { message: 'Analyzing income...', duration: 500 },
    { message: 'Calculating expenses...', duration: 700 },
    { message: 'Optimizing savings...', duration: 600 },
    { message: 'Generating recommendations...', duration: 800 }
  ]);

  loader.start();
}

// ========================================
// SMART TOOLTIPS WITH FINANCIAL CONTEXT
// ========================================

class FinancialTooltip {
  constructor() {
    this.tooltip = this.createTooltip();
    this.setupListeners();
  }

  createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = 'financial-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      font-size: 0.9rem;
      pointer-events: none;
      z-index: 10000;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      max-width: 300px;
    `;
    document.body.appendChild(tooltip);
    return tooltip;
  }

  setupListeners() {
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-tooltip]');
      if (target) {
        this.show(target);
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-tooltip]');
      if (target) {
        this.hide();
      }
    });
  }

  show(element) {
    const content = element.dataset.tooltip;
    const type = element.dataset.tooltipType || 'info';

    this.tooltip.innerHTML = this.formatContent(content, type);

    const rect = element.getBoundingClientRect();
    this.tooltip.style.left = rect.left + (rect.width / 2) - (this.tooltip.offsetWidth / 2) + 'px';
    this.tooltip.style.top = rect.bottom + 10 + 'px';

    setTimeout(() => {
      this.tooltip.style.opacity = '1';
      this.tooltip.style.transform = 'translateY(0)';
    }, 10);
  }

  formatContent(content, type) {
    const icons = {
      'info': 'ℹ️',
      'tip': '💡',
      'warning': '⚠️',
      'success': '✓'
    };

    return `
      <div style="display: flex; align-items: start; gap: 0.75rem;">
        <span style="font-size: 1.25rem;">${icons[type]}</span>
        <div>${content}</div>
      </div>
    `;
  }

  hide() {
    this.tooltip.style.opacity = '0';
    this.tooltip.style.transform = 'translateY(10px)';
  }
}

// Initialize
const financialTooltip = new FinancialTooltip();

// ========================================
// INTERACTIVE CALCULATOR WITH DELIGHT
// ========================================

class DelightfulCalculator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.result = 0;
  }

  calculate(inputs) {
    // Animate calculation process
    this.showCalculating();

    setTimeout(() => {
      this.result = this.performCalculation(inputs);
      this.displayResult();
    }, 1500);
  }

  showCalculating() {
    const spinner = document.createElement('div');
    spinner.className = 'calculator-loading';
    spinner.innerHTML = `
      <div class="spinner"></div>
      <p>Crunching the numbers...</p>
    `;
    this.container.appendChild(spinner);
  }

  performCalculation(inputs) {
    // Your calculation logic here
    return inputs.reduce((sum, val) => sum + val, 0);
  }

  displayResult() {
    const loading = this.container.querySelector('.calculator-loading');
    if (loading) loading.remove();

    const resultElement = document.createElement('div');
    resultElement.className = 'calculator-result';
    resultElement.innerHTML = `
      <div class="result-value" data-count-to="${this.result}">0</div>
      <button class="btn-delightful btn-primary-cta">
        Save This Plan
      </button>
    `;

    this.container.appendChild(resultElement);

    // Animate the number
    const numberElement = resultElement.querySelector('.result-value');
    window.delightEnhancer.animateNumber(numberElement);

    // Celebrate if result is positive/good
    if (this.result > 10000) {
      setTimeout(() => {
        window.delightEnhancer.celebrate('good_result', {
          particleCount: 50
        });
      }, 2000);
    }
  }
}

// ========================================
// SCROLL-TRIGGERED REVEALS WITH CONTEXT
// ========================================

class ContextualReveal {
  constructor() {
    this.setupObserver();
  }

  setupObserver() {
    const options = {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const progress = entry.intersectionRatio;
        const element = entry.target;

        // Update element based on scroll progress
        this.updateElement(element, progress);

        // Trigger events at specific thresholds
        if (progress > 0.5 && !element.dataset.revealed) {
          element.dataset.revealed = 'true';
          this.onReveal(element);
        }
      });
    }, options);

    document.querySelectorAll('[data-contextual-reveal]').forEach(el => {
      this.observer.observe(el);
    });
  }

  updateElement(element, progress) {
    // Parallax-like effect
    const translateY = (1 - progress) * 50;
    element.style.transform = `translateY(${translateY}px)`;
    element.style.opacity = progress;
  }

  onReveal(element) {
    const revealType = element.dataset.contextualReveal;

    switch(revealType) {
      case 'stat':
        this.revealStat(element);
        break;
      case 'chart':
        this.revealChart(element);
        break;
      case 'testimonial':
        this.revealTestimonial(element);
        break;
    }
  }

  revealStat(element) {
    const numbers = element.querySelectorAll('[data-count-to]');
    numbers.forEach(num => {
      window.delightEnhancer.animateNumber(num);
    });
  }

  revealChart(element) {
    window.delightEnhancer.animateChart(element);
  }

  revealTestimonial(element) {
    element.classList.add('micro-celebrate');
  }
}

// Initialize
const contextualReveal = new ContextualReveal();

// ========================================
// SMART FORM VALIDATION WITH DELIGHT
// ========================================

class DelightfulFormValidator {
  constructor(formElement) {
    this.form = formElement;
    this.fields = {};
    this.setupValidation();
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
      this.fields[input.name] = {
        element: input,
        valid: false,
        touched: false
      };

      // Real-time validation
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateField(input) {
    const field = this.fields[input.name];
    field.touched = true;

    const validation = this.getValidation(input);

    if (validation.valid) {
      this.showSuccess(input);
      field.valid = true;
    } else {
      this.showError(input, validation.message);
      field.valid = false;
    }
  }

  getValidation(input) {
    const value = input.value.trim();

    // Email validation
    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return {
        valid: emailRegex.test(value),
        message: 'Please enter a valid email address'
      };
    }

    // Phone validation
    if (input.type === 'tel') {
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      return {
        valid: phoneRegex.test(value),
        message: 'Please enter a valid phone number'
      };
    }

    // Required field
    if (input.required) {
      return {
        valid: value.length > 0,
        message: 'This field is required'
      };
    }

    return { valid: true };
  }

  showSuccess(input) {
    const parent = input.closest('.form-field');
    parent.classList.remove('error');
    parent.classList.add('success');

    // Play success sound
    window.delightEnhancer.playSound('success');

    // Show checkmark
    this.addCheckmark(parent);
  }

  showError(input, message) {
    const parent = input.closest('.form-field');
    parent.classList.remove('success');
    parent.classList.add('error');

    // Shake animation
    window.delightEnhancer.shakeElement(parent);

    // Show error message
    this.addErrorMessage(parent, message);
  }

  clearError(input) {
    const parent = input.closest('.form-field');
    parent.classList.remove('error');

    const errorMsg = parent.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
  }

  addCheckmark(parent) {
    const existing = parent.querySelector('.success-icon');
    if (existing) return;

    const checkmark = document.createElement('span');
    checkmark.className = 'success-icon';
    checkmark.textContent = '✓';
    checkmark.style.cssText = `
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #10b981;
      font-weight: bold;
      animation: checkmarkPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    parent.style.position = 'relative';
    parent.appendChild(checkmark);
  }

  addErrorMessage(parent, message) {
    const existing = parent.querySelector('.error-message');
    if (existing) {
      existing.textContent = message;
      return;
    }

    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.cssText = `
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      animation: slideInDown 0.3s ease-out;
    `;
    parent.appendChild(error);
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    let allValid = true;
    for (const [name, field] of Object.entries(this.fields)) {
      this.validateField(field.element);
      if (!field.valid) allValid = false;
    }

    if (!allValid) {
      this.showFormError();
      return;
    }

    // Submit with delight
    await this.submitWithDelight();
  }

  showFormError() {
    const firstError = this.form.querySelector('.form-field.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });

      window.delightEnhancer.showMicroCelebration(
        'Please fix the errors above'
      );
    }
  }

  async submitWithDelight() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    submitBtn.classList.add('btn-loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    submitBtn.classList.remove('btn-loading');

    // Celebrate success
    window.delightEnhancer.celebrate('form_submit', {
      particleCount: 75
    });

    window.delightEnhancer.showMicroCelebration(
      'Success! We\'ll be in touch within 24 hours.'
    );

    // Reset form after delay
    setTimeout(() => {
      this.form.reset();
      this.clearAllStates();
    }, 3000);
  }

  clearAllStates() {
    const fields = this.form.querySelectorAll('.form-field');
    fields.forEach(field => {
      field.classList.remove('success', 'error');
      field.querySelectorAll('.success-icon, .error-message').forEach(el => el.remove());
    });
  }
}

// Auto-initialize on forms with data attribute
document.querySelectorAll('form[data-delightful-validation]').forEach(form => {
  new DelightfulFormValidator(form);
});

// ========================================
// GAMIFICATION ELEMENTS
// ========================================

class FinancialGamification {
  constructor() {
    this.achievements = this.loadAchievements();
    this.setupTracking();
  }

  loadAchievements() {
    const saved = localStorage.getItem('financial_achievements');
    return saved ? JSON.parse(saved) : {
      first_visit: false,
      form_completed: false,
      calculator_used: false,
      shared_content: false,
      scroll_champion: false,
      easter_egg_hunter: false
    };
  }

  saveAchievements() {
    localStorage.setItem('financial_achievements', JSON.stringify(this.achievements));
  }

  setupTracking() {
    // Track first visit
    if (!this.achievements.first_visit) {
      this.unlock('first_visit', 'Welcome Explorer!',
        'Thanks for visiting FinanceFlow');
    }

    // Track scroll behavior
    this.trackScrollDepth();

    // Track calculator usage
    this.trackCalculatorUsage();

    // Track sharing
    this.trackSharing();
  }

  unlock(achievement, title, message) {
    if (this.achievements[achievement]) return;

    this.achievements[achievement] = true;
    this.saveAchievements();

    // Show achievement notification
    this.showAchievement(title, message);

    // Celebrate
    window.delightEnhancer.celebrate('achievement', {
      particleCount: 60
    });

    // Track event
    window.delightEnhancer.trackEvent('achievement_unlocked', {
      achievement,
      title
    });
  }

  showAchievement(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      z-index: 10001;
      max-width: 300px;
      animation: achievementSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    notification.innerHTML = `
      <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏆</div>
      <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">${title}</h4>
      <p style="font-size: 0.9rem; opacity: 0.9;">${message}</p>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'achievementSlideOut 0.5s ease-in forwards';
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }

  trackScrollDepth() {
    let maxScroll = 0;

    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
      }

      if (maxScroll > 90 && !this.achievements.scroll_champion) {
        this.unlock('scroll_champion', 'Scroll Champion!',
          'You explored every corner of our page');
      }
    });
  }

  trackCalculatorUsage() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-calculator-trigger]')) {
        if (!this.achievements.calculator_used) {
          this.unlock('calculator_used', 'Number Cruncher!',
            'You used our financial calculator');
        }
      }
    });
  }

  trackSharing() {
    // Track share button clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-share]')) {
        if (!this.achievements.shared_content) {
          this.unlock('shared_content', 'Social Butterfly!',
            'Thanks for sharing FinanceFlow');
        }
      }
    });
  }
}

// Add achievement animation CSS
const achievementStyle = document.createElement('style');
achievementStyle.textContent = `
  @keyframes achievementSlideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes achievementSlideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  @keyframes slideInDown {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(achievementStyle);

// Initialize gamification
const gamification = new FinancialGamification();

// ========================================
// EXPORT FOR MODULE USAGE
// ========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    celebrateFormSubmission,
    celebrateMilestone,
    ProgressiveLoader,
    FinancialTooltip,
    DelightfulCalculator,
    ContextualReveal,
    DelightfulFormValidator,
    FinancialGamification
  };
}
