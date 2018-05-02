const boardColor = "#954";
const rowColor = "#843";
const pegSpotColor = "#222";

class ConsolePeg {
    constructor(ctx, name, fill, x, y) {
        this.ctx = ctx;
        this.name = name;
        this.fill = fill;
        this.x = x;
        this.y = y;
        this.radius = 14;
        this.selected = false;
    }

    render() {
        const grad = this.ctx.createRadialGradient(this.x + 4, this.y - 4, 1, this.x, this.y, this.radius);
        grad.addColorStop(0, "#fff");
        grad.addColorStop(0.3, this.fill);
        this.ctx.beginPath();
        this.ctx.fillStyle = grad;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 3;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    select() {
        this.selected = true;
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#cc0";
        this.ctx.lineWidth = 3;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    deselect() {
        this.selected = false;
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 3;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }
}

class Row {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        if (y > 43) {
            this.width = 290;
        } else {
            this.width = 175;
        }
        this.height = 40;
        this.fill = rowColor;
        this.pegSpots = [];
        this.pipBoard;

        this.render = this.render.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
        this.renderPegSpots = this.renderPegSpots.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    render() {
        this.renderBackground().then(() => {
            this.renderPegSpots();
            if (this.y > 43) {
                this.renderPipBoard();
                if (this.y > 425) {
                    this.renderButton();
                }
            }
        })
    }

    renderBackground() {
        return new Promise((resolve, reject) => {
            this.ctx.fillStyle = this.fill;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
            resolve();
        });
    }

    renderPegSpots() {
        for (let i = 0; i < 4; i++) {
            this.pegSpots.push(new PegSpot(this.ctx, 26 + (43 * i), this.y + 21));
            this.pegSpots[i].render();
        }
    }

    renderPipBoard() {
        this.pipBoard = new PipBoard(this.ctx, 180, this.y + 5);
        this.pipBoard.render();
    }

    renderButton() {
        return new Promise((resolve, reject) => {
            this.ctx.fillStyle = "#888";
            this.ctx.fillRect(230, this.y + 8, 50, 25);
            resolve();
        }).then(() => {
            this.ctx.font = "12px Verdana";
            this.ctx.fillStyle = "#0f0";
            this.ctx.fillText("CHECK", 235, this.y + 25);
        })
    }
}

class PegSpot {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = 16;
        this.fill = pegSpotColor;
    }

    render(final) {
        return new Promise((resolve, reject) => {
            this.ctx.beginPath();
            this.ctx.fillStyle = this.fill;
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.ctx.fill();
            resolve();
        }).then(() => {
            if (this.y < 43 && !final) {
                this.ctx.font = "20px Verdana";
                this.ctx.fillStyle = "#fff";
                this.ctx.fillText("?", this.x - 5, this.y + 8);
            }
            if (this.fill !== pegSpotColor) {
                const grad = this.ctx.createRadialGradient(this.x + 4, this.y - 4, 1, this.x, this.y, this.radius);
                grad.addColorStop(0, "#fff");
                grad.addColorStop(0.3, this.fill);
                this.ctx.beginPath();
                this.ctx.fillStyle = grad;
                this.ctx.fillStyle = grad;
                this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        });


    }
}

class PipBoard {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.fill = boardColor;
        this.length = 33;
        this.pips = [];

        this.render = this.render.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
        this.renderPips = this.renderPips.bind(this);
    }

    render() {
        this.renderBackground().then(() => {
            this.renderPips();
        });
    }

    renderBackground() {
        return new Promise((resolve, reject) => {
            this.ctx.fillStyle = this.fill;
            this.ctx.fillRect(this.x, this.y, this.length, this.length);
            resolve();
        });
    }

    renderPips() {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                this.ctx.beginPath();
                this.ctx.fillStyle = "#000";
                this.pips.push({x: this.x + 10 + (13 * i), y: this.y + 10 + (13 * j), color: "#000", radius: 5});
                this.ctx.arc(this.pips[(i * 2) + j].x, this.pips[(i * 2) + j].y, 5, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
    }
}

export {ConsolePeg, Row};