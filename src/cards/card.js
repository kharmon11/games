class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.img = "{{ url_for('static', filename='" + this.suit + this.rank + ".bmp') }}";
    }
}

export default Card;