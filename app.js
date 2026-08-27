const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (motionAllowed) {
  const ambient = document.querySelector('.ambient');
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 28;
    const y = (event.clientY / window.innerHeight - 0.5) * 20;
    ambient.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, { passive: true });

  const cards = document.querySelectorAll('.project-card, .all-projects');
  cards.forEach((card) => card.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((card) => observer.observe(card));
}
