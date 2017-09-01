import Tile from './tile';

class Board {
    constructor() {
        this.board = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]];

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                this.board[row][col] = new Tile(col, row);
            }
        }
    }

    render() {
        this.renderBackground().then(() => {
            return this.renderBlankTiles();
        }).then(() => {

        })
    }

    renderBackground() {
        return new Promise((resolve, reject) => {
            this.ctx.fillStyle = "#33a";
            this.ctx.fillRect(0, 0, 500, 500);
            resolve();
        });
    }

    renderBlankTiles() {
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
}

export default Board;