import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectdb from './database/db.js';
import userRoutes from './router/userrouter.js';
import songRouter from './router/songRouter.js';
import cloudinary from 'cloudinary';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

const app = express();
const Port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/song', songRouter);

// Serve frontend (Vite + React build)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Must be regex in Express v5
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});



// Start server and connect DB
app.listen(Port, async () => {
  console.log(` Server is running on port ${Port}`);
  await connectdb(); // Mongo connected
});
