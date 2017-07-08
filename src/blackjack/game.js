import Deck from '../cards/deck';

class Game {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.deckSpot = 0;
        this.dealerHand = [];
        this.playerHand = [];
        this.dealerCard1 = document.getElementById('dealer_card1');
        this.dealerCard2 = document.getElementById('dealer_card2');
        this.playerCard1 = document.getElementById('player_card1');
        this.playerCard2 = document.getElementById('player_card2');

        this.dealCards = this.dealCards.bind(this);
    }

    start() {
        this.dealCards();
    }

    dealCards() {
        this.dealercard1.innerHTML = "<img src='" + this.deck[0]
    }

}
export default Game;