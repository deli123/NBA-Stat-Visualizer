const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");

const filePath = path.join(__dirname, "../../assets/data/player-data.csv");
const stream = fs.createReadStream(filePath);

// const data = [];

// fs.createReadStream(coolPath)
//   .pipe(
//     parse({
//       delimiter: ",",
//       columns: true,
//       ltrim: true,
//     })
//   )
//   .on("data", function (row) {
//     // push the object row into the array
//     data.push(row);
//   })
//   .on("error", function (error) {
//     console.log(error.message);
//   })
// .on("end", res => {
//   res.send(Buffer.concat(chunks));

// }
// //   // log the result array
// //   // console.log("parsed csv data:");
// //   // console.log(data.length);
// //   // console.log(data[data.length - 1].NAME);
// );



function streamToString (stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  })
}

const getResult = async (stream) => {
  const result = await streamToString(stream)
  console.log(result);
  // return result;
}
const data = getResult(stream);