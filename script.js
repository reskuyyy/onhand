const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const loadBtn = document.getElementById('loadBtn');
const info = document.getElementById('info');

let originalData = [];

async function loadData() {
  const storeId = document.getElementById('storeInput').value.trim();

  if (!storeId) {
    alert('Store ID wajib diisi');
    return;
  }

  info.innerHTML = 'Loading...';
  tableBody.innerHTML = '';

  try {

    // langsung ke proxy vercel
    const response = await fetch(`/api/data?storeId=${storeId}`);

    if (!response.ok) {
      throw new Error('Gagal ambil data');
    }

    const result = await response.json();

    console.log(result);

    // ambil array dari response
  const data = result || [];

    originalData = Array.isArray(data) ? data : [];

    renderTable(originalData);

    info.innerHTML = `Total Data: ${originalData.length}`;

  } catch (err) {
    console.error(err);
    info.innerHTML = err.message;
  }
}

function renderTable(data) {

  tableBody.innerHTML = '';

  if (!data.length) {

    tableBody.innerHTML = `
      <tr>
        <td colspan="4">Tidak ada data</td>
      </tr>
    `;

    return;
  }

  data.forEach(item => {

    const row = document.createElement('tr');

   row.innerHTML = `
  <td>${item.barcode || '-'}</td>
  <td>${item.plu || '-'}</td>
  <td>${item.descp || '-'}</td>
  <td>${item.onhand || 0}</td>
  <td>${item.rack || '-'}</td>
`;

    tableBody.appendChild(row);
  });
}

searchInput.addEventListener('input', () => {

  const keyword = searchInput.value.toLowerCase();

  const filtered = originalData.filter(item => {

    const barcode = String(item.barcode || '').toLowerCase();
    const plu = String(item.plu || '').toLowerCase();

    return (
      barcode.includes(keyword) ||
      plu.includes(keyword)
    );
  });

  renderTable(filtered);

  info.innerHTML = `Hasil: ${filtered.length}`;
});

loadBtn.addEventListener('click', loadData);

loadData();
