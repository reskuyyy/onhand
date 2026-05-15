const cekBtn = document.getElementById('cekBtn');
const tableBody = document.getElementById('tableBody');
const info = document.getElementById('info');
const searchInput = document.getElementById('searchInput');

let originalData = [];

async function cekOnhand() {

  const store = document
    .getElementById('storeInput')
    .value
    .trim()
    .toUpperCase();

  const plus = document
    .getElementById('pluInput')
    .value
    .replace(/\n/g, ',')
    .split(',')
    .map(x => x.trim())
    .filter(x => x);

  if (!store) {
    alert('Store ID wajib diisi');
    return;
  }

  if (!plus.length) {
    alert('PLU wajib diisi');
    return;
  }

  info.innerHTML = 'Loading...';
  tableBody.innerHTML = '';

  try {

    const BATCH_SIZE = 40;

    let allData = [];

    for (let i = 0; i < plus.length; i += BATCH_SIZE) {

      const batch = plus.slice(i, i + BATCH_SIZE);

      const res = await fetch(
        `/api/onhand?storeId=${store}&plus=${batch.join(',')}`
      );

      const result = await res.json();

      if (result.data) {
        allData = allData.concat(result.data);
      }

    }

    originalData = allData;

    renderTable(originalData);

    info.innerHTML =
      `Total Data: ${originalData.length}`;

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
        <td colspan="4">
          Tidak ada data
        </td>
      </tr>
    `;

    return;
  }

  data.forEach(item => {

    const row = document.createElement('tr');

    const badgeClass =
      Number(item.on_hand) > 0
        ? 'badge badge-good'
        : 'badge badge-empty';

    row.innerHTML = `
      <td>${item.barcode}</td>
      <td>${item.plu}</td>
      <td>${item.nama}</td>
      <td>
        <span class="${badgeClass}">
          ${item.on_hand}
        </span>
      </td>
    `;

    tableBody.appendChild(row);

  });

}

searchInput.addEventListener('input', () => {

  const keyword =
    searchInput.value.toLowerCase();

  const filtered = originalData.filter(item => {

    return (
      String(item.plu)
        .toLowerCase()
        .includes(keyword)

      ||

      String(item.nama)
        .toLowerCase()
        .includes(keyword)
    );

  });

  renderTable(filtered);

});

cekBtn.addEventListener('click', cekOnhand);
