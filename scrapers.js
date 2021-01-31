const puppeteer = require('puppeteer');
const datastore = require('nedb');
const database = new datastore('database.db');
database.loadDatabase();

async function getData(mainIngredient) {

    const browser = await puppeteer.launch({headless: true });
    const page = await browser.newPage();

    // Get new pages/urls 
    var parentLink = 'https://www.simplyrecipes.com/recipes/main-ingredient/';
    var newUrl = parentLink.concat(mainIngredient);
    await page.goto(newUrl);

    
    

    // Get all the titles
    const recipeTitles = await page.evaluate( ()=> {
        const titles = document.querySelectorAll('.grd-tile-link');
        var foodName = Array.from(titles).map(v=>v.title);
        return foodName;
    })

    // Get all the URL
    const recipeUrls = await page.evaluate( ()=> {
        const images = document.querySelectorAll('.grd-tile-link');
        var url = Array.from(images).map(v=>v.href);
        return url;
    })
    

    

    browser.close();

    for (var i = 0; i < recipeTitles.length; i++) {
        database.insert({name:recipeTitles[i], url:recipeUrls[i]});
    }

}


/*
const puppeteer = require('puppeteer');

(async function main() {
    

    const browser = await puppeteer.launch({headless: false });
    const page = await browser.newPage();

    // Get main ingredients 
    var mainIngredient = 'chicken'

    // Get new pages/urls 
    var parentLink = 'https://www.simplyrecipes.com/recipes/main-ingredient/';
    var newUrl = parentLink.concat(mainIngredient);
    await page.goto(newUrl);

    const recipeUrls = await page.evaluate( ()=> {
        const images = document.querySelectorAll('.grd-tile-link');
        var url = Array.from(images).map(v=>v.href);
        return url;
    })

    var recipeUrlCount = recipeUrls.length;
    for (var i = 0; i < recipeUrlCount; i++) {
        await page.goto(recipeUrls[i]);

        const recipe = await page.evaluate( ()=> {
            const recipeTitle = document.querySelectorAll('.ingredient');
            var ingredient = Array.from(recipeTitle).map(v=>v.textContent);
            return ingredient;
        })
    }

    browser.close();
    console.log(recipeUrls[1]);
        
})();




*/