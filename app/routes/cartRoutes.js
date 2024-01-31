const { Router } = require('express');
const {
  getCart,
} = require('../controllers/cartController');

const router = Router();

router.get('/', getCart);

module.exports = router;
