const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.get("/api/v1/players", async (req, res) => {
  const search = req.query.search || "";
  const targetUrl = `https://www.balldontlie.io/api/v1/players?search=${encodeURIComponent(
    search
  )}`;

  try {
    const { data } = await axios.get(targetUrl);
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res
      .status(500)
      .json({ error: "Proxy request failed", details: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Proxy on http://localhost:${PORT}`));
