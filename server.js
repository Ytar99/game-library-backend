const dotenv = require("dotenv");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

const dotenvConfig = dotenv.config();
const { API_KEY, API_URL, PORT } = dotenvConfig.parsed;

// Configure CORS
app.use(cors());

// Define a GET endpoint that requests data from a third-party API
app.get("/api/game/:guid", async (req, res) => {
  try {
    console.log(`Requesting data for game ${req.params.guid} from client ${req.ip}`);
    const guid = req.params.guid;
    const response = await axios.get(`${API_URL}/game/${guid}/?api_key=${API_KEY}&format=json`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT || 3101, () => {
  console.log(`Server is running on port ${PORT || 3101}`);
});
