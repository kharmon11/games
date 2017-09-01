import Game from './game';
import blankBoard from './blankBoard';

const board = document.getElementById('board');
const ctx = board.getContext('2d');

// Setup score
const highScoreDiv = document.getElementById("high_score_number"); 
if (localStorage.highScore2048) {
    highScoreDiv.innerHTML = localStorage.highScore2048;
} else {
    localStorage.setItem("highScore2048", 0);
    highScoreDiv.innerHTML = 0;
}

if (!localStorage.state2048) {
    localStorage.state2048 = JSON.stringify(blankBoard);
}

const game = new Game(board, ctx);
game.renderBoard();

window.addEventListener('keydown', game.keyPress);

function newGame() {
    localStorage.setItem("currentScore2048", 0);
    localStorage.setItem("state2048", JSON.stringify(blankBoard));
    const newGame = new Game(board, ctx);
    newGame.renderBoard();
    window.addEventListener('keydown', newGame.keyPress);
}
document.getElementById("new_game_btn").addEventListener("click", newGame);