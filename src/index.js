import Chart from "chart.js/auto";
// import Util from "./scripts/utils";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: "Dataset 2",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45].reverse(),
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    // responsive: true,
    maintainAspectRatio: true,
  },
};

const ctxPoints = document.getElementById("points").getContext("2d");
const ctxAssists = document.getElementById("assists").getContext("2d");
const ctxRebounds = document.getElementById("rebounds").getContext("2d");
const ctxBlocks = document.getElementById("blocks").getContext("2d");
const ctxSteals = document.getElementById("steals").getContext("2d");
const ctxMinutes = document.getElementById("minutes").getContext("2d");

const pointsChart = new Chart(ctxPoints, config);
const assistsChart = new Chart(ctxAssists, config);
const reboundsChart = new Chart(ctxRebounds, config);
const blocksChart = new Chart(ctxBlocks, config);
const stealsChart = new Chart(ctxSteals, config);
const minutesChart = new Chart(ctxMinutes, config);
