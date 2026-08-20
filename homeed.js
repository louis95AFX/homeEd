 // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Header shadow on scroll
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  });

  // Mobile nav toggle
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.classList.toggle('active', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }));

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .stamp');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  revealEls.forEach(el => io.observe(el));

  // Count-up numbers
  const counters = document.querySelectorAll('[data-count]');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1400;
        const start = performance.now();
        function tick(now){
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(el => countIO.observe(el));