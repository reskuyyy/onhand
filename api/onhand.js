export default async function handler(req, res) {

  const { storeId, plus } = req.query;

  try {

    const plusArray = String(plus)
      .split(',')
      .map(x => x.trim())
      .filter(x => x);

    let allData = [];

    for (const plu of plusArray) {

      try {

        const url =
          `https://app.alfastore.co.id/prd/api/cex/get_product_detail/?storeId=${storeId}&plu=${plu}`;

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        // kalau response object langsung
        const item = data.data || data;

        if (item) {

          allData.push({
            barcode: item.barcode || '-',
            plu: item.plu || plu,
            nama: item.descp || item.nama || '-',
            on_hand: item.onhand || item.on_hand || 0
          });

        }

      } catch (e) {

        console.log('gagal:', plu);

      }

    }

    res.status(200).json({
      status: true,
      data: allData
    });

  } catch (err) {

    res.status(500).json({
      status: false,
      message: err.message
    });

  }

}
