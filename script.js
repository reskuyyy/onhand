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

  const rawInput = document
  .getElementById('pluInput')
  .value;

const plus = rawInput
  .split(/[\n,]+/)
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

      const cleanPlus = encodeURIComponent(
  batch.join(',')
);

const res = await fetch(
  `/api/onhand?storeId=${store}&plus=${cleanPlus}`
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
function setPLU(data){

  document.getElementById('pluInput').value = data;

}
const PLU_979 = [
  1595,5330,5867,113079,118898,120333,120766,120767,
  192730,196009,230169,230170,244111,400552,401181,
  401698,406643,413095,414212,414633,415196,417804,
  417805,421454,421456,423992,425651,432393,435578,
  435736,440715,441258,443194,443704,445037,465695,
  465771,990055
];

document
  .getElementById('btn979')
  .addEventListener('click', () => {

    document.getElementById('pluInput').value =
      PLU_979.join(',');

});
