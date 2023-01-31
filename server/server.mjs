import express from "express";
import bodyParser from "body-parser";
import puppeteer from "puppeteer";
const app = express();
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
  });
  const page = await browser.newPage();
  await page.goto("https://www.bestbuy.com/");
  page.screenshot({ path: "screenshot.jpg" });
  await browser.close();
})();
app.get("/test", (req, res) => {
  res.json({
    test: "test",
    test2: "testsets",
  });
});
app.listen(5000, () => {
  console.log("running on port 5000");
});
