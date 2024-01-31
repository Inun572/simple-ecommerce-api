const Cart = require('../services/cartServices.js');

const cartController = {
  getCart: async (req, res) => {
    try {
      const data = await Cart.get();

      res.json({
        message: 'success',
        data,
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
};

module.exports = {
  getCart: cartController.getCart,
};
