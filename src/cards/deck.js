import Card from './card';

class Deck {
    constructor() {
        this.ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        this.suits = ["clubs", "spades", "diamonds", "hearts"];
        this.cards = [];
        let i, j;
        for (i = 0; i < this.ranks.length; i++) {
            for (j = 0; j < this.suits.length; j++) {
                this.cards.push(Card(rank[i], suit[j]));
            }
        }
    }

    shuffle(deck) {
        let i, j, temp;
        for (i = deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
        return deck;
    }
}
export default Deck;