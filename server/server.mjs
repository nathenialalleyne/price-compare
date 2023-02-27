import express from "express";
import puppeteer from "puppeteer";
import { bhScrape, neweggScrape } from "./scrape.mjs";
const app = express();

const linkData = async (link) => {
  const obj = {
  }
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ['--no-sandbox']
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

  await page.waitForSelector(".a-offscreen");

  const price = await page.evaluate(() => {
    return document.querySelector('.a-offscreen').innerHTML
  });

  obj.aPrice = price

  const name = await page.evaluate(() => {
    return document.querySelector('#productTitle').innerHTML
  });

  obj.name = name
  
  await page.close();
  await browser.close();

  console.log(obj)

  return obj;
};

const obj = await linkData("https://www.amazon.com/dp/B0BQ921V81?ref_=cm_sw_r_cp_ud_dp_ZP396QM76R8V7R8C1BBR");
const newegg = await neweggScrape("https://newegg.com/p/pl?d="+obj.name.replaceAll(" ", "+"))
const bh = await bhScrape("https://www.bhphotovideo.com/c/search?q="+obj.name.replaceAll(" ", "+"))

let prices = {
  amazon: obj.aPrice,
  newegg: newegg,
  bhphoto: bh
}

app.get("/test", (req, res) => {
  res.json({
    results: prices
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
