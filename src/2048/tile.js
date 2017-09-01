class Tile {
    constructor(col, row) {
        this.col = col
        this.row = row;
        this.colors = {
            0: "#66d",
            2: "#ccf",
            4: "bbe",
            8: "#aad",
            16: "#99c",
            32: "#88b",
            64: "#77a",
            128: "#669",
            256: "#558",
            512: "#447",
            1024: "#336",
            2048: "#225",
        }
        this.value = 0;
        this.blankFill =
            this.fill = this.colors[this.value];
        if (this.value < 16) {
            this.textFill = "#003";
        } else {
            this.textFill = "#ccf";
        }
        this.textFill = "003";
    }

}

export default Tile;