import { Graph } from "./scripts/graph";
import * as PlayerForm from "./scripts/add_player";
// import { getPlayerData } from "./scripts/csv_parse.js";

const playerForm = document.querySelector(".player-form");
const randomForm = document.querySelector(".random-form");
PlayerForm.createSeasonsDropdown();
playerForm.addEventListener("submit", PlayerForm.addPlayer);
randomForm.addEventListener("submit", PlayerForm.addRandomPlayer);

const ctxPoints = document.getElementById("points").getContext("2d");
const ctxAssists = document.getElementById("assists").getContext("2d");
const ctxRebounds = document.getElementById("rebounds").getContext("2d");
const ctxBlocks = document.getElementById("blocks").getContext("2d");
const ctxSteals = document.getElementById("steals").getContext("2d");
const ctxMinutes = document.getElementById("minutes").getContext("2d");

let points = new Graph(ctxPoints, "points");
let assists = new Graph(ctxAssists, "assists");
let rebounds = new Graph(ctxRebounds, "rebounds");
let blocks = new Graph(ctxBlocks, "blocks");
let steals = new Graph(ctxSteals, "steals");
let minutes = new Graph(ctxMinutes, "minutes");

const graphs = [points, assists, rebounds, blocks, steals, minutes];

export const getGraphs = () => {
  return graphs;
};

// window.addEventListener('afterprint', () => {
//   for (let i = 0; i < graphs.length; i++) {
//     graphs[i].resize();
//   }
// });
// getPlayerData("Draymond Green", 2012, 2021, "minutes");
