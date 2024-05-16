const express = require("express");
const cors = require("cors");
const scrapeHackerNews = require("./scraper");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const { p } = req.query;
    const stories = await scrapeHackerNews(p);
    res.send(stories);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch Hacker News data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
