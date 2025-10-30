export function injectHeader({
  containerSelector = '#main-header',
  title = 'Gleneagles Men’s Club',
  showDateTime = true,
  navLinks = [
    { label: 'Home', href: 'index.html' },
    { label: 'Players', href: 'players.html' },
    { label: 'Scores', href: 'scores.html' }
  ],
  logoSrc = 'assets/GE_Logo.png'
}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const headerHTML = `
    <div class="header-controls">
      ${showDateTime ? '<div id="datetime">Loading time...</div>' : ''}
      <nav class="nav-links">
        ${navLinks.map(link => `<a href="${link.href}" class="btn-primary">${link.label}</a>`).join('')}
      </nav>
    </div>
    <div class="centered-padding">
      <img src="${logoSrc}" alt="Gleneagles Logo" class="logo-img" />
      <h1 class="page-title">${title}</h1>
    </div>
  `;

  container.innerHTML = headerHTML;

  if (showDateTime) {
    const dt = document.getElementById('datetime');
    if (dt) {
      const now = new Date();
      dt.textContent = now.toLocaleString('en-CA', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}