import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  console.log("🔥 WEATHER ROUTE HIT");

  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City required" });
  }

  return res.json({
    city,
    temperature: 72,
    description: "working"
  });
});

export default router;