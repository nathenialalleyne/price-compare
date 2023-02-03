import express from "express";
import puppeteer from "puppeteer";
import fs, { link } from "fs";
const app = express();

const linkData = async (link) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
  });

  const page = await browser.newPage();

  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);

  console.log("loading page");
  await page.goto(link, {
    waitUntil: "load",
    timeout: 0,
  });

  console.log("loaded");

  await page.waitForSelector("img");

  const test = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".sku-item"), (e) => {
      e.innerHTML;
    });
  });

  console.log(test);

  await page.close();
  await browser.close();

  return test;
};

app.get("/test", (req, res) => {
  res.json({
    test: "test",
    test2: "testsets",
  });
});

app.post("/page", async (req, res) => {
  console.log("recieved");
  const func = linkData(res);
  await func;
  req.send({
    info: func,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("running on port 5000");
});
