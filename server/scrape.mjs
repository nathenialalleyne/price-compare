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
      return document.querySelector('.item-button-area > button')
    })

    await page.click('.item-button-area > button')

    await page.waitForSelector('.modal-content')
    await page.waitForSelector('.modal-header > .close')

    await page.screenshot({path: 'screenshot.png'})

    await page.waitForSelector('.modal-body > .item-container > .price > .price-current > strong + sup')

    let price = ''

    const total = await page.evaluate(()=>{
      const big = document.querySelector(".modal-body > .item-container > .price > .price-current > strong ").innerHTML
      const small = document.querySelector(".modal-body > .item-container > .price > .price-current > sup ").innerHTML

      price = "$" +big+small
      return price
    })
    
    await page.close();
    await browser.close();

    return total;
  };

  export const bhScrape = async (link, site) => {
    console.log(link)

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
    
      await page.waitForSelector("span[data-selenium=uppedDecimalPriceFirst]");
  
      let price = ''

      const change = await page.evaluate(()=>{
        const big = document.querySelector("span[data-selenium=uppedDecimalPriceFirst]").innerHTML;
        const small = document.querySelector("sup[data-selenium=uppedDecimalPriceSecond]").innerHTML

        price = big+"."+small
        return price
      })
  
      await page.close();
      await browser.close();
  
      return change;
    };

  