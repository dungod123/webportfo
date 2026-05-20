/**
 * Scroll Reveal - IntersectionObserver-based scroll animations
 * Adds 'revealed' class to elements with 'reveal' class when they enter viewport
 */

export function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Stop observing once revealed
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Observe all reveal elements
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  return observer;
}

/**
 * Re-initialize scroll reveal for dynamically added content
 * Call this after adding new content to the page
 */
export function refreshScrollReveal() {
  // Small delay to ensure DOM is ready
  requestAnimationFrame(() => {
    initScrollReveal();
  });
}
