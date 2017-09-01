import blankBoard from './blankBoard';
import {randInt} from '../utils/randInt';

const arrowKeys = {
    "37": "left",
    "38": "up",
    "39": "right",
    "40": "down"
}

class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.board = JSON.parse(localStorage.getItem("state2048"));

        this.renderBoard = this.renderBoard.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
        this.renderBlankTitles = this.renderBlankTitles.bind(this);
        this.start = this.start.bind(this);
        this.generateTile = this.generateTile.bind(this);
        this.startingTiles = this.startingTiles.bind(this);
        this.drawBoard = this.drawBoard.bind(this);
        this.drawTile = this.drawTile.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.tileSlide = this.tileSlide.bind(this);
        this.leftSlide = this.leftSlide.bind(this);
        this.rightSlide = this.rightSlide.bind(this);
        this.upSlide = this.upSlide.bind(this);
        this.downSlide = this.downSlide.bind(this);
        this.scoreManager = this.scoreManager.bind(this);
        this.gameOverTest = this.gameOverTest.bind(this);
    }

    renderBoard() {
        this.renderBackground().then(() => {
            return this.renderBlankTitles();
        }).then(() => {
            this.start();
        })
    }

    renderBackground() {
        return new Promise((resolve, reject) => {
            this.ctx.fillStyle = "#33a";
            this.ctx.fillRect(0, 0, 500, 500);
            resolve();
        })
    }

    renderBlankTitles() {
        return new Promise((resolve, reject) => {
            this.ctx.fillStyle = "#66d";
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    this.ctx.fillRect((10 + (i * 125)), (10 + (j * 125)), 105, 105);
                }
            }
            resolve();
        });
    }

    start() {
        this.startingTiles().then(() => {
            document.getElementById("current_score_number").innerHTML = localStorage.getItem("currentScore2048");
            this.drawBoard();
        })
    }

    generateTile() {
        return new Promise((resolve, reject) => {
            const space = [randInt(0, 4), randInt(0, 4)];
            if (this.board[space[0]][space[1]] === 0) {
                resolve(space);
            } else {
                this.generateTile().then((tile) => {
                    resolve(tile);
                })
            }
        })
    }

    startingTiles() {
        return new Promise((resolve, reject) => {
            this.generateTile().then((tile) => {
                if (randInt(1, 101) < 90) {
                    this.board[tile[0]][tile[1]] = 2;
                } else {
                    this.board[tile[0]][tile[1]] = 4;
                }
                return this.generateTile();
            }).then((tile) => {
                if (randInt(1, 101) < 90) {
                    this.board[tile[0]][tile[1]] = 2;
                } else {
                    this.board[tile[0]][tile[1]] = 4;
                }
                resolve();
            })
        });
    }

    addTileToBoard(tile) {
        return new Promise((resolve, reject) => {
            if (randInt(1, 101) < 90) {
                this.board[tile[0]][tile[1]] = 2;
            } else {
                this.board[tile[0]][tile[1]] = 4;
            }
            resolve();
        });
    }

    drawBoard() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.board[i][j] > 0) {
                    const num = this.board[i][j];
                    this.drawTile(i, j, num).then(() => {
                        this.drawTileNumber(i, j, num);
                    });
                }
            }
        }
    }

    drawTile(i, j, num) {
        const colors = {
            2: "#ccf",
            4: "#59f",
            8: "#00f",
            16: "#9f9",
            32: "#0f0",
            64: "#0a0",
            128: "#fcf",
            256: "#f9f",
            512: "#f3f",
            1024: "#f0f",
            2048: "#f00",
        }
        return new Promise((resolve, reject) => {
            this.ctx.fillStyle = colors[num];
            this.ctx.fillRect((10 + (i * 125)), (10 + (j * 125)), 105, 105);
            resolve();
        })
    }

    drawTileNumber(i, j, num) {
        const darkTextColor = [2,4,16,32,128,256]
        this.ctx.beginPath();
        if (darkTextColor.includes(num)) {
            this.ctx.fillStyle = "#003";
        } else {
            this.ctx.fillStyle = "#ccf";
        }
        let fontSize;
        if (num < 10) {
            fontSize = "80";
        } else if (num >= 10 && num < 100) {
            fontSize = "60";
        } else if (num >= 100 && num < 1000) {
            fontSize = "40";
        } else if (num >= 1000) {
            fontSize = "20";
        }
        this.ctx.font = fontSize + "px Verdana";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(num, 60 + (i * 125), 60 + (j * 125));
    }

    keyPress(event) {
        if (event.keyCode > 36 && event.keyCode < 41) {
            this.tileSlide(event.keyCode).then(() => {
                this.gameOverTest().then((result) => {
                    if (result) {
                        alert("Game Over!");
                        window.removeEventListener('keydown', this.keyPress);
                        localStorage.setItem("currentScore2048", 0);
                        localStorage.setItem("state2048", JSON.stringify(blankBoard));
                    } else {
                        localStorage.setItem("state2048", JSON.stringify(this.board));
                        this.renderBlankTitles().then(() => {
                            return this.generateTile();
                        }).then((tile) => {
                            return this.addTileToBoard(tile)
                        }).then(() => {
                            this.drawBoard();
                        })
                    }
                });
            });
        }
    }

    tileSlide(key) {
        return new Promise((resolve, reject) => {
                if (key === 37) {
                    this.leftSlide().then(() => {
                        resolve();
                    });
                } else if (key === 38) {
                    this.upSlide().then(() => {
                        resolve();
                    });
                } else if (key === 39) {
                    this.rightSlide().then(() => {
                        resolve();
                    });
                } else if (key === 40) {
                    this.downSlide().then(() => {
                        resolve();
                    });
                } 
            }
        );
    }

    leftSlide() {
        return new Promise((resolve, reject) => {
            let spaceValue;
            for (let row = 0; row < 4; row++) {
                for (let col = 1; col < 4; col++) {
                    if (this.board[col][row] > 0) {
                        spaceValue = this.board[col][row];
                        for (let k = col - 1; k > -1; k--) {
                            if (this.board[k][row] === 0) {
                                this.board[k][row] = spaceValue;
                                this.board[k+1][row] = 0;
                            } else if (this.board[k][row] === spaceValue) {
                                this.board[k][row] = spaceValue * 2;
                                this.board[k+1][row] = 0;
                                this.scoreManager(spaceValue * 2);
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (row === 3) {
                    resolve();
                }
            }
        });
    }

    rightSlide() {
        return new Promise((resolve, reject) => {
            let spaceValue;
            for (let row = 0; row < 4; row++) {
                for (let col = 2; col > -1; col--) {
                    if (this.board[col][row] > 0) {
                        spaceValue = this.board[col][row];
                        for (let k = col + 1; k < 4; k++) {
                            if (this.board[k][row] === 0) {
                                this.board[k][row] = spaceValue;
                                this.board[k-1][row] = 0;
                            } else if (this.board[k][row] === spaceValue) {
                                this.board[k][row] = spaceValue * 2;
                                this.board[k-1][row] = 0;
                                this.scoreManager(spaceValue * 2);
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (row === 3) {
                    resolve();
                }
            }
        });
    }

    upSlide() {
        return new Promise((resolve, reject) => {
            let spaceValue;
            for (let col=0; col<4; col++) {
                for (let row=1; row<4; row++) {
                    if (this.board[col][row] > 0) {
                        spaceValue = this.board[col][row];
                        for (let k=row-1; k>-1; k--) {
                            if (this.board[col][k] === 0) {
                                this.board[col][k] = spaceValue;
                                this.board[col][k+1] = 0;
                            } else if (this.board[col][k] === spaceValue) {
                                this.board[col][k] = spaceValue * 2;
                                this.board[col][k+1] = 0;
                                this.scoreManager(spaceValue * 2);
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (col === 3) {
                    resolve();
                }
            }
        });
    }
// 32 darken text. 128 shrink text.
    downSlide() {
        return new Promise((resolve, reject) => {
            let spaceValue;
            for (let col=0; col<4; col++) {
                for (let row=2; row>-1; row--) {
                    if (this.board[col][row] > 0) {
                        spaceValue = this.board[col][row];
                        for (let k=row+1; k<4; k++) {
                            if (this.board[col][k] === 0) {
                                this.board[col][k] = spaceValue;
                                this.board[col][k-1] = 0;
                            } else if (this.board[col][k] === spaceValue) {
                                this.board[col][k] = spaceValue * 2;
                                this.board[col][k-1] = 0;
                                this.scoreManager(spaceValue * 2);
                            } else {
                                break;
                            }
                        }
                    }
                }
                if (col === 3) {
                    resolve();
                }
            }
        });
    }

    scoreManager(num) {
        localStorage.setItem("currentScore2048", parseInt(localStorage.currentScore2048) + num);
        document.getElementById("current_score_number").innerHTML = localStorage.getItem("currentScore2048");
        if (localStorage.getItem("currentScore2048") > Number(localStorage.getItem("highScore2048"))) {
            localStorage.setItem("highScore2048",localStorage.currentScore2048);
            document.getElementById("high_score_number").innerHTML = localStorage.getItem("highScore2048");
        }
    }

    gameOverTest() {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (this.board[i][j] === 0) {
                        resolve(false);
                    } 
                }
            }
            resolve(true);
        });
    }
}

export default Game;