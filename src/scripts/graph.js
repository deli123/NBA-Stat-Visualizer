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
    this.playerInfo = [];
  }

  getYears = (seasonStart, seasonEnd) => {
    const seasons = [];

    for (let i = seasonStart; i <= seasonEnd; i++) {
      seasons.push(i.toString());
    }

    return seasons;
  };

  getData = async (id, seasonStart, seasonEnd, category) => {
    this.playerId = id;
    let abbrev = CATEGORIES[category];
    const data = [];

    for (let i = seasonStart; i <= seasonEnd; i++) {
      let url = `https://www.balldontlie.io/api/v1/season_averages?season=${i}&player_ids[]=${id}`;
      let obj;
      let res = await fetch(url);
      obj = await res.json();

      if (obj.data.length === 0) {
        if (abbrev === "min") {
          data.push("00:00");
        } else {
          data.push(0);
        }
      } else {
        data.push(obj.data[0][abbrev]);
      }
    }

    return data;
  };

  // because addData() calls the getData() async function,
  // this function also has to be async
  addData = async (userInput, category, color) => {
    const [playerId, playerName, seasonStart, seasonEnd] = userInput;
    this.playerInfo.push([playerId, seasonStart]);

    if (!this.years) this.years = this.getYears(seasonStart, seasonEnd);

    const data = await this.getData(playerId, seasonStart, seasonEnd, category);

    if (category === "minutes") {
      for (let i = 0; i < data.length; i++) {
        data[i] = this.convertMinsToDecimal(data[i]);
      }
    }

    const dataset = {
      label: playerName,
      backgroundColor: color,
      borderColor: color,
      data: data,
    };

    this.chart.data.datasets.push(dataset);
    this.updateDatasets(seasonStart);
    this.chart.data.labels = this.years;
    this.chart.update();
  };

  convertMinsToDecimal = (minutes) => {
    let mins = minutes.split(":");
    for (let i = 0; i < mins.length; i++) {
      mins[i] = parseInt(mins[i]);
    }
    let decimal = mins[0] + mins[1] / 60;
    return decimal;
  };

  addMissingYears = (newStartYear) => {
    const oldStartYear = this.years[0];
    let missingYears = [];
    for (let i = newStartYear; i < oldStartYear; i++) {
      missingYears.push(i);
    }

    this.years = missingYears.concat(this.years);
  };

  // in order to keep the X-Axis (Season Year) consistent,
  // update the dataset by filling in the missing years (only at the beginning)
  updateDatasets = (newStartYear) => {
    if (newStartYear < this.years[0]) {
      this.addMissingYears(newStartYear);
    }

    for (let i = 0; i < this.chart.data.datasets.length; i++) {
      let startYear = this.playerInfo[i][1];

      if (newStartYear < startYear) {
        while (this.chart.data.datasets[i].data.length < this.years.length) {
          this.chart.data.datasets[i].data.unshift(0);
        }
      }
    }
  };
}
