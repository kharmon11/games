import {ConsolePeg, Row, PegSpot} from './components';
import {randInt} from '../utils/randInt';
import {insideCircle} from '../utils/insideCircle';

const pegColors = {
    "red": "#f00",
    "purple": "#a4a",
    "white": "#ddd",
    "orange": "#f90",
    "yellow": "#ff0",
    "blue": "#00d",
    "black": "#000",
    "green": "#0f0",
}

class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.cols = 4;
        this.duplicates = false;
        this.consolePegs = [];
        this.rows = [];
        this.pegNames = ["red", "purple", "white", "orange", "yellow", "blue", "black", "green"];
        this.pattern = [];
        this.turn = 0;
        this.selected = false;
        this.guess = ["", "", "", ""];

        this.start = this.start.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.renderConsole = this.renderConsole.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.createPattern = this.createPattern.bind(this);
        this.arrayCheck = this.arrayCheck.bind(this);
        this.click = this.click.bind(this);
        this.getCursorCoords = this.getCursorCoords.bind(this);
        this.consoleClick = this.consoleClick.bind(this);
        this.rowClick = this.rowClick.bind(this);
        this.checkGuess = this.checkGuess.bind(this);
        this.drawPips = this.drawPips.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }

    start() {
        this.renderBoard();
        this.renderConsole();
        this.renderRows();
        this.createPattern(0).then(() => {
            // console.log(this.pattern);
        })
    }

    renderBoard() {
        this.ctx.fillStyle = "#954";
        this.ctx.fillRect(0, 0, 300, 550);
    }

    renderConsole() {
        this.ctx.fillStyle = "#000";
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(25, 475, 250, 70);
        const pegData = [
            ["red", "#f00", 50, 494],
            ["purple", "#a4a", 113, 494],
            ["white", "#ddd", 173, 494],
            ["orange", "#f90", 240, 494],
            ["yellow", "#ff0", 50, 526],
            ["blue", "#00d", 113, 526],
            ["black", "#000", 173, 526],
            ["green", "#0f0", 240, 526]
        ];
        for (let i = 0; i < pegData.length; i++) {
            this.consolePegs.push(new ConsolePeg(this.ctx, pegData[i][0], pegData[i][1], pegData[i][2], pegData[i][3]));
            this.consolePegs[i].render();
        }
    }

    renderRows() {
        let x = 5;
        let y;
        for (let i = 0; i < 11; i++) {
            y = 432 - (43 * i);
            this.rows.push(new Row(this.ctx, x, y));
            this.rows[i].render();
        }
    }

    createPattern(i) {
        return new Promise((resolve, reject) => {
            this.arrayCheck().then((int) => {
                this.pattern.push(this.pegNames[int]);
                if (i < 3) {
                    this.createPattern(i + 1).then(() => {
                        resolve();
                    })
                } else {
                    resolve();
                }
            });
        });
    }

    arrayCheck() {
        return new Promise((resolve, reject) => {
            let int = randInt(0, 8);
            if (this.pattern.includes(this.pegNames[int])) {
                this.arrayCheck().then((int) => {
                    resolve(int);
                });
            } else {
                resolve(int);
            }

        });
    }

    click(event) {
        this.getCursorCoords(event).then((coords) => {
            // console.log("click", coords.x, coords.y);
            if (25 <= coords.x && coords.x <= 275 && 485 <= coords.y && coords.y <= 545) {
                this.consoleClick(coords.x, coords.y)
            } else {
                if (432 - (43 * this.turn) <= coords.y && coords.y <= 472 - (43 * this.turn)) {
                    this.rowClick(coords.x, coords.y);
                }
            }
        });
    }

    getCursorCoords(event) {
        return new Promise((resolve, reject) => {
            const rect = this.canvas.getBoundingClientRect();
            resolve({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            });
        });
    }

    consoleClick(x, y) {
        for (let i = 0; i < this.consolePegs.length; i++) {
            if (insideCircle(x, y, this.consolePegs[i].x, this.consolePegs[i].y, this.consolePegs[i].radius + 10)) {
                for (let j = 0; j < this.consolePegs.length; j++) {
                    if (this.consolePegs[j].selected && this.consolePegs[j].name !== this.consolePegs[i].name) {
                        this.consolePegs[j].deselect();
                    }
                }
                this.selected = this.consolePegs[i].name;
                this.consolePegs[i].select();
            }
        }
    }

    rowClick(x, y) {
        if (x < 180) {
            if (this.selected) {
                let pegSpots = this.rows[this.turn].pegSpots;
                for (let i = 0; i < pegSpots.length; i++) {
                    if (insideCircle(x, y, pegSpots[i].x, pegSpots[i].y, pegSpots[i].radius + 5)) {
                        pegSpots[i].fill = pegColors[this.selected];
                        this.guess[i] = this.selected;
                        pegSpots[i].render();
                        this.selected = false;
                        for (let j = 0; j < this.consolePegs[j].length; j++) {
                            if (this.consolePegs[j].selected) {
                                this.consolePegs[j].deselect();
                            }
                        }
                        break;
                    }
                }
            }
        } else if (x >= 230 && x <= 280 && y >= this.rows[this.turn].y + 8 && y <= this.rows[this.turn].y + 33) {
            this.checkGuess().then((result) => {
                if (result.correctSpot.length === 0 && result.inArray.length === 0) {
                    this.nextTurn();
                } else {
                    this.drawPips(result).then(() => {
                        if (result.correctSpot.length === 4) {
                            this.gameOver("win");
                        } else {
                            if (this.turn === 9) {
                                this.gameOver("lose");
                            } else {
                                this.nextTurn();
                            }
                        }
                    })
                }
            });
        }
    }

    checkGuess() {
        return new Promise((resolve, reject) => {
            let result = {
                correctSpot: [],
                inArray: []
            }
            let correctSpot, inArray;
            for (let i = 0; i < 4; i++) {
                if (this.guess[i] === this.pattern[i]) {
                    result.correctSpot.push(this.guess[i]);
                }
            }
            if (result.correctSpot.length === 4) {
                resolve(result);
            } else {
                for (let i = 0; i < 4; i++) {
                    if (this.pattern.includes(this.guess[i]) && !result.correctSpot.includes(this.guess[i])) {
                        result.inArray.push(this.guess[i]);
                    }
                    if (i === 3) {
                        resolve(result);
                    }
                }
            }
        });
    }

    drawPips(result) {
        return new Promise((resolve, reject) => {
            let pipNum = 0;
            if (result.correctSpot.length > 0) {
                for (let i = 0; i < result.correctSpot.length; i++) {
                    let pip = this.rows[this.turn].pipBoard.pips[i];
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "#f00";
                    this.ctx.arc(pip.x, pip.y, pip.radius, 0, 2 * Math.PI);
                    this.ctx.fill();
                    pipNum++;
                }
            }
            if (result.inArray.length > 0) {
                for (let i = 0; i < result.inArray.length; i++) {
                    let pip = this.rows[this.turn].pipBoard.pips[i + pipNum];
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "#fff";
                    this.ctx.arc(pip.x, pip.y, pip.radius, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
            resolve();
        });
    }

    nextTurn() {
        this.turn++;
        this.rows[this.turn].renderButton()
    }

    gameOver(result) {
        for (let i = 0; i < this.rows[10].pegSpots.length; i++) {
            this.rows[10].pegSpots[i].fill = pegColors[this.pattern[i]];
            this.rows[10].pegSpots[i].render("final").then(() => {
            });
        }
        this.ctx.font = "20px Verdana";
        let messageColor, messageText;
        if (result === "win") {
            messageColor = "#0f0";
            messageText = "SUCCESS";
            localStorage.mastermindWins++;
            document.getElementById("wins_score").innerHTML = localStorage.mastermindWins;
            document.getElementById("losses_score").innerHTML = localStorage.mastermindLosses;
        } else {
            messageColor = "#f00";
            messageText = "FAILURE";
            localStorage.mastermindLosses++;
        }
        this.ctx.fillStyle = messageColor;
        this.ctx.fillText(messageText, 190, 30);
    }
}
export default Game;