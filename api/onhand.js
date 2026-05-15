export default async function handler(req, res) {

  const { storeId, plus } = req.query;

  try {

    // endpoint yang sebelumnya WORK
    const url =
      `https://app.alfastore.co.id/prd/api/cex/item_by_rak/?storeId=${storeId}&rack=AU1`;

    const response = await fetch(url);

    const data = await response.json();

    // filter berdasarkan PLU
    const plusArray = String(plus)
      .split(',')
      .map(x => x.trim());

    let filtered = [];

    if (Array.isArray(data)) {

      filtered = data
        .filter(item =>
          plusArray.includes(String(item.plu))
        )
        .map(item => ({
          barcode: item.barcode || '-',
          plu: item.plu || '-',
          nama: item.descp || '-',
          on_hand: item.onhand || 0
        }));

    }

    res.status(200).json({
      status: true,
      data: filtered
    });

  } catch (err) {

    res.status(500).json({
      status: false,
      message: err.message
    });

  }

}
