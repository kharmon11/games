import Game from './game';

const board = document.getElementById('board');
const ctx = board.getContext('2d');

const game = new Game(board, ctx);
game.renderBoard();

window.addEventListener('keydown', game.keyPress);