(() => {
  const hero = document.querySelector('.hero');
  const message = document.querySelector('.hero-message');
  if (hero && message) {
    const copy = {
      idle: 'Move around to say hello',
      left: 'Looking for something over here?',
      right: 'And what’s happening over there?',
      hello: 'Hey, it’s you! Welcome to my portfolio.'
    };
    let resetTimer;
    const setMood = mood => {
      hero.dataset.mood = mood;
      message.textContent = copy[mood] || copy.idle;
      clearTimeout(resetTimer);
      if (mood === 'left' || mood === 'right') {
        resetTimer = setTimeout(() => setMood('idle'), 2400);
      }
    };
    hero.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const ratio = x / rect.width;
      if (ratio < .29) setMood('left');
      else if (ratio > .71) setMood('right');
      else if (hero.dataset.mood !== 'hello') setMood('idle');
    });
    hero.addEventListener('pointerleave', () => setMood('idle'));
    hero.addEventListener('click', event => {
      if (event.target.closest('a,button')) return;
      setMood('hello');
      resetTimer = setTimeout(() => setMood('idle'), 3200);
    });
    hero.addEventListener('focusin', () => setMood('hello'));
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Subtle pointer tilt on project cards (disabled for touch/reduced-motion).
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--pointer-x', (px * 100) + '%');
        card.style.setProperty('--pointer-y', (py * 100) + '%');
        card.style.transform = 'translateY(-5px) perspective(900px) rotateX(' + ((.5 - py) * 2.5).toFixed(2) + 'deg) rotateY(' + ((px - .5) * 3).toFixed(2) + 'deg)';
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();