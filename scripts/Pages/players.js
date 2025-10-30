import { injectHeader } from '../components/header.js';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Inject modular header
injectHeader({
  logoSrc: '../assets/GE_Logo.png',
  designedBySrc: '../assets/designedby.png',
  homeHref: '../index.html'
});

// Supabase setup
const supabase = createClient(
  'https://ekevotcpnrzncxigemnp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZXZvdGNwbnJ6bmN4aWdlbW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDkwMTAsImV4cCI6MjA3NjAyNTAxMH0.D6iIHHlfGfpuh0NkUTVMWOWE7Vepw9GlJn_OcfRxg6E'
);

// DOM references
const playersBody = document.getElementById('players-body');
const pageInfo = document.getElementById('page-info');
const countSummary = document.getElementById('countSummary');
const cutoffInput = document.getElementById('cutoffInput');
const renderBtn = document.getElementById('renderBtn');
const sortButtons = {
  last: document.getElementById('sortLast'),
  first: document.getElementById('sortFirst'),
  handicap: document.getElementById('sortHandicap'),
  high_low: document.getElementById('sortHighLow')
};
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

// State
let allPlayers = [];
let sortField = 'last';
let sortDirection = 'asc';
let currentPage = 0;
const pageSize = 20;

// Helpers
function escapeHtml(s) {
  return s == null ? '' : String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getRowClass(highLow) {
  const val = String(highLow ?? '').toLowerCase();
  if (val === 'low') return 'row-low';
  if (val === 'high') return 'row-high';
  return '';
}

function updateSortLabels() {
  for (const field in sortButtons) {
    const btn = sortButtons[field];
    const arrow = (field === sortField) ? (sortDirection === 'asc' ? ' ↑' : ' ↓') : '';
    const label = {
      last: 'Sort by Last Name',
      first: 'Sort by First Name',
      handicap: 'Sort by Handicap',
      high_low: 'Sort by High/Low'
    }[field];
    btn.textContent = label + arrow;
  }
}

function sortPlayers(data) {
  return [...data].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    let result;
    if (sortField === 'handicap') {
      result = (Number(aVal) || 0) - (Number(bVal) || 0);
    } else {
      const aStr = String(aVal ?? '').toLowerCase();
      const bStr = String(bVal ?? '').toLowerCase();
      result = aStr.localeCompare(bStr);
    }
    return sortDirection === 'asc' ? result : -result;
  });
}

function updateCountSummary() {
  const total = allPlayers.length;
  const highCount = allPlayers.filter(p => String(p.high_low).toLowerCase() === 'high').length;
  const lowCount = allPlayers.filter(p => String(p.high_low).toLowerCase() === 'low').length;
  countSummary.textContent = `Total: ${total} players | High: ${highCount} | Low: ${lowCount}`;
}

function renderTable() {
  const cutoff = parseFloat(cutoffInput.value);
  const filtered = isNaN(cutoff)
    ? allPlayers
    : allPlayers.filter(p => parseFloat(p.handicap) <= cutoff);

  const sorted = sortPlayers(filtered);
  const start = currentPage * pageSize;
  const end = start + pageSize;
  const pagePlayers = sorted.slice(start, end);

  if (pagePlayers.length === 0) {
    playersBody.innerHTML = '<tr><td colspan="6" class="muted">No players found</td></tr>';
    pageInfo.textContent = '';
    return;
  }

  playersBody.innerHTML = pagePlayers.map((p, i) => `
    <tr class="${getRowClass(p.high_low)}">
      <td>${start + i + 1}</td>
      <td>${escapeHtml(p.name)}</td>
      <td>${escapeHtml(p.handicap)}</td>
      <td>${escapeHtml(p.hhc)}</td>
      <td>${escapeHtml(p.thc)}</td>
      <td>${escapeHtml(p.high_low)}</td>
    </tr>
  `).join('');

  const totalPages = Math.ceil(filtered.length / pageSize);
  pageInfo.textContent = `Page ${currentPage + 1} of ${totalPages}`;
}

// Event listeners
for (const field in sortButtons) {
  sortButtons[field].addEventListener('click', () => {
    if (sortField === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortDirection = 'asc';
    }
    currentPage = 0;
    updateSortLabels();
    renderTable();
  });
}

prevPageBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    renderTable();
  }
});

nextPageBtn.addEventListener('click', () => {
  const cutoff = parseFloat(cutoffInput.value);
  const filtered = isNaN(cutoff)
    ? allPlayers
    : allPlayers.filter(p => parseFloat(p.handicap) <= cutoff);
  const maxPage = Math.floor(filtered.length / pageSize);
  if (currentPage < maxPage) {
    currentPage++;
    renderTable();
  }
});

renderBtn.addEventListener('click', () => {
  currentPage = 0;
  renderTable();
});

// Supabase fetch
async function fetchPlayers() {
  const { data, error } = await supabase
    .from('players')
    .select('first, last, name, handicap, hhc, thc, high_low');

  if (error) {
    playersBody.innerHTML = `<tr><td colspan="6" class="muted">Error loading players: ${escapeHtml(error.message)}</td></tr>`;
    pageInfo.textContent = '';
    countSummary.textContent = '';
    return;
  }

  allPlayers = data || [];
  currentPage = 0;
  updateSortLabels();
  updateCountSummary();
  renderTable();
}

fetchPlayers();
setInterval(fetchPlayers, 30000); // Refresh every 30 seconds