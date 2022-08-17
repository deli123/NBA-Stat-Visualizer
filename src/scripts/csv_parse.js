// const fs = require("fs");
// const Papa = require("papaparse");
// const path = require("path");
// import * as fs from "fs"
// import path from "path"
// import * as Papa from "papaparse";

const CATEGORIES = {
  points: "pts",
  assists: "ast",
  rebounds: "reb",
  steals: "stl",
  blocks: "blk",
  minutes: "min",
};

// const csvFilePath = './player-data.csv'
// const csvFilePath = path.join(__dirname, "../../assets/data/player-data.csv");
// const csvFilePath = path.dirname("../../assets/data/player-data.csv")

// Function to read csv which returns a promise so you can do async / await.

let data;
const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        // console.log('Complete', results.data.length, 'records.');
        resolve(results.data);
      },
    });
  });
};

export const getPlayerData = async (playerName, seasonStart, seasonEnd, category) => {
  let parsedData = await readCSV(csvFilePath);
  let data = [];
  let stat = CATEGORIES[category];

  if (category === "minutes") {
    stat = "MP";
  } else {
    stat = CATEGORIES[category].toUpperCase();
  }

  for (let i = 0; i < parsedData.length; i++) {
    if (parsedData[i].NAME === playerName) {

      let seasons = parsedData[i].Season.split("-");
      let season = parseInt(seasons[0]);
      if (season >= seasonStart && season <= seasonEnd) {
        let datum = parsedData[i][stat];
        data.push(parseFloat(datum));
      }
    }
  }
  console.log(data);
  // return data;
}



// getPlayerData("Draymond Green", 2012, 2021, "minutes");
// exports.getPlayerData = getPlayerData;