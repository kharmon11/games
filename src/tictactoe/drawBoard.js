const drawBoard = function (boardCanvas, ctx) {
    const size = [boardCanvas.offsetWidth / 3, boardCanvas.offsetWidth * (2/3), boardCanvas.offsetWidth];
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.lineWidth = 10;
    ctx.moveTo(size[0], 0);
    ctx.lineTo(size[0], size[2]);
    ctx.moveTo(size[1], 0);
    ctx.lineTo(size[1], size[2]);
    ctx.moveTo(0, size[0]);
    ctx.lineTo(size[2], size[0]);
    ctx.moveTo(0, size[1]);
    ctx.lineTo(size[2], size[1]);
    ctx.stroke();
};
export {drawBoard};
