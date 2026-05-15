export default async function handler(req, res) {

  const { storeId } = req.query;

  try {

    // API tanpa rack
    const url =
      `https://app.alfastore.co.id/prd/api/cex/item_by_rak/?storeId=${storeId}`;

    const response = await fetch(url);

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
}
