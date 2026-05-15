const tableBody = document.getElementById('tableBody');
  info.innerHTML = '<span class="loading">Loading data...</span>';
  tableBody.innerHTML = '';

  try {
   const apiUrl = `/api/data?storeId=${storeId}&rack=${rack}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Gagal mengambil data');
    }

    const data = await response.json();

    originalData = Array.isArray(data) ? data : [];

    renderTable(originalData);

    info.innerHTML = `Total Data: ${originalData.length}`;

  } catch (error) {
    console.error(error);
    info.innerHTML = `<span class="error">${error.message}</span>`;
  }
}

function renderTable(data) {
  tableBody.innerHTML = '';

  if (!data.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="3">Tidak ada data</td>
      </tr>
    `;
    return;
  }

  data.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.barcode || '-'}</td>
      <td>${item.plu || '-'}</td>
      <td>${item.onhand || 0}</td>
    `;

    tableBody.appendChild(row);
  });
}

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase().trim();

  const filtered = originalData.filter(item => {
    const barcode = String(item.barcode || '').toLowerCase();
    const plu = String(item.plu || '').toLowerCase();

    return barcode.includes(keyword) || plu.includes(keyword);
  });

  renderTable(filtered);

  info.innerHTML = `Hasil Filter: ${filtered.length}`;
});

loadBtn.addEventListener('click', loadData);

loadData();
