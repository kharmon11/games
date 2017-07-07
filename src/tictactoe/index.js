"use strict";
import {drawBoard} from './drawBoard';
import Game from './game';

const boardCanvas = document.getElementById("board");
const ctx = boardCanvas.getContext("2d");
drawBoard(boardCanvas, ctx);
const game = new Game(boardCanvas, ctx);
game.start();

function restartGame(event) {
    location.reload();
}
document.getElementById("restart_btn").addEventListener("click", restartGame);
