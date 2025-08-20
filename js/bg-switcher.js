(function(){
  const select = document.getElementById('bg-mode');
  const body = document.body;
  const chips = Array.from(document.querySelectorAll('.bg-chip'));
  let starsLoaded = false;

  const loadStarsScript = () => {
    if (starsLoaded) return;
    const script = document.createElement('script');
    script.src = 'js/stars-bg.js';
    script.async = true;
    script.onload = () => { starsLoaded = true; };
    document.head.appendChild(script);
  };

  if (!select) return;

  const apply = (mode) => {
    body.classList.remove('bg-grid','bg-conic','bg-stars');
    // Mesh é o padrão (sem classe extra)
    if (mode === 'grid') body.classList.add('bg-grid');
    else if (mode === 'conic') body.classList.add('bg-conic');
    else if (mode === 'stars') {
      body.classList.add('bg-stars');
      if (typeof window.initStarsBackground === 'function') {
        window.initStarsBackground();
      } else {
        loadStarsScript();
      }
    }
  };

  const setActiveChip = (mode) => {
    chips.forEach(chip => {
      const isActive = chip.dataset.mode === mode;
      chip.classList.toggle('active', isActive);
      chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  };

  const saved = localStorage.getItem('bg-mode');
  const initial = saved || (
    body.classList.contains('bg-grid') ? 'grid' :
    body.classList.contains('bg-conic') ? 'conic' :
    body.classList.contains('bg-stars') ? 'stars' : 'mesh'
  );
  select.value = initial;
  setActiveChip(initial);
  apply(initial);

  select.addEventListener('change', () => {
    const mode = select.value;
    localStorage.setItem('bg-mode', mode);
    setActiveChip(mode);
    apply(mode);
  });

  chips.forEach(chip => {
    const handleActivate = () => {
      const mode = chip.dataset.mode;
      select.value = mode;
      localStorage.setItem('bg-mode', mode);
      setActiveChip(mode);
      apply(mode);
    };
    chip.addEventListener('click', handleActivate);
    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivate();
      }
    });
  });
})();
