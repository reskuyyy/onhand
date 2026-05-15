export default async function handler(req, res) {

  const { storeId } = req.query;

  // daftar rack
  const racks = [
    'AU1',
    'AU2',
    'AU3',
    'AU4',
    'AU5',
    'AU6',
    'AU7',
    'AU8',
    'AU9',
    'AU10'
  ];

  try {

    const allData = [];

    for (const rack of racks) {

      try {

        const url =
          `https://app.alfastore.co.id/prd/api/cex/item_by_rak/?storeId=${storeId}&rack=${rack}`;

        const response = await fetch(url);

        const result = await response.json();

        const data = result.data || result || [];

        if (Array.isArray(data)) {

          data.forEach(item => {

            allData.push({
              barcode: item.barcode,
              plu: item.plu,
              descp: item.descp,
              onhand: item.onhand,
              rack: rack
            });

          });

        }

      } catch (e) {

        console.log('rack gagal:', rack);

      }

    }

    res.status(200).json(allData);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
