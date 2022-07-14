const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(`An error here. (from dbConnection database/config.js)`, error);
    throw new Error('Error connecting to MongoDB');
  }
};

module.exports = { dbConnection };
