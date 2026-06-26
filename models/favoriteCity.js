import mongoose from 'mongoose';
// Crete a schema for favorite cities. Import mongoose here as well

const favoriteCitySchema = new mongoose.Schema({

  city: String,

  temperature: Number,

  description: String,

  dateSaved: {
    type: Date,
    default: Date.now
  }

});

const FavoriteCity =
  mongoose.model('FavoriteCity', favoriteCitySchema);

export default FavoriteCity;