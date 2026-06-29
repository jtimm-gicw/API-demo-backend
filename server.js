'use strict';

console.log("🚨 SERVER FILE IS RUNNING");

// ======================================
// Imports
// ======================================
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import weatherRoutes from './routes/weather.js';
import favoriteRoutes from './routes/favorites.js';

/*
Express = server framework
MongoDB = database
Mongoose = connector between Node and MongoDB
*/

// Import model (optional for direct use, but NOT required in server.js)
import FavoriteCity from './models/favoriteCity.js';

// Load environment variables
dotenv.config();

// ======================================
// Connect MongoDB
// ======================================
console.log("MONGO URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// ======================================
// Create Server
// ======================================
const app = express();
const PORT = process.env.PORT || 3001;

// ======================================
// Middleware
// ======================================

// Allow React frontend to connect
app.use(cors());

// STEP 1: Parse incoming JSON requests
// REQUIRED for POST & PUT requests from React
app.use(express.json());

// DEBUG MIDDLEWARE (teaching tool)
app.use((req, res, next) => {
  console.log("📡 REQUEST RECEIVED:", req.method, req.url);
  next();
});

/*
Why express.json() is needed:

| Request Type        | Needs express.json()? |
|---------------------|----------------------|
| GET (query params)  | ❌ No                |
| POST (JSON body)    | ✅ Yes               |
| PUT/PATCH           | ✅ Yes               |
*/

// ======================================
// Home Route
// ======================================
app.get('/', (req, res) => {
  res.send('Weather Image API Running');
});

// ======================================
// ROUTES
// ======================================

/*
Weather routes handled in:
  routes/weather.js
*/
app.use('/weather', weatherRoutes);

/*
Favorites routes handled in:
  routes/favorites.js
*/
app.use('/favorites', favoriteRoutes);

// ======================================
// DEBUG ROUTE (optional)
// ======================================
app.get('/debug', (req, res) => {
  res.send('server works');
});

// ======================================
// START SERVER
// ======================================

/*
server.js responsibilities:

✔ setup express
✔ connect database
✔ register routes
✔ start server

🚫 NO business logic should live here
✔ ALL CRUD lives in /routes/favorites.js
*/

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});