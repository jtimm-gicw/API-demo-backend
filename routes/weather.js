import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  console.log("🔥 WEATHER ROUTE HIT");

  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required." });
  }

  try {
    // 1. Fetch live data from OpenWeather API
    const weatherApiKey = process.env.OPENWEATHER_API_KEY; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${weatherApiKey}`;
    
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    // Handle bad api responses (e.g., city not found)
    if (!weatherResponse.ok) {
      return res.status(weatherResponse.status).json({ error: weatherData.message || "City not found." });
    }

    // Extract useful fields from OpenWeather payload
    const temperature = Math.round(weatherData.main.temp);
    const humidity = weatherData.main.humidity;
    const description = weatherData.weather[0].description;
    const weatherMainCondition = weatherData.weather[0].main; // e.g., 'Rain', 'Clouds', 'Clear'

    // ==========================================
    // 2. Fetch context-specific image from Unsplash API
    // ==========================================
    const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
    
    // FIX INTEGRATION:
    // We combine the condition and city name, and add a unique millisecond timestamp parameter (&sig=) 
    // to bypass internal node/browser image caching pipelines.
    const searchKeyword = `${weatherMainCondition} ${city}`;
    const uniqueSig = Date.now();
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(searchKeyword)}&client_id=${unsplashAccessKey}&sig=${uniqueSig}`;
    
    let imageUrl = "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b"; // Standard generic weather fallback image

    try {
      const imgResponse = await fetch(unsplashUrl);
      if (imgResponse.ok) {
        const imgData = await imgResponse.json();
        imageUrl = imgData.urls.regular; // Extract the raw high-resolution dynamic URL string
      } else {
        // Log the exact response error code if Unsplash rejects the request
        console.log(`⚠️ Unsplash returned status code: ${imgResponse.status} (Likely out of API requests for the hour)`);
      }
    } catch (imgErr) {
      console.log("❌ Unsplash Network Fetch Failed entirely:", imgErr.message);
    }

    // 3. Assemble and return the combined payload back to React
    return res.json({
      city: weatherData.name,
      temperature,
      description,
      humidity,
      image: imageUrl
    });

  } catch (error) {
    console.error("❌ Aggregator route error:", error);
    return res.status(500).json({ error: "Server error aggregating API data streams." });
  }
});
 
export default router;