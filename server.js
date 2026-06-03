'use strict';

// ======================================
// Imports
// ======================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Load variables from .env
dotenv.config();

// ======================================
// Create Server
// ======================================

const app = express();
const PORT = process.env.PORT || 3001;

// Allow React frontend to connect
app.use(cors());

// ======================================
// Home Route
// ======================================

app.get('/', (request, response) => {
  response.send('Weather Image API Running');
});

// ======================================
// Weather Route
// ======================================

app.get('/weather', async (request, response) => {

  try {

    // Get city from query string
    const { city } = request.query;

    // Validate city
    if (!city) {
      return response.status(400).send({
        error: 'Please provide a city name.'
      });
    }

    // ==================================
    // OpenWeather API Request
    // ==================================

    const weatherUrl =
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;

    const weatherResponse =
      await axios.get(weatherUrl);

    const weatherData =
      weatherResponse.data;

    // Extract weather values
    const temperature =
      weatherData.main.temp;

    const humidity =
      weatherData.main.humidity;

    const description =
      weatherData.weather[0].description;

    // ==================================
    // Unsplash API Request
    // ==================================

    const imageUrl =
      `https://api.unsplash.com/search/photos?page=1&query=${description}&client_id=${process.env.UNSPLASH_API_KEY}`;

    const imageResponse =
      await axios.get(imageUrl);

    const image =
      imageResponse.data.results[0]?.urls?.regular;

    // ==================================
    // Build Response Object
    // ==================================

    const result = {
      city,
      temperature,
      humidity,
      description,
      image
    };

    response.send(result);

  } catch (error) {

    console.error(error.message);

    response.status(500).send({
      error: 'Unable to retrieve weather data.'
    });

  }

});

// ======================================
// Start Server
// ======================================

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});