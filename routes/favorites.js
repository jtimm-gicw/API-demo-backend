// ======================================
// Favorites Routes
// ======================================
console.log('🔥 FAVORITES ROUTER LOADED');

import express from 'express';
import FavoriteCity from '../models/favoriteCity.js';

const router = express.Router();


// ======================================
// POST /favorites
// Saves a city to MongoDB
// ======================================

router.post('/', async (req, res) => {
  try {

    const favorite = await FavoriteCity.create({

      city: req.body.city,

      temperature: req.body.temperature,

      description: req.body.description,

      notes: req.body.notes

    });

    res.status(201).send(favorite);

  } catch (error) {

    console.log(error);
    res.status(500).send(error.message);

  }
});


// ======================================
// GET /favorites
// Returns all saved favorite cities
// ======================================

router.get('/', async (req, res) => {

  try {

    const favorites = await FavoriteCity.find();

    res.send(favorites);

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// ======================================
// PUT /favorites/:id
// Updates an existing favorite city
//
// Example:
// PUT /favorites/12345
//
// Updates the notes field
// ======================================

router.put('/:id', async (req, res) => {

  try {

    const updatedFavorite = await FavoriteCity.findByIdAndUpdate(

      req.params.id,

      {
        notes: req.body.notes
      },

      {
        new: true
      }

    );


    res.send(updatedFavorite);


  } catch (error) {

    console.log(error);

    res.status(500).send(error.message);

  }

});


// ======================================
// DELETE /favorites/:id
// Deletes a favorite city
//
// Example:
// DELETE /favorites/12345
//
// Uses the MongoDB document _id
// ======================================

router.delete('/:id', async (req, res) => {

  try {

    const deletedFavorite = await FavoriteCity.findByIdAndDelete(
      req.params.id
    );


    res.send(deletedFavorite);


  } catch (error) {

    console.log(error);

    res.status(500).send(error.message);

  }

});


export default router;