const express = require('express');
const router = express.Router();

// In-memory cart store (keyed by simple user token)
const carts = {};

const getUserId = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  return token || 'guest';
};

// GET /api/cart
router.get('/', (req, res) => {
  const userId = getUserId(req);
  res.json({ items: carts[userId] || [] });
});

// POST /api/cart
router.post('/', (req, res) => {
  const userId = getUserId(req);
  const { productId, quantity, size } = req.body;

  if (!carts[userId]) carts[userId] = [];

  const existing = carts[userId].find(i => i.product === productId && i.size === size);
  if (existing) {
    existing.quantity += quantity || 1;
  } else {
    carts[userId].push({
      _id: `item_${Date.now()}`,
      product: productId,
      quantity: quantity || 1,
      size,
    });
  }

  res.json({ items: carts[userId] });
});

// DELETE /api/cart
router.delete('/', (req, res) => {
  const userId = getUserId(req);
  carts[userId] = [];
  res.json({ message: 'Cart cleared' });
});

// DELETE /api/cart/:itemId
router.delete('/:itemId', (req, res) => {
  const userId = getUserId(req);
  if (carts[userId]) {
    carts[userId] = carts[userId].filter(i => i._id !== req.params.itemId);
  }
  res.json({ items: carts[userId] || [] });
});

module.exports = router;
