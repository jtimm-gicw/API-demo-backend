import mongoose from 'mongoose';

// Create a schema for favorite cities

const favoriteCitySchema = new mongoose.Schema({

  city: {
    type: String,
    required: true
  },

  temperature: {
    type: Number
  },

  description: {
    type: String
  },

  notes: {
    type: String
  },

  dateSaved: {
    type: Date,
    default: Date.now
  }

});


const FavoriteCity = mongoose.model(
  'FavoriteCity',
  favoriteCitySchema
);


export default FavoriteCity;