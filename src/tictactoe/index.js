"use strict";
import {drawBoard} from './drawBoard';
import {displayScores} from './displayScores';
import Game from './game';

const boardCanvas = document.getElementById("board");
const ctx = boardCanvas.getContext("2d");
drawBoard(boardCanvas, ctx);

if (typeof Storage !== "undefined") {
    if (!localStorage.tictactoeWins) {
        localStorage.setItem("tictactoeWins", 0);
        localStorage.setItem("tictactoeLosses", 0);
        localStorage.setItem("tictactoeDraws", 0);
    }
    displayScores();
}

const game = new Game(boardCanvas, ctx);
game.start();

function restartGame(event) {
    location.reload();
}
document.getElementById("restart_btn").addEventListener("click", restartGame);
