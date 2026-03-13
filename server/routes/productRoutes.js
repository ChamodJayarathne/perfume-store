const express = require('express');
const router = express.Router();
const { getProducts, getProduct, getFeaturedProducts, createProduct, getBrands } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/featured', getFeaturedProducts);
router.get('/brands', getBrands);
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProduct);

module.exports = router;
