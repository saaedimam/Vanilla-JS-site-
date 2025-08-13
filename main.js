
// KTL Website JavaScript
class KTLWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupFormHandling();
    this.setupAccessibility();
  }

  // Mobile Menu Toggle
  setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (!menuBtn || !mobileNav) return;

    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      menuBtn.setAttribute('aria-label', isExpanded ? 'Open menu' : 'Close menu');
      
      if (isExpanded) {
        mobileNav.setAttribute('hidden', '');
      } else {
        mobileNav.removeAttribute('hidden');
      }
    });

    // Close menu when clicking nav links
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
        mobileNav.setAttribute('hidden', '');
      }
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        if (!mobileNav.hasAttribute('hidden')) {
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.setAttribute('aria-label', 'Open menu');
          mobileNav.setAttribute('hidden', '');
        }
      }
    });
  }

  // Smooth Scrolling for Anchor Links
  setupSmoothScrolling() {
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Close mobile menu if open
          const mobileNav = document.getElementById('mobileNav');
          const menuBtn = document.getElementById('menuBtn');
          
          if (mobileNav && !mobileNav.hasAttribute('hidden')) {
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open menu');
            mobileNav.setAttribute('hidden', '');
          }
          
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  // Form Handling
  setupFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleFormSubmit(e.target);
    });
  }

  async handleFormSubmit(form) {
    const status = form.querySelector('.status');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!this.validateForm(form, status)) return;

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    
    this.showStatus(status, 'Sending your message...', 'loading');

    try {
      // In a real application, you would send to your API endpoint
      // For now, we'll simulate a successful submission and use mailto fallback
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      // Create mailto link as fallback
      const subject = encodeURIComponent(`Website Contact - ${data.company || 'Inquiry'}`);
      const body = encodeURIComponent(
        Object.entries(data)
          .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
          .join('\n')
      );
      
      // Open email client
      window.location.href = `mailto:info@ktlbd.com?subject=${subject}&body=${body}`;
      
      this.showStatus(status, '✓ Success! Your email client will open shortly.', 'success');
      form.reset();
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showStatus(status, '⚠ There was an error. Please try again or contact us directly.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    }
  }

  validateForm(form, status) {
    const requiredFields = form.querySelectorAll('[required]');
    
    for (const field of requiredFields) {
      if (!field.value.trim()) {
        const fieldName = field.name || 'This field';
        this.showStatus(status, `⚠ ${fieldName} is required.`, 'error');
        field.focus();
        return false;
      }
      
      if (field.type === 'email' && !this.isValidEmail(field.value)) {
        this.showStatus(status, '⚠ Please enter a valid email address.', 'error');
        field.focus();
        return false;
      }
    }
    
    return true;
  }

  isValidEmail(email) {
    return email.includes('@') && email.includes('.') && email.length > 5;
  }

  showStatus(statusElement, message, type) {
    if (!statusElement) return;
    
    statusElement.textContent = message;
    statusElement.className = `status status-${type}`;
    
    // Add appropriate styling based on type
    switch (type) {
      case 'loading':
        statusElement.style.background = '#FEF3C7';
        statusElement.style.color = '#92400E';
        statusElement.style.border = '1px solid #F59E0B';
        break;
      case 'success':
        statusElement.style.background = '#D1FAE5';
        statusElement.style.color = '#065F46';
        statusElement.style.border = '1px solid #10B981';
        break;
      case 'error':
        statusElement.style.background = '#FEE2E2';
        statusElement.style.color = '#991B1B';
        statusElement.style.border = '1px solid #EF4444';
        break;
      default:
        statusElement.style.background = '#F3F4F6';
        statusElement.style.color = '#1F2937';
        statusElement.style.border = '1px solid #D1D5DB';
    }
  }

  // Accessibility Features
  setupAccessibility() {
    // Escape key handling
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNav');
        const menuBtn = document.getElementById('menuBtn');
        
        if (mobileNav && !mobileNav.hasAttribute('hidden')) {
          menuBtn.setAttribute('aria-expanded', 'false');
          menuBtn.setAttribute('aria-label', 'Open menu');
          mobileNav.setAttribute('hidden', '');
          menuBtn.focus();
        }
      }
    });

    // Focus management for mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          menuBtn.click();
        }
      });
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new KTLWebsite();
});

// Export for potential external use
window.KTLWebsite = KTLWebsite;
