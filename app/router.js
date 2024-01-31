const { Router } = require('express');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');

const router = Router();

router.use('/products', productRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
