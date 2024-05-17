import { NextRequest, NextResponse } from "next/server";

import cheerio from "cheerio";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const p = Number(req.nextUrl.searchParams.get("p")) || 1;
    const stories = await scrapeHackerNews(p);
    return NextResponse.json({ stories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Hacker News data" }, { status: 500 });
  }
}

type Story = {
  id: string;
  title: string;
  link: string;
  points: string;
  comments: string;
};

async function scrapeHackerNews(page = 1): Promise<Story[]> {
  const url = "https://news.ycombinator.com/?p=" + page;
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);
  const stories: Story[] = [];

  $("tr.athing").each((index, element) => {
    const id = $(element).attr("id") || "";
    const title = $(element).find(".titleline > a").text();
    const link = $(element).find(".titleline > a").attr("href") || "";
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
