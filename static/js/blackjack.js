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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(7);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dealBtn = document.getElementById('deal_btn');
function deal() {
    dealBtn.style.display = 'none';
    var game = new _game2.default();
    game.start();
}
dealBtn.addEventListener('click', deal);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deck = __webpack_require__(8);

var _deck2 = _interopRequireDefault(_deck);

var _hand = __webpack_require__(10);

var _hand2 = _interopRequireDefault(_hand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.deck = new _deck2.default();
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

    _createClass(Game, [{
        key: 'start',
        value: function start() {
            this.dealCards();
        }
    }, {
        key: 'dealCards',
        value: function dealCards() {
            var dealerHand = new _hand2.default([this.deck.cards[0], this.deck.cards[1]], "dealer");
            dealerHand.calcScore();
            this.showCards(dealerHand);
            var playerHand = new _hand2.default([this.deck.cards[2], this.deck.cards[3]], "player");
            playerHand.calcScore();
            this.showCards(playerHand);
            this.deckSpot = 3;
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
            var rank = void 0;
            if (card.rank < 10) {
                rank = "0" + card.rank;
            } else {
                rank = card.rank;
            }
            return "<img src='static/img/cards/" + card.suit + rank + ".bmp'>";
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _card = __webpack_require__(9);

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
/* 9 */
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
    this.img = "{{ url_for('static', filename='" + this.suit + this.rank + ".bmp') }}";
};

exports.default = Card;

/***/ }),
/* 10 */
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
                var i = void 0;
                _this.score = 0;
                for (i = 0; i < _this.cards.length; i++) {
                    _this.score = _this.score + _this.cardRankConvert();
                }
                if (_this.score > 21) {
                    var aces = _this.aces;
                    var j = void 0;
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