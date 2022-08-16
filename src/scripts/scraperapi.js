const axios = require("axios");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const url = "https://www.basketball-reference.com/players/";

try {
  async () => {
    console.log("here");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    console.log("searching player");
    await page.type(".ac-input completely", "Hakeem Olajuwon");
    console.log("you clicked");
    await page.click(document.querySelector("input[type='submit']"));
    console.log("Here");
  };
} catch (err) {
  console.error(err);
}

// axios(url)
//   .then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const season = $(".left").text();
//     console.log(season);
//   })
//   .catch(console.error);
