const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 3000;

async function scrapeHackerNews(page = 1) {
  const url = "https://news.ycombinator.com/?p=" + page;
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);
  const stories = [];

  $("tr.athing").each((index, element) => {
    const id = $(element).attr("id");
    const title = $(element).find(".titleline > a").text();
    const link = $(element).find(".titleline > a").attr("href");
    const points = $(element)
      .next()
      .find(".score")
      .text()
      .replace("points", "");
    let comments = $(element)
      .next()
      .find('a[href^="item"]')
      .last()
      .text()
      .replace("comments", "")
      .replace("comment", "")
      .replace("&nbsp;", "");

    if (comments === "discuss") {
      comments = "0";
    }

    stories.push({ id, title, link, points, comments });
  });

  return stories;
}

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
