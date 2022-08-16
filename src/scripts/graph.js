import Chart from "chart.js/auto";

const CATEGORIES = {
  points: "pts",
  assists: "ast",
  rebounds: "reb",
  steals: "stl",
  blocks: "blk",
  minutes: "min",
};

export class Graph {
  constructor(context, category) {
    const config = {
      type: "line",
      data: [],
      options: {
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `Season average for ${category}`,
          },
        },
      },
    };

    this.chart = new Chart(context, config);
    this.category = category;
    this.years;
  }

  getYears = (seasonStart, seasonEnd) => {
    const seasons = [];

    for (let i = seasonStart; i <= seasonEnd; i++) {
      seasons.push(i.toString());
    }

    return seasons;
  };

  getData = async (id, seasonStart, seasonEnd, category) => {
    let abbrev = CATEGORIES[category];
    const data = [];
    let i = seasonStart;
    for (let i = seasonStart; i <= seasonEnd; i++) {
      let url = `https://www.balldontlie.io/api/v1/season_averages?season=${i}&player_ids[]=${id}`;
      let obj;
      let res = await fetch(url);
      obj = await res.json();
      data.push(obj.data[0][abbrev]);
    }

    return data;
  };

  // because addData() calls the async getData() function,
  // this function also has to be async
  addData = async (userInput, category, color) => {
    const [playerId, playerName, seasonStart, seasonEnd] = userInput;
    this.years = this.getYears(seasonStart, seasonEnd);
    
    const data = await this.getData(playerId, seasonStart, seasonEnd, category);
    
    console.log(`${category}: `, data);

    if (category === "minutes") {
        for (let i = 0; i < data.length; i++) {
            data[i] = this.convertMinsToDecimal(data[i]);
        }
        console.log(data);
    }

    const dataset = {
      label: playerName,
      backgroundColor: color,
      borderColor: color,
      data: data,
    };

    this.chart.data.labels = this.years;
    this.chart.data.datasets.push(dataset);
    this.chart.update();
  };

  convertMinsToDecimal = (minutes) => {
    let mins = minutes.split(":");
    for (let i = 0; i < mins.length; i++) {
        mins[i] = parseInt(mins[i]);
    }
    let decimal = mins[0] + (mins[1] / 60);
    return decimal;
  }
}
