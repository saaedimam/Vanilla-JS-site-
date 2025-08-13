// Simple router for single-page app with smooth scroll
class Router {
  constructor() {
    this.currentRoute = null;
    this.init();
  }

  init() {
    // Load the home content initially
    this.loadHomePage();

    // Handle hash changes for smooth scrolling
    window.addEventListener('hashchange', () => this.handleHashChange());
    window.addEventListener('load', () => this.handleHashChange());

    // Handle clicks on navigation links
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = e.target.getAttribute('href').substring(1);
        this.scrollToSection(target);
      }
    });
  }

  async loadHomePage() {
    const app = document.getElementById('app');
    const view = document.querySelector('.view');

    try {
      const response = await fetch('./partials/home.html');
      if (!response.ok) throw new Error('Failed to load home page');

      const html = await response.text();
      app.innerHTML = html;

      // Update page title
      document.title = 'Kattali Textile Ltd. — Export‑Ready Apparel Manufacturing (Knitwear, Uniforms, Woven, Schoolwear, Sportswear)';

      // Initialize functionality
      if (window.KTL?.initView) {
        window.KTL.initView('/home');
      }

      // Show the view
      requestAnimationFrame(() => {
        if (view) {
          view.classList.add('show');
          if (window.KTL?.observeReveals) {
            window.KTL.observeReveals();
          }
        }
      });

    } catch (error) {
      console.error('Error loading home page:', error);
      app.innerHTML = '<h1>Loading Error</h1><p>The page could not be loaded.</p>';
    }
  }

  handleHashChange() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      this.scrollToSection(hash);
    }
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      // Close mobile menu if open
      const nav = document.getElementById('nav');
      if (nav && nav.classList.contains('open') && window.KTL?.toggleMenu) {
        window.KTL.toggleMenu();
      }

      // Smooth scroll to section
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });

      // Update URL without triggering hashchange
      history.replaceState(null, null, `#${sectionId}`);
    }
  }

  navigate(sectionId) {
    this.scrollToSection(sectionId);
  }
}

// Router instance
const router = new Router();

// Export for global access
window.router = router;