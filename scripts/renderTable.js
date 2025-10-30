export function renderTable({
  data,
  containerSelector = '.table-wrapper',
  cutoffValue = null,
  cutoffKey = null,
  showRowNumbers = true
}) {
  if (!Array.isArray(data) || data.length === 0) return;

  const container = document.querySelector(containerSelector);
  if (!container) return;

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headers = showRowNumbers ? ['#', ...Object.keys(data[0])] : Object.keys(data[0]);
  const headerRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  data.forEach((row, index) => {
    const tr = document.createElement('tr');

    if (cutoffKey && row.hasOwnProperty(cutoffKey)) {
      const value = parseFloat(row[cutoffKey]);
      if (!isNaN(value) && !isNaN(cutoffValue)) {
        if (value < cutoffValue) tr.classList.add('row-low');
        else tr.classList.add('row-high');
      }
    }

    if (showRowNumbers) {
      const td = document.createElement('td');
      td.textContent = index + 1;
      tr.appendChild(td);
    }

    Object.keys(data[0]).forEach(key => {
      const td = document.createElement('td');
      td.textContent = row[key];
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  container.innerHTML = '';
  container.appendChild(table);
}