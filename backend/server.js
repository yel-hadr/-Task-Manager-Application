const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/utils/connectDB');
const redisClient = require('./src/utils/redis');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
(async() => {
  await  connectDB()
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }

})()
// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API!');
});
const authRoutes = require('./src/routes/authRoutes')

app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
