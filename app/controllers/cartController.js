const Cart = require('../services/cartServices.js');
const Product = require('../services/productServices.js');

const cartController = {
  getCart: async (req, res) => {
    try {
      const data = await Cart.get();
      const totalItems = data.length;
      const totalPrice = Number(
        data
          .reduce((total, item) => total + item.total, 0)
          .toFixed(2)
      );
      res.json({
        message: 'success',
        data: {
          totalItems,
          totalPrice,
          items: data,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Internal server errror',
      });
    }
  },

  getCartById: async (req, res) => {
    try {
      const cartId = Number(req.params.id);

      if (isNaN(cartId)) {
        return res.status(400).json({
          message: 'Invalid Cart ID',
        });
      }

      const data = await Cart.find(cartId);
      res.json({
        message: 'success',
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },

  addItem: async (req, res) => {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({
          message: 'Product ID and quantity are required',
        });
      }

      if (
        typeof productId !== 'number' ||
        typeof quantity !== 'number'
      ) {
        return res.status(400).json({
          message:
            'Product ID and quantity must be numbers',
        });
      }

      const isExist = await Product.find(productId);
      if (!isExist) {
        return res.status(400).json({
          message: 'Product not found',
        });
      }

      if (isExist.in_stock === false) {
        return res.status(400).json({
          message: 'Product out of stock',
        });
      }
      const isInCart = await Cart.find(productId);
      if (isInCart) {
        const newQuantity = isInCart.quantity + quantity;
        const newTotal = newQuantity * isExist.price;

        const data = await Cart.store({
          productId,
          newQuantity,
          newTotal,
        });
        return res.json({
          message: 'success add to cart',
          data,
        });
      }
      const total = quantity * isExist.price;
      const data = await Cart.store({
        productId,
        quantity,
        total,
      });

      res.json({
        message: 'success add to cart',
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  },
};

module.exports = {
  getCart: cartController.getCart,
  getCartById: cartController.getCartById,
  addItem: cartController.addItem,
};
