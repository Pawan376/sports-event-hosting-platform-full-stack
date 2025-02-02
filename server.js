const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Add this line

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/tournaments', require('./routes/tournamentRoutes'));
app.use('/api/profile', require('./routes/profileRoutes')); 
app.use('/api/password', require('./routes/passwordRoutes'));


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
