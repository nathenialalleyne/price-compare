import puppeteer from "puppeteer";

export const neweggScrape = async (link, site) => {
  console.log(link)
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
  
    await page.screenshot({path: "screenshot.png"})

    console.log("loaded");
  
    await page.waitForSelector(".item-title");

    const change = await page.evaluate(()=>{
      console.log('going to ' + document.querySelector('.item-title').href)
      console.log('test')
      return document.querySelector('.item-title').href
    })

    await page.goto(change, {
      waitUntil: "load",
      timeout: 0,
    })

    console.log('loaded 2')

    await page.waitForSelector('h1')

    let price = ''
    
    const getPrice = await page.evaluate(() => {
      const big = document.querySelector('.product-title').innerHTML
      return big

    });

    console.log(getPrice)
    
    await page.close();
    await browser.close();

  
    return price;
  };