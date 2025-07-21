require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth',     require('./src/routes/authRoutes'));
app.use('/api/users',    require('./src/routes/userRoutes'));
app.use('/api/projects', require('./src/routes/projectRoutes'));
app.use('/api/tasks',    require('./src/routes/taskRoutes'));

// 404 handler
app.use((req, res) => res.status(404).json({ msg: 'Route not found' }));

// Global error handler
app.use(require('./src/middleware/errorMiddleware'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
