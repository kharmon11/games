class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.img = "static/img/cards/";
        if (rank < 10) {
            this.img += this.suit + "0" + this.rank + ".bmp";
        } else {
            this.img += this.suit + this.rank + ".bmp";
        }
    }
}

export default Card;