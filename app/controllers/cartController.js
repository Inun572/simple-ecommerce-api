const { get } = require('../services/cartServices.js');

const cartController = {
  getCart: async (req, res) => {
    try {
      const data = await get();

      res.json({
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server errror',
        error: err,
      });
    }
  },
};

module.exports = {
  getCart: cartController.getCart,
};
