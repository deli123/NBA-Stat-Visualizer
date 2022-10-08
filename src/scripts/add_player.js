import { getGraphs } from "../index";
import * as Util from "./utils";
import * as Players from "./players";

const players = document.querySelector(".players");
const userInput = [];

export const createSeasonsDropdown = () => {
  let currentYear = new Date().getFullYear();
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
  let playerName;
  let playerId;
  let playerFound = false;
  let obj;
  const res = await fetch(url);
  obj = await res.json();

  if (obj.data.length === 0) {
    alert("Unable to find player, please enter an exact name!");
    return;
  }
  // if multiple players are found, search through all of them for an exact match
  // if there is no exact match, throw an alert
  else if (obj.data.length > 1) {
    for (let i = 0; i < obj.data.length; i++) {
      playerName = obj.data[i].first_name + " " + obj.data[i].last_name;
      if (inputName.toLowerCase() === playerName.toLowerCase()) {
        playerFound = true;
        playerId = obj.data[i].id;
        break;
      }
    }
    if (!playerFound) {
      alert(
        "Unable to find player, please enter an exact name!"
      );
      return;
    }
  }
  // only one player is found
  else {
    playerId = obj.data[0].id;
    playerName = obj.data[0].first_name + " " + obj.data[0].last_name;
  }

  userInput.push([playerId, playerName, seasonStart, seasonEnd]);

  const color = Util.generateRandomColor();
  _addPlayerSideBar(playerName, seasonStart, seasonEnd);

  let graphs = getGraphs();

  // all graphs will conform to the first graph's years and playerInfo
  graphs[0].addAllData(
    userInput[userInput.length - 1], // most recent user input
    graphs,
    color
  );
};

const _addPlayerSideBar = async (playerName, seasonStart, seasonEnd) => {
  let li = document.createElement("li");
  li.innerText = `${playerName} (${seasonStart} - ${seasonEnd})`;
  li.setAttribute("id", playerName);
  players.appendChild(li);

  // remove #hidden to show the graphs and players-header
  let graphsDiv = document.querySelector(".graphs-side");
  graphsDiv.classList.remove("hidden");
  let playersHeader = document.querySelector(".players-header");
  playersHeader.classList.remove("hidden");

  // close popup window
  let popUp = document.querySelector(".popup");
  popUp.style.display = "none";
};

export const addRandomPlayer = (e) => {
  e.preventDefault();
  let graphs = getGraphs();
  const color = Util.generateRandomColor();
  let id = 0;
  let index = Util.generateRandomInt(0, 51);
  let playerName = Players.players[index];
  let seasonStart = Util.generateRandomInt(2008, (new Date().getFullYear() - 7));
  let seasonEnd = Util.generateRandomInt(new Date().getFullYear() - 8, new Date().getFullYear() + 1);

  _addPlayerSideBar(playerName, seasonStart, seasonEnd);
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
