import Deck from '../cards/deck';
import Hand from './hand';

class Game {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.deckSpot = 0;
        this.dealerCard1 = document.getElementById('dealer_card1');
        this.dealerCard2 = document.getElementById('dealer_card2');
        this.playerCard1 = document.getElementById('player_card1');
        this.playerCard2 = document.getElementById('player_card2');

        this.dealCards = this.dealCards.bind(this);
        this.showCards = this.showCards.bind(this);
        this.cardImageElement = this.cardImageElement.bind(this);
        this.displayScore = this.displayScore.bind(this);
        this.hit = this.hit.bind(this);
        this.stay = this.stay.bind(this);
        this.addCard = this.addCard.bind(this);
        this.dealerTurn = this.dealerTurn.bind(this);
        this.dealerHit = this.dealerHit.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }

    start() {
        this.dealCards();
        if (this.playerHand.score === 21) {
            this.stay();
        }
    }

    dealCards() {
        this.dealerHand = new Hand([this.deck.cards[0], this.deck.cards[1]], "dealer");
        this.dealerHand.calcScore();
        this.showCards(this.dealerHand);
        this.playerHand = new Hand([this.deck.cards[2], this.deck.cards[3]], "player");
        this.playerHand.calcScore().then(() => {
            document.getElementById("player_running_score").innerHTML = this.playerHand.score;
        });
        this.showCards(this.playerHand);
        this.deckSpot = 4;
        const hitBtn = document.getElementById("hit_btn");
        const stayBtn = document.getElementById("stay_btn");
        hitBtn.addEventListener("click", this.hit);
        hitBtn.style.display = "inline-block";
        stayBtn.addEventListener("click", this.stay);
        stayBtn.style.display = "inline-block";
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
        return "<img src='" + card.img + "'>";
    }

    displayScore() {
        document.getElementById("player_running_score").innerHTML = this.playerHand.score;
    }

    hit() {
        this.addCard(this.playerHand, this.deck.cards[this.deckSpot]).then(() => {
            return this.playerHand.calcScore();
        }).then(() => {
            this.displayScore();
            const playerCards = document.getElementById("player_cards");
            const hand = this.playerHand.cards;
            playerCards.innerHTML += "<div id='player_card" + hand.length + "' class='player-card-div card-div'>" +
                this.cardImageElement(hand[hand.length - 1]) + "</div>";
            if (this.playerHand.score > 21) {
                this.gameOver("loss");
            }
        });
    }

    stay() {
        // document.getElementById("hit_btn").disabled = true;
        // document.getElementById("stay_btn").disabled = true;
        this.dealerTurn();
    }

    addCard(hand, newCard) {
        return new Promise((resolve, reject) => {
            hand.cards.push(newCard);
            this.deckSpot++;
            resolve();
        });
    }

    dealerTurn() {
        const dealerCards = document.getElementById("dealer_cards");
        const hand = this.dealerHand.cards;
        dealerCards.innerHTML = "<div class='dealer-card-div card-div'>" + this.cardImageElement(hand[0]) +
            "</div><div class='dealer-card-div card-div'>" + this.cardImageElement(hand[1]) + "</div>";
        if (this.dealerHand.score < 17 || (this.dealerHand.score === 17 && this.aces > 0)) {
            this.dealerHit(dealerCards).then((result) => {
                if (result === "safe") {
                    this.gameOver();
                } else {
                    this.gameOver("win");
                }
            });
        } else {
            this.gameOver();
        }
    }

    dealerHit(dealerCards) {
        return new Promise((resolve, reject) => {
            this.addCard(this.dealerHand, this.deck.cards[this.deckSpot]).then(() => {
                this.deckSpot++;
                dealerCards.innerHTML += "<div class='dealer-card-div card-div'>" +
                    this.cardImageElement(this.dealerHand.cards[this.dealerHand.cards.length - 1]) + "</div>";
                this.dealerHand.calcScore().then(() => {
                    if (this.dealerHand.score < 17) {
                        this.dealerHit(dealerCards).then((result) => {
                            resolve(result);
                        });
                    } else if (this.dealerHand.score > 21) {
                        resolve("bust");
                    } else {
                        resolve("safe");
                    }
                })
            });
        });
    }

    gameOver(condition) {
        if (condition) {
            const result = document.getElementById("game_result");
            if (condition === "win") {
                result.innerHTML = "You Win!";
                localStorage.blackjackWins++;
            } else if (condition === "loss") {
                result.innerHTML = "You Lose!";
                localStorage.blackjackLosses++;
            } else {
                result.innerHTML = "Draw";
                localStorage.blackjackDraws++;
            }
            document.getElementById("wins_score").innerHTML = localStorage.blackjackWins;
            document.getElementById("losses_score").innerHTML = localStorage.blackjackLosses;
            document.getElementById("draws_score").innerHTML = localStorage.blackjackDraws;
            document.getElementById('hit_btn').removeEventListener('click', this.hit);
            document.getElementById('stay_btn').removeEventListener('click', this.stay);
            document.getElementById("dealer_score").innerHTML = this.dealerHand.score;
        } else {
            if (this.playerHand.score > this.dealerHand.score) {
                this.gameOver("win");
            } else if (this.playerHand.score < this.dealerHand.score) {
                this.gameOver("loss");
            } else {
                this.gameOver("draw");
            }
        }

    }
}
export default Game;