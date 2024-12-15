// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Replace with your Eliza API endpoint
const ELIZA_API_URL = 'https://ai16z.github.io/eliza/api/v1/converse';

app.post('/eliza', async (req, res) => {
  const { userInput } = req.body;

  try {
    // Send user input to Eliza API
    const response = await axios.post(ELIZA_API_URL, { message: userInput });

    // Return Eliza's response to the frontend
    res.json({ elizaResponse: response.data.reply });
  } catch (error) {
    console.error('Error connecting to Eliza:', error);
    res.status(500).json({ error: 'Failed to connect to Eliza API' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
