require('dotenv').config();
const express   = require('express');
const connectDB = require('./config/db');

// Route files
const authorRoutes   = require('./routes/authorRoutes');
const bookRoutes     = require('./routes/bookRoutes');
const studentRoutes  = require('./routes/studentRoutes');
const attendantRoutes = require('./routes/attendantRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Mount routers
app.use('/authors',    authorRoutes);
app.use('/books',      bookRoutes);
app.use('/students',   studentRoutes);
app.use('/attendants', attendantRoutes);

// Root health-check
app.get('/', (req, res) => {
  res.json({ message: 'School Library Management API is running 📚' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
