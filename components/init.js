import { injectHeader } from './header.js';
import { getSession } from './supabaseAuth.js';

injectHeader('Gleneagles Golf Club');

const { session, error } = await getSession();

if (session) {
  console.log('User is logged in:', session.user.email);
} else {
  console.warn('No active session:', error?.message);
}