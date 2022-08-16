import { Graph } from "./scripts/graph";
import * as PlayerForm from "./scripts/add_player"

const playerForm = document.querySelector(".player-form");
PlayerForm.createSeasonsDropdown();
playerForm.addEventListener("submit", PlayerForm.addPlayer);

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
}

// const url = `https://www.balldontlie.io/api/v1/players?search=james`;
// let obj = [];
// fetch(url).then(response => response.json()).then(response => obj = response);
// console.log(obj);

// async function foo() {
//   let obj;
//   const res = await fetch(url);
//   obj = await res.json();
//   // console.log(obj.data);
//   // console.log(obj.data[0].first_name);
//   console.log(obj.data.length);
// }

// foo();