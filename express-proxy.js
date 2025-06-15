import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // 모든 도메인 허용 (개발용)

app.get("/api/stats", async (req, res) => {
  try {
    const queryString = new URLSearchParams(req.query).toString();
    const response = await fetch(
      `https://www.balldontlie.io/api/v1/stats?${queryString}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "서버 에러" });
  }
});

app.listen(3001, () =>
  console.log("Proxy server running on http://localhost:3001")
);
