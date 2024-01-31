const Product = require('../services/productServices.js');

const productController = {
  getProducts: async (req, res) => {
    try {
      if (req.query.id) {
        let productIds;
        if (!Array.isArray(req.query.id)) {
          productIds = [Number(req.query.id)];
        } else {
          productIds = req.query.id
            .map(Number)
            .filter((id) => !isNaN(id));
        }
        const products = await Product.findMany(productIds);

        return res.json({
          message: 'success',
          data:
            products.length === 1 ? products[0] : products,
        });
      }

      const products = await Product.find();

      res.json({
        message: 'success',
        data: products,
      });
    } catch (err) {}
  },
};
