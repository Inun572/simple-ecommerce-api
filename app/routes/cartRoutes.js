const { Router } = require('express');
const {
  getCart,
  addItem,
  emptyCart,
} = require('../controllers/cartController');

const router = Router();

router.get('/', getCart);
router.post('/', addItem);
router.delete('/', emptyCart);

module.exports = router;
