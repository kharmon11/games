import {randInt} from '../utils/randInt';
import {displayScores} from './displayScores';
import {wins} from './data/wins';

class TicTacToe {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.size = [canvas.offsetWidth / 3, canvas.offsetWidth * (2 / 3), canvas.offsetWidth];
        this.ctx = ctx;
        this.board = [
            [
                0, 0, 0
            ],
            [
                0, 0, 0
            ],
            [0, 0, 0]
        ];
        this.turn = 0;

        this.start = this.start.bind(this);
        this.click = this.click.bind(this);
        this.getCursorCoords = this.getCursorCoords.bind(this);
        this.findBoardSpace = this.findBoardSpace.bind(this);
        this.findSpaceDimension = this.findSpaceDimension.bind(this);
        this.checkSpace = this.checkSpace.bind(this);
        this.computerMove = this.computerMove.bind(this);
        this.findComputerSpace = this.findComputerSpace.bind(this);
        this.winningMoves = this.winningMoves.bind(this);
        this.winningSpaceTest = this.winningSpaceTest.bind(this);
        this.randomSpace = this.randomSpace.bind(this);
        this.gameOverCheck = this.gameOverCheck.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.drawX = this.drawX.bind(this);
        this.drawO = this.drawO.bind(this);
    }

    start() {
        this.canvas.style.display = "block";
        this.canvas.addEventListener("click", this.click);
    }

    click(event) {
        this.getCursorCoords(event).then((clickCoords) => {
            this.findBoardSpace(clickCoords).then((dims) => {
                if (this.checkSpace(dims)) {
                    this.board[dims.x][dims.y] = 1;
                    return this.drawX(dims);
                } else {
                    return Promise.reject("Space occupied", dims);
                }
            }).then(() => {
                return this.gameOverCheck(1);
            }).then((result) => {
                if (result) {
                    this.gameOver(1);
                } else {
                    if (this.turn < 9) {
                        return this.computerMove();
                    } else {
                        this.gameOver(0);
                    }
                }
            }).then((result) => {
                if (result) {
                    this.gameOver(2);
                }
            }).catch((reason) => {
            });
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

    findBoardSpace(clickCoords) {
        return new Promise((resolve, reject) => {
            this.findSpaceDimension(clickCoords.x).then((xDim) => {
                this.findSpaceDimension(clickCoords.y).then((yDim) => {
                    resolve({x: xDim, y: yDim});
                });
            });
        });
    }

    findSpaceDimension(coord) {
        return new Promise((resolve, reject) => {
            if (coord < 100) {
                resolve(0);
            } else if (coord > 100 && coord < 200) {
                resolve(1);
            } else {
                resolve(2);
            }
        });
    }

    checkSpace(space) {
        if (this.board[space.x][space.y] === 0) {
            return true;
        }
    }

    computerMove() {
        return new Promise((resolve, reject) => {
            this.findComputerSpace().then((space) => {
                this.board[space.x][space.y] = 2;
                this.drawO(space).then(() => {
                    return this.gameOverCheck(2);
                }).then((result) => {
                    resolve(result);
                });
            });
        });
    }

    findComputerSpace() {
        return new Promise((resolve, reject) => {
            const space = {
                x: 1,
                y: 1
            };
            const results = {i: 0, j: 0, open: 0, p1: 0, p2: 0, openSpace: false, blockSpace: false};
            this.winningMoves(results).then((space) => {
                if (space) {
                    resolve(space);
                } else {
                    this.randomSpace().then((space) => {
                        resolve(space);
                    });
                }
            });
        });
    }

    winningMoves(results) {
        return new Promise((resolve, reject) => {
            results.j = 0;
            results.open = 0;
            results.p1 = 0;
            results.p2 = 0;
            results.openSpace = false;
            let blockSpace;
            results.spaces = [this.board[wins[results.i][0][0]][wins[results.i][0][1]], this.board[wins[results.i][1][0]][wins[results.i][1][1]], this.board[wins[results.i][2][0]][wins[results.i][2][1]]];
            this.winningSpaceTest(results).then((results) => {
                results.j++;
                return this.winningSpaceTest(results);
            }).then((results) => {
                results.j++;
                return this.winningSpaceTest(results);
            }).then((results) => {
                if (results.open === 1 && (results.p1 === 2 || results.p2 === 2)) {
                    if (results.p2 === 2) {
                        resolve(results.openSpace);
                    } else if (results.p1 === 2) {
                        results.blockSpace = results.openSpace;
                        if (results.i < 7) {
                            results.i++;
                            this.winningMoves(results).then((space) => {
                                resolve(space);
                            })
                        } else {
                            resolve(results.blockSpace);
                        }
                    }
                } else {
                    if (results.i < 7) {
                        results.i++;
                        this.winningMoves(results).then((space) => {
                            resolve(space);
                        })
                    } else {
                        resolve(results.blockSpace);
                    }
                }
            })
        });
    }

    winningSpaceTest(results) {
        return new Promise((resolve, reject) => {
            if (results.spaces[results.j] === 0) {
                results.open++;
                results.openSpace = {x: wins[results.i][results.j][0], y: wins[results.i][results.j][1]};
            } else if (results.spaces[results.j] === 1) {
                results.p1++;
            } else {
                results.p2++;
            }
            resolve(results);
        });
    }

    randomSpace() {
        return new Promise((resolve, reject) => {
            if (this.board[1][1] === 0) {
                let roll = randInt(0, 101);
                if (roll > 25) {
                    resolve({x: 1, y: 1});
                } else {
                    let space = {x: "", y: ""};
                    space.x = randInt(0, 3);
                    space.y = randInt(0, 3);
                    if (this.checkSpace(space)) {
                        resolve(space);
                    } else {
                        this.randomSpace().then((space) => {
                            resolve(space);
                        })
                    }
                }
            } else {
                let space = {x: "", y: ""};
                space.x = randInt(0, 3);
                space.y = randInt(0, 3);
                if (this.checkSpace(space)) {
                    resolve(space);
                } else {
                    this.randomSpace().then((space) => {
                        resolve(space);
                    })
                }
            }
        });
    }

    gameOverCheck(player) {
        return new Promise((resolve, reject) => {
            if (this.turn > 4) {
                let i = 0;
                for (i; i < wins.length; i++) {
                    if (this.board[wins[i][0][0]][wins[i][0][1]] === player && this.board[wins[i][1][0]][wins[i][1][1]] === player && this.board[wins[i][2][0]][wins[i][2][1]] === player) {
                        resolve(wins[i]);
                    } else {
                        if (i === 7) {
                            resolve(false);
                        }
                    }
                }
            } else {
                resolve(false);
            }
        });
    }

    gameOver(winner) {
        const message = document.getElementById('message');
        if (winner === 0) {
            message.innerHTML = 'Draw!';
            message.className = "message-draw";
            localStorage.tictacToeDraws++;
        } else if (winner === 1) {
            message.innerHTML = 'You Win!';
            message.className = "message-win";
            localStorage.tictactoeWins++;
        } else {
            message.innerHTML = 'You Lose!';
            message.className = "message-loss";
            localStorage.tictactoeLosses++;
        }
        displayScores();
        this.canvas.removeEventListener("click", this.click);
    }

    drawX(dims) {
        return new Promise((resolve, reject) => {
            const topX = (dims.x * 100) + (100 * 0.05);
            const botX = (dims.x * 100) + (100 * 0.95);
            const leftY = (dims.y * 100) + (100 * 0.05);
            const rightY = (dims.y * 100) + (100 * 0.95);

            this.ctx.beginPath();
            this.ctx.strokeStyle = "#f00";
            this.ctx.lineWidth = 5;
            this.ctx.moveTo(topX, leftY);
            this.ctx.lineTo(botX, rightY);
            this.ctx.moveTo(botX, leftY);
            this.ctx.lineTo(topX, rightY);
            this.ctx.stroke();
            this.turn++;
            resolve();
        });
    }

    drawO(dims) {
        return new Promise((resolve, reject) => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#00f";
            this.ctx.lineWidth = 5;
            this.ctx.arc((dims.x * 100) + (100 * 0.5), (dims.y * 100) + (100 * 0.5), 45, 0, 2 * Math.PI, false);
            this.ctx.stroke();
            this.turn++;
            resolve();
        });
    }
}
export default TicTacToe;
