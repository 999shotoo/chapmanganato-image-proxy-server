// api/chapmanganato-img.js
const express = require("express");
const axios = require("axios");

const app = express();

app.get("/api/chapmanganato-img", async (req, res) => {
  const { url } = req.query; // Get the URL from the query parameters

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Referer: "https://chapmanganato.to/",
        "User -Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
      },
      responseType: "arraybuffer", // To handle binary data
    });

    // Set the content type and send the response
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader("Cache-Control", "max-age=31536000"); // Cache for 1 year
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch the image" });
  }
});

// Export the app as a serverless function
module.exports = app;
