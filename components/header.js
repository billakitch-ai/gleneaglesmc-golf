export function injectHeader(title = 'Gleneagles Golf Club') {
  const header = document.createElement('header');
  header.innerHTML = `
    <h1>${title}</h1>
    <nav>
      <a href="../index.html">Home</a>
      <a href="../Pages/test.html">Test</a>
      <a href="#">Logout</a>
    </nav>
  `;
  document.body.prepend(header);
}