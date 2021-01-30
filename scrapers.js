const puppeteer = require('puppeteer');

async function scrape(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="firstHeading"]');
    const txt = await el.getProperty('textContent');
    const rawtxt = await txt.jsonValue();

    console.log({rawtxt});
    

    browser.close();
}

scrape('https://en.wikipedia.org/wiki/Website');