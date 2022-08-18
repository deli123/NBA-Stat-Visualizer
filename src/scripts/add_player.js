import { getGraphs } from "../index";
import * as Util from "./utils";
import * as Players from "./players";

const players = document.querySelector(".players");
const userInput = [];
let index = 0;

export const createSeasonsDropdown = () => {
  let currentYear = new Date().getFullYear() - 1;
  let dropdownStart = document.getElementById("season-start");
  let dropdownEnd = document.getElementById("season-end");

  let startYear = 1979;
  for (let i = startYear; i <= currentYear; i++) {
    // when appending the same child to two parents, the child only gets appended to the second parent
    // thus, have to create two separate childs
    let opt1 = document.createElement("option");
    opt1.value = i;
    opt1.innerHTML = i;
    let opt2 = document.createElement("option");
    opt2.value = i;
    opt2.innerHTML = i;

    if (i === currentYear) {
      opt1.setAttribute("selected", true);
      opt2.setAttribute("selected", true);
    }

    dropdownStart.appendChild(opt1);
    dropdownEnd.appendChild(opt2);
  }
};

export const addPlayer = (e) => {
  e.preventDefault();
  let inputName = document.querySelector("input[name='add-player']").value;
  findPlayer(inputName);
};

const findPlayer = async (inputName) => {
  let seasonStart = document.getElementById("season-start").value;
  let seasonEnd = document.getElementById("season-end").value;

  if (seasonStart > seasonEnd) {
    alert("Invalid season range");
    return;
  }

  const url = `https://www.balldontlie.io/api/v1/players?search=${inputName}`;
  let obj;
  const res = await fetch(url);
  obj = await res.json();

  if (obj.data.length > 1 || obj.data.length === 0) {
    alert("Unable to find player, please enter an exact name");
  } else {
    let playerName = obj.data[0].first_name + " " + obj.data[0].last_name;
    userInput.push([obj.data[0].id, playerName, seasonStart, seasonEnd]);

    const color = Util.generateRandomColor();
    _addPlayerHelper(playerName, seasonStart, seasonEnd);

    let graphs = getGraphs();
    for (let i = 0; i < graphs.length; i++) {
      graphs[i].addData(
        userInput[userInput.length - 1],
        graphs[i].category,
        color
      );
    }
  }
};

const _addPlayerHelper = async (playerName, seasonStart, seasonEnd) => {
  let li = document.createElement("li");
  li.innerText = `${playerName} (${seasonStart} - ${seasonEnd})`;
  li.setAttribute("id", playerName);
  players.appendChild(li);

  let graphsDiv = document.querySelector(".graphs-side");
  graphsDiv.removeAttribute("id");
  let playersHeader = document.querySelector(".players-header");
  playersHeader.removeAttribute("id");
};

export const addRandomPlayer = (e) => {
  e.preventDefault();
  let graphs = getGraphs();
  const color = Util.generateRandomColor();
  let id = 0;
  let playerName = Players.players[index];
  index += 1;
  if (index >= Players.players.length) index = 0;
  let seasonStart = Util.generateRandomInt(2008, 2015);
  let seasonEnd = Util.generateRandomInt(2014, 2022);

  _addPlayerHelper(playerName, seasonStart, seasonEnd);
  for (let i = 0; i < graphs.length; i++) {
    graphs[i].addPlayerData(
      id,
      playerName,
      seasonStart,
      seasonEnd,
      graphs[i].category,
      color
    );
  }
};
