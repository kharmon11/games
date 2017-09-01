/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preloadCards = __webpack_require__(10);

var _game = __webpack_require__(11);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof Storage !== "undefined") {
    if (localStorage.blackjackWins) {
        document.getElementById("wins_score").innerHTML = localStorage.blackjackWins;
        document.getElementById("losses_score").innerHTML = localStorage.blackjackLosses;
        document.getElementById("draws_score").innerHTML = localStorage.blackjackDraws;
    } else {
        localStorage.setItem("blackjackWins", 0);
        localStorage.setItem("blackjackLosses", 0);
        localStorage.setItem("blackjackDraws", 0);
    }
}

var dealBtn = document.getElementById('deal_btn');
function deal() {
    if (document.getElementById('dealer_card1') !== "") {
        document.getElementById('dealer_score').innerHTML = "";
        document.getElementById('game_result').innerHTML = "";
        document.getElementById('dealer_cards').innerHTML = "<div id='dealer_card1' class='dealer-card-div card-div'></div>" + "<div id='dealer_card2' class='dealer-card-div card-div'></div>";
        document.getElementById('player_cards').innerHTML = "<div id='player_card1' class='player-card-div card-div'>" + "</div> <div id='player_card2' class='player-card-div card-div'></div>";
    }
    var game = new _game2.default();
    game.start();
}
dealBtn.addEventListener('click', deal);

(0, _preloadCards.preloadCards)();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var preloadCards = function preloadCards() {
    var ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    var suits = ["c", "s", "d", "h"];
    var dir = "static/img/cards/";
    var i = void 0,
        j = void 0,
        rank = void 0;
    for (i = 0; i < ranks.length; i++) {
        if (ranks[i] < 10) {
            rank = "0" + ranks[i];
        } else {
            rank = ranks[i];
        }
        for (j = 0; j < suits.length; j++) {
            var cardImage = new Image();
            cardImage.src = dir + suits[j] + rank + ".bmp";
        }
    }
    var extraCards = new Image();
    extraCards.src = 'static/img/cards/b1fv.bmp';
    extraCards.src = 'static/img/cards/b1pl.bmp';
};
exports.preloadCards = preloadCards;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deck = __webpack_require__(12);

var _deck2 = _interopRequireDefault(_deck);

var _hand = __webpack_require__(14);

var _hand2 = _interopRequireDefault(_hand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.deck = new _deck2.default();
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

    _createClass(Game, [{
        key: 'start',
        value: function start() {
            this.dealCards();
            if (this.playerHand.score === 21) {
                this.stay();
            }
        }
    }, {
        key: 'dealCards',
        value: function dealCards() {
            var _this = this;

            this.dealerHand = new _hand2.default([this.deck.cards[0], this.deck.cards[1]], "dealer");
            this.dealerHand.calcScore();
            this.showCards(this.dealerHand);
            this.playerHand = new _hand2.default([this.deck.cards[2], this.deck.cards[3]], "player");
            this.playerHand.calcScore().then(function () {
                document.getElementById("player_running_score").innerHTML = _this.playerHand.score;
            });
            this.showCards(this.playerHand);
            this.deckSpot = 4;
            var hitBtn = document.getElementById("hit_btn");
            var stayBtn = document.getElementById("stay_btn");
            hitBtn.addEventListener("click", this.hit);
            hitBtn.style.display = "inline-block";
            stayBtn.addEventListener("click", this.stay);
            stayBtn.style.display = "inline-block";
        }
    }, {
        key: 'showCards',
        value: function showCards(hand) {
            if (hand.owner === "dealer") {
                var dealerCard1 = document.getElementById("dealer_card1");
                dealerCard1.innerHTML = "<img src='static/img/cards/b1pl.bmp'>";

                var dealerCard2 = document.getElementById("dealer_card2");
                dealerCard2.innerHTML = this.cardImageElement(hand.cards[1]);
            } else {
                var playerCard1 = document.getElementById("player_card1");
                playerCard1.innerHTML = this.cardImageElement(hand.cards[0]);
                var playerCard2 = document.getElementById("player_card2");
                playerCard2.innerHTML = this.cardImageElement(hand.cards[1]);
            }
        }
    }, {
        key: 'cardImageElement',
        value: function cardImageElement(card) {
            return "<img src='" + card.img + "'>";
        }
    }, {
        key: 'displayScore',
        value: function displayScore() {
            document.getElementById("player_running_score").innerHTML = this.playerHand.score;
        }
    }, {
        key: 'hit',
        value: function hit() {
            var _this2 = this;

            this.addCard(this.playerHand, this.deck.cards[this.deckSpot]).then(function () {
                return _this2.playerHand.calcScore();
            }).then(function () {
                _this2.displayScore();
                var playerCards = document.getElementById("player_cards");
                var hand = _this2.playerHand.cards;
                playerCards.innerHTML += "<div id='player_card" + hand.length + "' class='player-card-div card-div'>" + _this2.cardImageElement(hand[hand.length - 1]) + "</div>";
                if (_this2.playerHand.score > 21) {
                    _this2.gameOver("loss");
                }
            });
        }
    }, {
        key: 'stay',
        value: function stay() {
            // document.getElementById("hit_btn").disabled = true;
            // document.getElementById("stay_btn").disabled = true;
            this.dealerTurn();
        }
    }, {
        key: 'addCard',
        value: function addCard(hand, newCard) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                hand.cards.push(newCard);
                _this3.deckSpot++;
                resolve();
            });
        }
    }, {
        key: 'dealerTurn',
        value: function dealerTurn() {
            var _this4 = this;

            var dealerCards = document.getElementById("dealer_cards");
            var hand = this.dealerHand.cards;
            dealerCards.innerHTML = "<div class='dealer-card-div card-div'>" + this.cardImageElement(hand[0]) + "</div><div class='dealer-card-div card-div'>" + this.cardImageElement(hand[1]) + "</div>";
            if (this.dealerHand.score < 17 || this.dealerHand.score === 17 && this.aces > 0) {
                this.dealerHit(dealerCards).then(function (result) {
                    if (result === "safe") {
                        _this4.gameOver();
                    } else {
                        _this4.gameOver("win");
                    }
                });
            } else {
                this.gameOver();
            }
        }
    }, {
        key: 'dealerHit',
        value: function dealerHit(dealerCards) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                _this5.addCard(_this5.dealerHand, _this5.deck.cards[_this5.deckSpot]).then(function () {
                    _this5.deckSpot++;
                    dealerCards.innerHTML += "<div class='dealer-card-div card-div'>" + _this5.cardImageElement(_this5.dealerHand.cards[_this5.dealerHand.cards.length - 1]) + "</div>";
                    _this5.dealerHand.calcScore().then(function () {
                        if (_this5.dealerHand.score < 17) {
                            _this5.dealerHit(dealerCards).then(function (result) {
                                resolve(result);
                            });
                        } else if (_this5.dealerHand.score > 21) {
                            resolve("bust");
                        } else {
                            resolve("safe");
                        }
                    });
                });
            });
        }
    }, {
        key: 'gameOver',
        value: function gameOver(condition) {
            if (condition) {
                var result = document.getElementById("game_result");
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
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _card = __webpack_require__(13);

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deck = function () {
    function Deck() {
        _classCallCheck(this, Deck);

        this.ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        this.suits = ["c", "s", "d", "h"];
        this.cards = [];
        var i = void 0,
            j = void 0;
        for (i = 0; i < this.ranks.length; i++) {
            for (j = 0; j < this.suits.length; j++) {
                this.cards.push(new _card2.default(this.ranks[i], this.suits[j]));
            }
        }
    }

    _createClass(Deck, [{
        key: "shuffle",
        value: function shuffle() {
            var i = void 0,
                j = void 0,
                temp = void 0;
            for (i = this.cards.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = this.cards[i];
                this.cards[i] = this.cards[j];
                this.cards[j] = temp;
            }
        }
    }]);

    return Deck;
}();

exports.default = Deck;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function Card(rank, suit) {
    _classCallCheck(this, Card);

    this.rank = rank;
    this.suit = suit;
    this.img = "static/img/cards/";
    if (rank < 10) {
        this.img += this.suit + "0" + this.rank + ".bmp";
    } else {
        this.img += this.suit + this.rank + ".bmp";
    }
};

exports.default = Card;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hand = function () {
    function Hand(cards, owner) {
        _classCallCheck(this, Hand);

        this.cards = cards;
        this.owner = owner;
        this.cards[0]['hidden'] = true;
        this.cards[1]['hidden'] = false;
        this.aces = 0;
        this.score = 0;
        this.over = false;

        this.calcScore = this.calcScore.bind(this);
        this.cardRankConvert = this.cardRankConvert.bind(this);
    }

    _createClass(Hand, [{
        key: 'calcScore',
        value: function calcScore() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var i = void 0,
                    j = void 0,
                    k = void 0;
                _this.score = 0;
                for (i = 0; i < _this.cards.length; i++) {
                    _this.score = _this.score + _this.cardRankConvert(_this.cards[i]);
                }

                if (_this.score > 21) {
                    var aces = _this.aces;
                    for (j = 0; j < _this.aces; j++) {
                        _this.score = _this.score - 10;
                        aces--;
                        if (_this.score < 21) {
                            break;
                        }
                    }
                    _this.aces = aces;
                }
                resolve();
            });
        }
    }, {
        key: 'cardRankConvert',
        value: function cardRankConvert(card) {
            if (card.rank > 10) {
                return 10;
            } else if (card.rank === 1) {
                this.aces++;
                return 11;
            } else {
                return card.rank;
            }
        }
    }]);

    return Hand;
}();

exports.default = Hand;

/***/ })
/******/ ]);
//# sourceMappingURL=blackjack.js.map