import { injectHeader } from './header.js';

export function initPage({
  userRole = 'guest',
  userName = '',
  logoSrc = '',
  homeHref = ''
} = {}) {
  injectHeader({
    logoSrc,
    homeHref,
    userRole,
    userName
  });

  // Future: injectNav(), injectFooter(), setupPreviewMode(), etc.
}