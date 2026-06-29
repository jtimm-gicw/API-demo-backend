'use strict';

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
      notes: req.body.notes
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


/*
  DELETE /favorites/:id
  Removes a favorite city from MongoDB
*/
router.delete('/:id', async (req, res) => {
  try {
    const deletedFavorite = await FavoriteCity.findByIdAndDelete(req.params.id);

    // If nothing was found to delete
    if (!deletedFavorite) {
      return res.status(404).send("Favorite not found");
    }

    res.send({
      message: "Favorite deleted successfully",
      deletedFavorite
    });

  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
export default router;