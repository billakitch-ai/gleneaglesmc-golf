export function injectHeader({
  logoSrc = '',
  designedBySrc = '',
  homeHref = '',
  userRole = 'guest',
  userName = ''
} = {}) {
  const header = document.getElementById('main-header');
  const subheading = header?.dataset?.subheading || '';

  const logoHTML = logoSrc
    ? `<a href="${homeHref}" aria-label="Home">
         <img src="${logoSrc}" alt="Club logo" class="club-logo" />
       </a>`
    : '';

  const designerHTML = userRole === 'admin' || userRole === 'developer'
    ? `<div class="designer-credit">Designed by Bill Kitch</div>`
    : '';

  const welcomeHTML = userName
    ? `<div class="welcome-msg">Welcome, ${userName}</div>`
    : '';

  header.innerHTML = `
    <div class="header-content">
      ${logoHTML}
      <div class="header-stack">
        <h1 class="club-title" aria-label="Club name">Gleneagles Men's Club</h1>
        <h2 class="page-subheading" aria-label="Page section">${subheading}</h2>
        ${designerHTML}
        ${welcomeHTML}
        <div class="datetime" id="datetime" aria-live="polite"></div>
      </div>
    </div>
  `;

  startClock();
}

function startClock() {
  function updateDateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const dateString = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const datetimeEl = document.getElementById('datetime');
    if (datetimeEl) {
      datetimeEl.textContent = `${dateString} ${timeString}`;
    }
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
}