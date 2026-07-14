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

// Turn the schema into a model and export it
const FavoriteCity = mongoose.model(
  'FavoriteCity',
  favoriteCitySchema
);


export default FavoriteCity;