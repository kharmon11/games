const drawBoard = function (boardCanvas, ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.lineWidth = 10;
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 300);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 300);
    ctx.moveTo(0, 100);
    ctx.lineTo(300, 100);
    ctx.moveTo(0, 200);
    ctx.lineTo(300, 200);
    ctx.stroke();
};
export {drawBoard};
