const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne', 'Parfum', 'Body Mist']
  },
  gender: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Unisex']
  },
  sizes: [{
    ml: Number,
    price: Number
  }],
  image: { type: String, required: true },
  images: [String],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false },
  notes: {
    top: [String],
    middle: [String],
    base: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
