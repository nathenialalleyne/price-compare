import express from "express";
import bodyParser from "body-parser";
import puppeteer from "puppeteer";
import fs from 'fs'
const app = express();


const linkData = (async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox", "--disable-gpu"],
  });


  const page = await browser.newPage();

  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
  await page.setUserAgent(userAgent);

  console.log('loading page')
  await page.goto("https://www.bestbuy.com/site/searchpage.jsp?st=cpu", {
    waitUntil: "domcontentloaded",
    timeout: 0
  });

  console.log('loaded')

  if (await page.screenshot({path: './screenshot.png'})){
    console.log('screenshotted')
  }



  await page.waitForSelector('.item-count')

  const html = await page.evaluate(() => {
    return document.querySelector(".item-count").innerHTML
    });


  await page.close();
  await browser.close();
  console.log(html)
})();

app.get("/test", (req, res) => {
  res.json({
    test: "test",
    test2: "testsets",
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("running on port 5000");
});
