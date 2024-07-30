const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3101;
const API_KEY = "0672c1bccd4a8e37980a99bbac698365a7b61775";
const API_URL = "https://www.giantbomb.com/api";

// Configure CORS
app.use(cors());

// Define a GET endpoint that requests data from a third-party API
app.get("/api/game/:guid", async (req, res) => {
  try {
    const guid = req.params.guid;
    const response = await axios.get(`${API_URL}/game/${guid}/?api_key=${API_KEY}&format=json`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
