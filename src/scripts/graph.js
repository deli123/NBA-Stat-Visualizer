import Chart from "chart.js/auto";
import { getNumZeros } from "./utils";

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
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "bottom",
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
    this.playerInfo.push([playerId, seasonStart, seasonEnd]);

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
    this.updateDatasets(seasonStart, seasonEnd);
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

  addMissingYears = (newStartYear, newEndYear) => {
    const oldStartYear = this.years[0];
    let missingYears = [];
    for (let i = parseInt(newStartYear); i < parseInt(oldStartYear); i++) {
      missingYears.push(i.toString());
    }
    this.years = missingYears.concat(this.years);
    missingYears = [];
    const oldEndYear = this.years[this.years.length - 1];
    for (let i = parseInt(oldEndYear) + 1; i <= parseInt(newEndYear); i++) {
      missingYears.push(i.toString());
    }
    this.years = this.years.concat(missingYears);

    this.chart.data.labels = this.years;
  };

  // in order to keep the X-Axis (Season Year) consistent,
  // update the dataset by filling in the missing years with 0's (only at the beginning)
  updateDatasets = (newStartYear, newEndYear) => {
    this.addMissingYears(newStartYear, newEndYear);

    let missingData = [];
    for (let i = 0; i < this.chart.data.datasets.length; i++) {
      missingData = [];
      let startYear = this.playerInfo[i][1];
      let numZeros = getNumZeros(this.chart.data.datasets[i].data);
      let diff = startYear - this.years[0];
      while (diff > numZeros) {
        missingData.push(0);
        diff -= 1;
      }
      this.chart.data.datasets[i].data = missingData.concat(
        this.chart.data.datasets[i].data
      );
    }
    this.chart.update();
  };

  addPlayerData = async (
    playerId,
    playerName,
    seasonStart,
    seasonEnd,
    category,
    color
  ) => {
    this.playerInfo.push([playerId, seasonStart, seasonEnd]);

    if (!this.years) this.years = this.getYears(seasonStart, seasonEnd);
    let data = [];

    let stat = CATEGORIES[category];
    if (category === "minutes") {
      stat = "MP";
    } else if (category === "rebounds") {
      stat = "TRB";
    } else {
      stat = CATEGORIES[category].toUpperCase();
    }

    let parsedData = await fetch("./player-data.json");
    let res = await parsedData.json();

    let i = 0;
    for (i = i; i < res.length; i++) {
      if (res[i].NAME === playerName) {
        let seasons = res[i].Season.split("-");
        let firstValidSeason = parseInt(seasons[0]);
        for (let j = seasonStart; j < firstValidSeason; j++) {
          data.push(0);
        }
        break;
      }
    }
    for (i = i; i < res.length; i++) {
      if (res[i].NAME === playerName) {
        let seasons = res[i].Season.split("-");
        let season = parseInt(seasons[0]);
        if (season >= seasonStart && season <= seasonEnd) {
          let datum = res[i][stat];
          data.push(parseFloat(datum));
        }
      }
    }

    const dataset = {
      label: playerName,
      backgroundColor: color,
      borderColor: color,
      data: data,
    };

    this.chart.data.datasets.push(dataset);
    this.updateDatasets(seasonStart, seasonEnd);
    this.chart.data.labels = this.years;
    this.chart.update();
  };
}
