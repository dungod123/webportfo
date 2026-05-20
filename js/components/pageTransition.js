/**
 * Page Transition Manager
 * Handles smooth transitions between SPA pages
 */

export default class PageTransition {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isTransitioning = false;
  }

  /**
   * Transition to a new page
   * @param {string} html - The HTML content for the new page
   * @param {string} pageId - Unique ID for the page
   * @param {Function} afterRender - Callback after new page is in DOM
   */
  async transition(html, pageId, afterRender = null) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    const currentPage = this.container.querySelector('.page.active');

    // Create new page element
    const newPage = document.createElement('div');
    newPage.className = 'page';
    newPage.id = `page-${pageId}`;
    newPage.innerHTML = html;

    // Fade out current page
    if (currentPage) {
      currentPage.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      currentPage.classList.remove('active');
      
      await this.wait(250);
      currentPage.remove();
    }

    // Add and activate new page
    this.container.appendChild(newPage);
    
    // Force reflow
    void newPage.offsetHeight;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Activate
    requestAnimationFrame(() => {
      newPage.classList.add('active');
      
      if (afterRender) {
        afterRender(newPage);
      }

      this.isTransitioning = false;
    });
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
