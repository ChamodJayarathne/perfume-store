const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Try MongoDB connection, fall back to in-memory mode
let dbMode = 'memory';

const startServer = async () => {
  try {
    const connectDB = require('./config/db');
    await connectDB();
    dbMode = 'mongodb';
    console.log('✓ Running with MongoDB');

    // Use database-backed routes
    app.use('/api/products', require('./routes/productRoutes'));
    app.use('/api/auth', require('./routes/authRoutes'));
    app.use('/api/cart', require('./routes/cartRoutes'));
    app.use('/api/orders', require('./routes/orderRoutes'));
  } catch (err) {
    console.log('⚠ MongoDB not available, running in memory mode');
    console.log('  Products will be served from seed data');

    // Use in-memory routes
    app.use('/api/products', require('./routes/memoryProductRoutes'));
    app.use('/api/auth', require('./routes/memoryAuthRoutes'));
    app.use('/api/cart', require('./routes/memoryCartRoutes'));
    app.use('/api/orders', require('./routes/memoryOrderRoutes'));
  }

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', mode: dbMode, message: 'Perfume Store API is running' });
  });

  // Error handling
  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT} (${dbMode} mode)`);
    console.log(`API: http://localhost:${PORT}/api/products\n`);
  });
};

startServer();
