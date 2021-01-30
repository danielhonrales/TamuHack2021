const puppeteer = require('puppeteer');

async function scrape(url){
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/div/main/div[1]/div[2]/div[1]/div[1]/div[1]/div/h1');
    const txt = await el.getProperty('textContent');
    const rawtxt = await txt.jsonValue();

    console.log({rawtxt});
    

    browser.close();
}

scrape('https://www.allrecipes.com/recipe/17066/janets-rich-banana-bread/');