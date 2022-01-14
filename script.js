"use strict";

const closeNav = document.querySelector(".times");
const nav = document.querySelector("nav");
const menuBar = document.querySelector(".menu-bar");
const newGame = document.querySelector(".nav-new-game");
const guide = document.querySelector(".Guide");
const about = document.querySelector(".About");
const aboutModal = document.querySelector(".about-modal");
const guideModal = document.querySelector(".guide-modal");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelectorAll(".close-modal");
const player = document.querySelectorAll(".player");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const player1Score = document.getElementById("score--0");
const player2Score = document.getElementById("score--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const dice = document.querySelector(".dice");

// Navbar functionality;

const handleModal = function () {
  if (!aboutModal.classList.contains("hidden")) {
    aboutModal.classList.add("hidden");
  }
  if (!guideModal.classList.contains("hidden")) {
    guideModal.classList.add("hidden");
  }
  overlay.classList.add("hidden");
};
menuBar.addEventListener("click", function () {
  nav.classList.add("active");
});
closeNav.addEventListener("click", function () {
  nav.classList.remove("active");
});

guide.addEventListener("click", function () {
  guideModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
about.addEventListener("click", function () {
  aboutModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
overlay.addEventListener("click", function () {
  handleModal();
  overlay.classList.add("hidden");
});

for (let i = 0; i < closeModal.length; i++) {
  closeModal[i].addEventListener("click", function () {
    handleModal();
  });
}

//******** Game Logic *********/

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
const resetEverything = function () {
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
  resetEverything();
});
newGame.addEventListener("click", function () {
  resetEverything();
  nav.classList.remove("active");
});
const trophy = () => {
  currentPlayer.classList.add("winner");
  btnHold.disabled = true;
  btnRoll.disabled = true;
  btnHold.style.cursor = "default";
  btnRoll.style.cursor = "default";
  dice.style.display = "none";
};
