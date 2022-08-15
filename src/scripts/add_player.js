const playerContainer = document.querySelector(".player-container");
const players = document.querySelector(".players");
const playerForm = document.querySelector(".player-form");

const addPlayer = (e) => {
  e.preventDefault();
  let input = document.querySelector("input[name='add-player']");
  let value = input.value;
  _addPlayerHelper(value);
  playerForm.reset();
};

const _addPlayerHelper = (playerName) => {
  let li = document.createElement("li");
  li.innerText = playerName;
  players.appendChild(li);
};

playerForm.addEventListener("submit", addPlayer);