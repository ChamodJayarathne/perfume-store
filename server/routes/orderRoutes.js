const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrder, createPaymentIntent } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', protect, createPaymentIntent);
router.route('/').post(protect, createOrder).get(protect, getMyOrders);
router.route('/:id').get(protect, getOrder);

module.exports = router;
