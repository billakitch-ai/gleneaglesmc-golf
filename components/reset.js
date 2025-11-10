import { supabase } from './supabaseClient.js';

const form = document.getElementById('reset-form');
const status = document.getElementById('reset-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPassword = document.getElementById('new-password').value;

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    status.textContent = `Password update failed: ${error.message}`;
  } else {
    status.textContent = `Password updated successfully. You can now log in.`;
    setTimeout(() => {
      window.location.href = '../Pages/login.html';
    }, 2000);
  }
});