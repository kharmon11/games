import Deck from '../cards/deck';
import Hand from './hand';

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
        this.showCards = this.showCards.bind(this);
        this.cardImageElement = this.cardImageElement.bind(this);
    }

    start() {
        this.dealCards();
    }

    dealCards() {
        const dealerHand = new Hand([this.deck.cards[0], this.deck.cards[1]], "dealer");
        dealerHand.calcScore();
        this.showCards(dealerHand);
        const playerHand = new Hand([this.deck.cards[2], this.deck.cards[3]], "player");
        playerHand.calcScore();
        this.showCards(playerHand);
        this.deckSpot = 3;
    }

    showCards(hand) {
        if (hand.owner === "dealer") {
            const dealerCard1 = document.getElementById("dealer_card1");
            dealerCard1.innerHTML = "<img src='static/img/cards/b1pl.bmp'>";

            const dealerCard2 = document.getElementById("dealer_card2");
            dealerCard2.innerHTML = this.cardImageElement(hand.cards[1]);
        } else {
            const playerCard1 = document.getElementById("player_card1");
            playerCard1.innerHTML = this.cardImageElement(hand.cards[0]);
            const playerCard2 = document.getElementById("player_card2");
            playerCard2.innerHTML = this.cardImageElement(hand.cards[1]);
        }
    }

    cardImageElement(card) {
        let rank;
        if (card.rank < 10) {
            rank = "0" + card.rank;
        } else {
            rank = card.rank;
        }
        return "<img src='static/img/cards/" + card.suit + rank + ".bmp'>";

    }

}
export default Game;