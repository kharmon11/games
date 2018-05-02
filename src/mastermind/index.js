"use strict";
import Game from './game';

const boardCanvas = document.getElementById('board');
const ctx = boardCanvas.getContext('2d');

if (typeof Storage !== "undefined") {
    if (localStorage.mastermindWins) {
        document.getElementById("wins_score").innerHTML = localStorage.mastermindWins;
        document.getElementById("losses_score").innerHTML = localStorage.mastermindLosses;
    } else {
        localStorage.setItem("mastermindWins", 0);
        localStorage.setItem("mastermindLosses", 0);
        document.getElementById("wins_score").innerHTML = localStorage.mastermindWins;
        document.getElementById("losses_score").innerHTML = localStorage.mastermindLosses;
    }
}

const game = new Game(boardCanvas, ctx);
game.start();
boardCanvas.addEventListener('click', game.click);

function newGame() {
    const newGame = new Game(boardCanvas, ctx);
    newGame.start();
    boardCanvas.addEventListener('click', newGame.click);
}
document.getElementById("new_game_btn").addEventListener('click', newGame);