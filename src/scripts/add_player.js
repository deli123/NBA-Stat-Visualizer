const playerContainer = document.querySelector(".player-container");
const players = document.querySelector(".players");
const playerForm = document.querySelector(".player-form");
const userInput = [];

const seasonsDropdown = () => {
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

const addPlayer = (e) => {
  e.preventDefault();
  let inputName = document.querySelector("input[name='add-player']");
  let seasonStart = document.getElementById("season-start");
  let seasonEnd = document.getElementById("season-end");
  let playerName = inputName.value;
  userInput.push([playerName, seasonStart, seasonEnd]);
  _addPlayerHelper(playerName);
  playerForm.reset();
};

const _addPlayerHelper = (playerName) => {
  let li = document.createElement("li");
  li.innerText = playerName;
  players.appendChild(li);
};

export const getUserInput = () => {
  return userInput;
}

seasonsDropdown();
playerForm.addEventListener("submit", addPlayer);
