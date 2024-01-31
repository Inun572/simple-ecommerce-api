const { Router } = require('express');
const {
  getCart,
  addItem,
} = require('../controllers/cartController');

const router = Router();

router.get('/', getCart);
router.post('/', addItem);

module.exports = router;
