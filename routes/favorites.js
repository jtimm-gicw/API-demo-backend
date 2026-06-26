// ======================================
// Favorites Routes
// ======================================
console.log('🔥 FAVORITES ROUTER LOADED');

import express from 'express';
import FavoriteCity from '../models/favoriteCity.js';

const router = express.Router();

/*
  POST /favorites
  Saves a city to MongoDB
*/
router.post('/', async (req, res) => {
  try {
    const favorite = await FavoriteCity.create({
      city: req.body.city,
      temperature: req.body.temperature,
      description: req.body.description
    });

    res.status(201).send(favorite);

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

/*
  GET /favorites
  Returns all saved favorite cities
*/
router.get('/', async (req, res) => {
  try {
    const favorites = await FavoriteCity.find();
    res.send(favorites);

  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;