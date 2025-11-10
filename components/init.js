import { injectHeader } from './header.js';

export async function initPage({ userRole, userName, logoSrc }) {
  await injectHeader('Gleneagles Golf Club', logoSrc, userName, userRole);
}