const fs = require('fs');
const Papa = require('papaparse');
const path = require('path');

// const csvFilePath = '../../assets/data/player-data.csv'
const csvFilePath = path.join(__dirname, "../../assets/data/player-data.csv");

// Function to read csv which returns a promise so you can do async / await.

let data;
const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()  
  return new Promise(resolve => {
    Papa.parse(csvData, {
      header: true,
      complete: results => {
        console.log('Complete', results.data.length, 'records.'); 
        resolve(results.data);
      }
    });
  });
};

const test = async () => {
  let parsedData = await readCSV(csvFilePath); 
  console.log(parsedData);

  for
}

test();