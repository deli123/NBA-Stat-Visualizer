export const generateRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const generateRandomInt = (min, max) => {
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
};

export const getNumNaNs = (arr) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Object.is(arr[i], NaN)) {
      count += 1;
    }
  }
  return count;
};

export const getAllData = async (id, seasonStart, seasonEnd) => {
  const data = [];
  const points = [];
  const assists = [];
  const rebounds = [];
  const blocks = [];
  const steals = [];
  const minutes = [];

  for (let i = seasonStart; i <= seasonEnd; i++) {
    let url = `https://www.balldontlie.io/api/v1/season_averages?season=${i}&player_ids[]=${id}`;
    let obj;
    let res = await fetch(url);
    obj = await res.json();

    if (obj.data.length === 0) {
      points.push(0);
      assists.push(0);
      rebounds.push(0);
      blocks.push(0);
      steals.push(0);
      minutes.push("00:00");
    } else {
      points.push(obj.data[0]["pts"]);
      assists.push(obj.data[0]["ast"]);
      rebounds.push(obj.data[0]["reb"]);
      blocks.push(obj.data[0]["blk"]);
      steals.push(obj.data[0]["stl"]);
      minutes.push(obj.data[0]["min"]);
    }
  }

  data.push(points, assists, rebounds, blocks, steals, minutes);
  return data;
};

export const convertMinsToDecimal = (minutes) => {
  let mins = minutes.split(":");
  for (let i = 0; i < mins.length; i++) {
    mins[i] = parseInt(mins[i]);
  }
  let decimal = mins[0] + mins[1] / 60;
  return decimal;
};
