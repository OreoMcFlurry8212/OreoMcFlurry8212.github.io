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
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();