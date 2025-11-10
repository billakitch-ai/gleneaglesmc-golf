function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour12: false });
  const liveTime = document.getElementById('liveTime');
  if (liveTime) liveTime.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

document.getElementById('logoutBtn')?.addEventListener('click', () => {
  console.log('Logging out...');
  // Add redirect or session clear logic here
});