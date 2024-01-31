const Product = require('../services/productServices.js');

const productController = {
  getProducts: async (req, res) => {
    try {
      if (req.query.id) {
        console.log(req.query.id);
        let productIds;
        if (!Array.isArray(req.query.id)) {
          productIds = [Number(req.query.id)];
        } else {
          productIds = req.query.id
            .map(Number)
            .filter((id) => !isNaN(id));
        }
        const products = await Product.findMany(productIds);
        console.log(products);
        return res.json({
          message: 'success',
          data:
            products.length === 1 ? products[0] : products,
        });
      }

      const products = await Product.get();

      res.json({
        message: 'success',
        data: products,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
  getProductById: async (req, res) => {
    try {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
        return res.status(400).json({
          message: 'Invalid Product ID',
        });
      }

      const data = await Product.find(productId);

      if (!data) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }

      res.json({
        message: 'success',
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  },
};

module.exports = {
  getProducts: productController.getProducts,
  getProductsById: productController.getProductById,
};
