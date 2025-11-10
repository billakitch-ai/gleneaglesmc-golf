document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = e.target.username.value.trim();
  const password = e.target.password.value.trim();

  if (!username || !password) {
    alert('Please enter both username and password.');
    return;
  }

  // Replace with actual login logic
  console.log('Logging in:', { username, password });
});