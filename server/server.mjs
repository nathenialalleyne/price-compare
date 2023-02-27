import express from "express";
import puppeteer from "puppeteer";
import bodyParser from "body-parser";
import fs, { link } from "fs";
import {neweggScrape, bhScrape} from './scrape.mjs'

const app = express();
const linkData = async (link) => {
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

  const name = await page.evaluate(() => {
    return document.querySelector('#productTitle').innerHTML
  });

  
  await page.close();
  await browser.close();


  console.log('done ' + price + " " + name )
  return {price,name}
};

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/page", bodyParser.json() , async (req, res) => {
  try {
    console.log(req.body.items)
    const func = await linkData(req.body.items);
    const newegg = await neweggScrape("https://newegg.com/p/pl?d="+obj.name.replaceAll(" ", "+"))
    const bh = await bhScrape("https://www.bhphotovideo.com/c/search?q="+obj.name.replaceAll(" ", "+"))

    let prices = {
      amazon: obj.price,
      newegg: newegg,
      bhphoto: bh
    }

    res.send(prices);
  } catch (err) {
    res.send("broke");
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("running on port 5000");
});
