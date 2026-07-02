import mongoose from "mongoose";

// Schema for favorite cities stored in MongoDB
const favoriteCitySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },

  temperature: {
    type: Number,
    default: null,
  },

  description: {
    type: String,
    default: "",
  },

  // User's personal notes about the city
  notes: {
    type: String,
    default: "",
  },

  // Automatically stores the date the favorite was saved
  dateSaved: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const FavoriteCity = mongoose.model("FavoriteCity", favoriteCitySchema);

export default FavoriteCity;