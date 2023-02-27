import express from "express";
import puppeteer from "puppeteer";
<<<<<<< HEAD
import bodyParser from "body-parser";
import fs, { link } from "fs";
const app = express();

const linkData = async (link) => {
  console.log(link);
=======
import { bhScrape, neweggScrape } from "./scrape.mjs";
const app = express();

const linkData = async (link) => {
  const obj = {
  }
>>>>>>> 8bbba4d816e3a6c79e27f52066dcbf177410abd9
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

app.post("/page", bodyParser.json(), async (req, res) => {
  try {
    const func = linkData(req.body.item);
    res.send(await JSON.stringify(func));
  } catch (err) {
    res.send("broke");
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("running on port 5000");
});
