const mongoose = require('mongoose');

const connectDB = () => {
  return new Promise((resolve, reject) => {
    // Set a short connection timeout so we fail fast if MongoDB isn't running
    mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
    })
    .then(conn => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      resolve(conn);
    })
    .catch(error => {
      reject(error);
    });
  });
};

module.exports = connectDB;
