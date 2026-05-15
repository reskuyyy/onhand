export default async function handler(req, res) {
  const { storeId, rack } = req.query;

  try {
    const response = await fetch(
      `https://app.alfastore.co.id/prd/api/cex/item_by_rak/?storeId=${storeId}&rack=${rack}`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
