const preloadCards = function () {
    const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const suits = ["c", "s", "d", "h"];
    const dir = "static/img/cards/";
    let i, j, rank;
    for (i = 0; i < ranks.length; i++) {
        if (ranks[i] < 10) {
            rank = "0" + ranks[i];
        } else {
            rank = ranks[i];
        }
        for (j = 0; j < suits.length; j++) {
            const cardImage = new Image();
            cardImage.src = dir + suits[j] + rank + ".bmp";
        }
    }
    const extraCards = new Image();
    extraCards.src = 'static/img/cards/b1fv.bmp';
    extraCards.src = 'static/img/cards/b1pl.bmp';
};
export {preloadCards};