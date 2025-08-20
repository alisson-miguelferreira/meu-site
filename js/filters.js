// Filtro simples de projetos por data-tags
(function() {
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('.projects-list .project-card');

  function applyFilter(filter) {
    cards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').split(/\s+/);
      const match = filter === 'all' || tags.includes(filter);
      card.style.display = match ? '' : 'none';
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      applyFilter(chip.dataset.filter);
    });
  });

  // filtro inicial
  applyFilter('all');
})();
