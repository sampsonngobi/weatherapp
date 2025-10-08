import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Serve frontend files from /public
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Endpoint for weather data
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();

    if (response.status === 404) {
      return res.status(404).json({ error: "City not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
