"use strict";

const player = document.querySelectorAll(".player");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const player1Score = document.getElementById("score--0");
const player2Score = document.getElementById("score--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");

// Initially hide dice
dice.classList.add("hidden");
//Initially the current player is player 1
let currentPlayer = player1;

const handlePlayers = () => {
  for (let i = 0; i < player.length; i++) {
    if (player[i].classList.contains("player--active")) {
      player[i].classList.remove("player--active");
    } else {
      player[i].classList.add("player--active");
      currentPlayer = player[i];
    }
  }
};

let currentScore = 0;
let totalScore = 0;

btnRoll.addEventListener("click", function () {
  //1. Generate random dice roll
  let randomDice = Math.floor(Math.random() * 6) + 1;

  //2. Display generated random dice roll
  dice.src = `dice-${randomDice}.png`;
  dice.style.display = "block";
  //3. Check if the dice is equal to 1
  let currentPlayerScore = currentPlayer
    .querySelector(".current")
    .querySelector(".current-score");
  if (randomDice === 1) {
    currentPlayerScore.textContent = "0";
    handlePlayers();
    currentScore = 0;
  } else {
    currentScore += randomDice;
    currentPlayerScore.textContent = currentScore;
  }
});

btnHold.addEventListener("click", function () {
  let prevScore = Number(currentPlayer.querySelector(".score").textContent);
  totalScore = currentScore + prevScore;
  currentPlayer.querySelector(".score").textContent = totalScore;
  currentPlayer
    .querySelector(".current")
    .querySelector(".current-score").textContent = "0";
  currentScore = 0;

  if (totalScore >= 100) {
    trophy();
  } else handlePlayers();
  totalScore = 0;
});

btnNew.addEventListener("click", function () {
  currentScore = 0;
  player1Score.textContent = "0";
  player2Score.textContent = "0";
  currentPlayer
    .querySelector(".current")
    .querySelector(".current-score").textContent = "0";
  currentPlayer.classList.remove("winner");
  currentPlayer = player1;
  if (!player1.classList.contains("player--active")) {
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
  }
  dice.style.display = "none";
  btnHold.disabled = false;
  btnRoll.disabled = false;
  btnHold.style.cursor = "pointer";
  btnRoll.style.cursor = "pointer";
});

const trophy = () => {
  currentPlayer.classList.add("winner");
  btnHold.disabled = true;
  btnRoll.disabled = true;
  btnHold.style.cursor = "default";
  btnRoll.style.cursor = "default";
  dice.style.display = "none";
};
