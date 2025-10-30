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
        ${logoHTML}
        <h1 class="club-title">Gleneagles Men's Club</h1>
        <h2 class="page-subheading">${subheading}</h2>
      </div>
      <div class="header-row bottom-row">
        ${designerHTML}
        ${welcomeHTML}
        <div class="datetime" id="datetime" aria-live="polite"></div>
      </div>
    </div>
  `;

  startClock();
}