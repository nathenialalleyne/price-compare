import express from "express";
import bodyParser from "body-parser";
import puppeteer from "puppeteer";
const app = express();
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.bestbuy.com/", {
    waitUntil: "networkidle2",
    timeout: 0,
  });

  const html = await page.evaluate(() => {
    Array.from(document.body.querySelectorAll("a"), (e) => {
      e.href;
    });
  });

  console.log(html);

  await browser.close();
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
