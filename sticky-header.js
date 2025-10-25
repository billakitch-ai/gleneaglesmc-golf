function loadStickyHeader(titleText = '') {
  fetch('sticky-header.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('headerContainer').innerHTML = html;

      // Inject dynamic title
      const titleEl = document.getElementById('pageTitle');
      if (titleEl) titleEl.textContent = titleText;

      // Start datetime updates
      updateDateTime();
      setInterval(updateDateTime, 1000);

      // Enable scroll collapse
      setupScrollCollapse();
    })
    .catch(err => {
      console.error('Failed to load sticky header:', err);
    });
}

function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  };
  const el = document.getElementById('datetime');
  if (el) el.textContent = now.toLocaleString('en-US', options);
}

function setupScrollCollapse() {
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const header = document.getElementById('stickyHeader');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
      header.style.transform = (scrollTop > lastScrollTop && scrollTop > 100)
        ? 'translateY(-100%)'
        : 'translateY(0)';
    }
    lastScrollTop = scrollTop;
  });
}