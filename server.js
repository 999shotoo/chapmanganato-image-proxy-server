const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.get("/api/chapmanganato", async (req, res) => {
  const { url } = req.query; // Get the URL from the query parameters

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Referer: "https://chapmanganato.to/",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
      },
      responseType: "arraybuffer", // To handle binary data
    });

    // Set the content type and send the response
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.setHeader("Cache-Control", "max-age=31536000"); // Cache for 1 year
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching image:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch the image", details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
