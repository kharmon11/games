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
        this.board = [[], [], [], []]

        this.renderBoard = this.renderBoard.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
        this.renderBlankTitles = this.renderBlankTitles.bind(this);
        this.start = this.start.bind(this);
        this.generateTile = this.generateTile.bind(this);
        this.startingTiles = this.startingTiles.bind(this);
        this.drawBoard = this.drawBoard.bind(this);
        this.drawTile = this.drawTile.bind(this);

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
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    this.board[i].push(0);
                    this.ctx.fillRect((10 + (i * 125)), (10 + (j * 125)), 105, 105);
                }
            }
            resolve();
        });
    }

    start() {
        this.startingTiles().then(() => {
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
                if (randInt(1, 101) < 95) {
                    this.board[tile[0]][tile[1]] = 2;
                } else {
                    this.board[tile[0]][tile[1]] = 4;
                }
                return this.generateTile();
            }).then((tile) => {
                if (randInt(1, 101) < 95) {
                    this.board[tile[0]][tile[1]] = 2;
                } else {
                    this.board[tile[0]][tile[1]] = 4;
                }
                resolve();
            })
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
        return new Promise((resolve, reject) => {
            this.ctx.fillStyle = "#ccf";
            this.ctx.fillRect((10 + (i * 125)), (10 + (j * 125)), 105, 105);
            resolve();
        })
    }

    drawTileNumber(i, j, num) {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#003";
        this.ctx.font = "80px Verdana";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(num, 60 + (i * 125), 60 + (j * 125));
    }

    keyPress(event) {
        const key = event.keyCode;
        if (key > 36 && key < 41) {
            console.log(key,arrowKeys[key]);
        }
    }

}
export default Game;