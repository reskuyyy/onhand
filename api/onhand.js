export default async function handler(req, res) {

  const { storeId, plus } = req.query;

  try {

    const plusArray = String(plus)
      .split(',')
      .map(x => x.trim())
      .filter(x => x);

    const debugData = [];

    for (const plu of plusArray) {

      const url =
        `https://app.alfastore.co.id/prd/api/cex/get_product_detail/?storeId=${storeId}&plu=${plu}`;

      const response = await fetch(url);

      const data = await response.json();

      debugData.push({
        plu,
        raw: data
      });

    }

    res.status(200).json(debugData);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
