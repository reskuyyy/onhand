export default async function handler(req, res) {

  const { storeId } = req.query;

  try {

    // sementara hardcode rack dulu
    const rack = 'AU1';

    const url =
      `https://app.alfastore.co.id/prd/api/cex/item_by_rak/?storeId=${storeId}&rack=${rack}`;

    const response = await fetch(url);

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
}
