const fetch = require("node-fetch");
const cheerio = require("cheerio");

async function scrapeHackerNews() {
  const url = "https://news.ycombinator.com/";
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);
  const stories = [];

  $("tr.athing").each((index, element) => {
    const id = $(element).attr("id");
    const title = $(element).find(".titleline > a").text();
    const link = $(element).find(".titleline > a").attr("href");
    const points = $(element).next().find(".score").text().replace("points", "");
    const comments = $(element)
      .next()
      .find('a[href^="item"]')
      .last()
      .text()
      .replace("comments", "")
      .replace("comment", "")
      .replace("&nbsp;", "");

    stories.push({ id, title, link, points, comments });
  });

  return stories;
}

module.exports = scrapeHackerNews;
