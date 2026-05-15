export default async function handler(req, res) {

  const { storeId, plus } = req.query;

  try {

   const plusArray = String(plus)
  .split(',')
  .map(x => x.trim())
  .filter(x => x);
    for (const plu of plusArray) {

      try {

        const url =
          `https://app.alfastore.co.id/prd/api/cex/get_product_detail/?storeId=${storeId}&plu=${plu}`;

        const response = await fetch(url);

        const data = await response.json();

        // response array
        if (Array.isArray(data) && data.length > 0) {

          const item = data[0];

          allData.push({
            barcode: item.barcode || '-',
            plu: item.plu || '-',
            nama: item.descp || '-',
            on_hand: item.onhand || 0
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
