const express = require('express');
const router = express.Router();

// In-memory order store
const orders = [];

// POST /api/orders
router.post('/', (req, res) => {
  const order = {
    _id: `order_${Date.now()}`,
    ...req.body,
    status: 'Processing',
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  res.status(201).json(order);
});

// GET /api/orders
router.get('/', (req, res) => {
  res.json(orders);
});

// GET /api/orders/:id
router.get('/:id', (req, res) => {
  const order = orders.find(o => o._id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

module.exports = router;
