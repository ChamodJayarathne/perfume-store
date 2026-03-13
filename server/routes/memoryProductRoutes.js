const express = require('express');
const router = express.Router();
const products = require('../data/products');

// Add IDs to products for frontend compatibility
const productsWithIds = products.map((p, i) => ({
  ...p,
  _id: `prod_${String(i + 1).padStart(3, '0')}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

// GET /api/products/featured
router.get('/featured', (req, res) => {
  const featured = productsWithIds.filter(p => p.featured);
  res.json(featured);
});

// GET /api/products/brands
router.get('/brands', (req, res) => {
  const brands = [...new Set(productsWithIds.map(p => p.brand))];
  res.json(brands);
});

// GET /api/products
router.get('/', (req, res) => {
  const { category, brand, gender, minPrice, maxPrice, search, featured, sort } = req.query;
  let result = [...productsWithIds];

  if (category) result = result.filter(p => p.category === category);
  if (brand) result = result.filter(p => p.brand.toLowerCase().includes(brand.toLowerCase()));
  if (gender) result = result.filter(p => p.gender === gender);
  if (featured) result = result.filter(p => p.featured === (featured === 'true'));
  if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.brand.toLowerCase().includes(s) ||
      p.description.toLowerCase().includes(s)
    );
  }

  if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  else if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

  res.json(result);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = productsWithIds.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;
