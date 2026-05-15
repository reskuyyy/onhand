export default async function handler(req, res) {

  const { storeId, plus } = req.query;

  try {

    const url =
      `https://app.alfastore.co.id/prd/api/mob/tablet/productinfo/CheckPerRack/?storeId=${storeId}&plu=${plus}`;

    const response = await fetch(url);

    const data = await response.json();

    const result = [];

    if (Array.isArray(data)) {

      data.forEach(item => {

        result.push({
          barcode: item.barcode || '-',
          plu: item.plu || '-',
          nama: item.descp || '-',
          on_hand: item.onhand || 0
        });

      });

    }

    res.status(200).json({
      status: true,
      data: result
    });

  } catch (err) {

    res.status(500).json({
      status: false,
      message: err.message
    });

  }

}
