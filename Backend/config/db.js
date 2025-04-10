// config/db.js

const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);

    console.log(`OM Bhai  MongoDB connect hogya hai Successfully. and connection host is : ${conn.connection.host}`);
  } catch (error) {
    console.error(`OM Bhai MongoDB connection failed Hogya, error dekh aur try again : ${error.message}`);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;
