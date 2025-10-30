export function injectHeader({
  logoSrc = '',
  homeHref = '',
  userRole = 'guest',
  userName = ''
} = {}) {
  const header = document.getElementById('main-header');
  const subheading = header?.dataset?.subheading || '';

  const logoHTML = logoSrc
    ? `<a href="${homeHref}" aria-label="Home">
         <img src="${logoSrc}" alt="Gleneagles Men's Club logo" class="club-logo" />
       </a>`
    : '';

  const designerHTML = (userRole === 'admin' || userRole === 'developer')
    ? `<div class="designer-credit">Designed by Bill Kitch</div>`
    : '';

  const welcomeHTML = userName
    ? `<div class="welcome-msg">Welcome, ${userName}</div>`
    : '';

  header.classList.add(`role-${userRole}`);

  header.innerHTML = `
    <div class="header-content">
      <div class="header-row top-row">
        <div class="identity-stack">
          ${logoHTML}
          <h1 class="club-title">Gleneagles Men's Club</h1>
          <h2 class="page-subheading">${subheading}</h2>
        </div>
      </div>
      <div class="header-row bottom-row">
        <div class="context-stack">
          ${designerHTML}
          ${welcomeHTML}
          <div class="datetime" id="datetime" aria-live="polite"></div>
        </div>
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