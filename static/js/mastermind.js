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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Generate random integer between 'min' and 'max'. 'min' is inclusive while 'max' is exclusive.
// randInt(1,11) can generate '1' but not '11'

var randInt = function randInt(min, max) {
  min = Math.floor(min);
  max = Math.ceil(max);
  return Math.floor(Math.random() * (max - min) + min);
};
exports.randInt = randInt;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(12);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boardCanvas = document.getElementById('board');
var ctx = boardCanvas.getContext('2d');

if (typeof Storage !== "undefined") {
    if (localStorage.mastermindWins) {
        document.getElementById("wins_score").innerHTML = localStorage.mastermindWins;
        document.getElementById("losses_score").innerHTML = localStorage.mastermindLosses;
    } else {
        localStorage.setItem("mastermindWins", 0);
        localStorage.setItem("mastermindLosses", 0);
        document.getElementById("wins_score").innerHTML = localStorage.mastermindWins;
        document.getElementById("losses_score").innerHTML = localStorage.mastermindLosses;
    }
}

var game = new _game2.default(boardCanvas, ctx);
game.start();
boardCanvas.addEventListener('click', game.click);

function newGame() {
    var newGame = new _game2.default(boardCanvas, ctx);
    newGame.start();
    boardCanvas.addEventListener('click', newGame.click);
}
document.getElementById("new_game_btn").addEventListener('click', newGame);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _components = __webpack_require__(13);

var _randInt = __webpack_require__(0);

var _insideCircle = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pegColors = {
    "red": "#f00",
    "purple": "#a4a",
    "white": "#ddd",
    "orange": "#f90",
    "yellow": "#ff0",
    "blue": "#00d",
    "black": "#000",
    "green": "#0f0"
};

var Game = function () {
    function Game(canvas, ctx) {
        _classCallCheck(this, Game);

        this.canvas = canvas;
        this.ctx = ctx;
        this.cols = 4;
        this.duplicates = false;
        this.consolePegs = [];
        this.rows = [];
        this.pegNames = ["red", "purple", "white", "orange", "yellow", "blue", "black", "green"];
        this.pattern = [];
        this.turn = 0;
        this.selected = false;
        this.guess = ["", "", "", ""];

        this.start = this.start.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.renderConsole = this.renderConsole.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.createPattern = this.createPattern.bind(this);
        this.arrayCheck = this.arrayCheck.bind(this);
        this.click = this.click.bind(this);
        this.getCursorCoords = this.getCursorCoords.bind(this);
        this.consoleClick = this.consoleClick.bind(this);
        this.rowClick = this.rowClick.bind(this);
        this.checkGuess = this.checkGuess.bind(this);
        this.drawPips = this.drawPips.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }

    _createClass(Game, [{
        key: 'start',
        value: function start() {
            this.renderBoard();
            this.renderConsole();
            this.renderRows();
            this.createPattern(0).then(function () {
                // console.log(this.pattern);
            });
        }
    }, {
        key: 'renderBoard',
        value: function renderBoard() {
            this.ctx.fillStyle = "#954";
            this.ctx.fillRect(0, 0, 300, 550);
        }
    }, {
        key: 'renderConsole',
        value: function renderConsole() {
            this.ctx.fillStyle = "#000";
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(25, 475, 250, 70);
            var pegData = [["red", "#f00", 50, 494], ["purple", "#a4a", 113, 494], ["white", "#ddd", 173, 494], ["orange", "#f90", 240, 494], ["yellow", "#ff0", 50, 526], ["blue", "#00d", 113, 526], ["black", "#000", 173, 526], ["green", "#0f0", 240, 526]];
            for (var i = 0; i < pegData.length; i++) {
                this.consolePegs.push(new _components.ConsolePeg(this.ctx, pegData[i][0], pegData[i][1], pegData[i][2], pegData[i][3]));
                this.consolePegs[i].render();
            }
        }
    }, {
        key: 'renderRows',
        value: function renderRows() {
            var x = 5;
            var y = void 0;
            for (var i = 0; i < 11; i++) {
                y = 432 - 43 * i;
                this.rows.push(new _components.Row(this.ctx, x, y));
                this.rows[i].render();
            }
        }
    }, {
        key: 'createPattern',
        value: function createPattern(i) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.arrayCheck().then(function (int) {
                    _this.pattern.push(_this.pegNames[int]);
                    if (i < 3) {
                        _this.createPattern(i + 1).then(function () {
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                });
            });
        }
    }, {
        key: 'arrayCheck',
        value: function arrayCheck() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var int = (0, _randInt.randInt)(0, 8);
                if (_this2.pattern.includes(_this2.pegNames[int])) {
                    _this2.arrayCheck().then(function (int) {
                        resolve(int);
                    });
                } else {
                    resolve(int);
                }
            });
        }
    }, {
        key: 'click',
        value: function click(event) {
            var _this3 = this;

            this.getCursorCoords(event).then(function (coords) {
                // console.log("click", coords.x, coords.y);
                if (25 <= coords.x && coords.x <= 275 && 485 <= coords.y && coords.y <= 545) {
                    _this3.consoleClick(coords.x, coords.y);
                } else {
                    if (432 - 43 * _this3.turn <= coords.y && coords.y <= 472 - 43 * _this3.turn) {
                        _this3.rowClick(coords.x, coords.y);
                    }
                }
            });
        }
    }, {
        key: 'getCursorCoords',
        value: function getCursorCoords(event) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                var rect = _this4.canvas.getBoundingClientRect();
                resolve({
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                });
            });
        }
    }, {
        key: 'consoleClick',
        value: function consoleClick(x, y) {
            for (var i = 0; i < this.consolePegs.length; i++) {
                if ((0, _insideCircle.insideCircle)(x, y, this.consolePegs[i].x, this.consolePegs[i].y, this.consolePegs[i].radius + 10)) {
                    for (var j = 0; j < this.consolePegs.length; j++) {
                        if (this.consolePegs[j].selected && this.consolePegs[j].name !== this.consolePegs[i].name) {
                            this.consolePegs[j].deselect();
                        }
                    }
                    this.selected = this.consolePegs[i].name;
                    this.consolePegs[i].select();
                }
            }
        }
    }, {
        key: 'rowClick',
        value: function rowClick(x, y) {
            var _this5 = this;

            if (x < 180) {
                if (this.selected) {
                    var pegSpots = this.rows[this.turn].pegSpots;
                    for (var i = 0; i < pegSpots.length; i++) {
                        if ((0, _insideCircle.insideCircle)(x, y, pegSpots[i].x, pegSpots[i].y, pegSpots[i].radius + 5)) {
                            pegSpots[i].fill = pegColors[this.selected];
                            this.guess[i] = this.selected;
                            pegSpots[i].render();
                            this.selected = false;
                            for (var j = 0; j < this.consolePegs[j].length; j++) {
                                if (this.consolePegs[j].selected) {
                                    this.consolePegs[j].deselect();
                                }
                            }
                            break;
                        }
                    }
                }
            } else if (x >= 230 && x <= 280 && y >= this.rows[this.turn].y + 8 && y <= this.rows[this.turn].y + 33) {
                this.checkGuess().then(function (result) {
                    if (result.correctSpot.length === 0 && result.inArray.length === 0) {
                        _this5.nextTurn();
                    } else {
                        _this5.drawPips(result).then(function () {
                            if (result.correctSpot.length === 4) {
                                _this5.gameOver("win");
                            } else {
                                if (_this5.turn === 9) {
                                    _this5.gameOver("lose");
                                } else {
                                    _this5.nextTurn();
                                }
                            }
                        });
                    }
                });
            }
        }
    }, {
        key: 'checkGuess',
        value: function checkGuess() {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                var result = {
                    correctSpot: [],
                    inArray: []
                };
                var correctSpot = void 0,
                    inArray = void 0;
                for (var i = 0; i < 4; i++) {
                    if (_this6.guess[i] === _this6.pattern[i]) {
                        result.correctSpot.push(_this6.guess[i]);
                    }
                }
                if (result.correctSpot.length === 4) {
                    resolve(result);
                } else {
                    for (var _i = 0; _i < 4; _i++) {
                        if (_this6.pattern.includes(_this6.guess[_i]) && !result.correctSpot.includes(_this6.guess[_i])) {
                            result.inArray.push(_this6.guess[_i]);
                        }
                        if (_i === 3) {
                            resolve(result);
                        }
                    }
                }
            });
        }
    }, {
        key: 'drawPips',
        value: function drawPips(result) {
            var _this7 = this;

            return new Promise(function (resolve, reject) {
                var pipNum = 0;
                if (result.correctSpot.length > 0) {
                    for (var i = 0; i < result.correctSpot.length; i++) {
                        var pip = _this7.rows[_this7.turn].pipBoard.pips[i];
                        _this7.ctx.beginPath();
                        _this7.ctx.fillStyle = "#f00";
                        _this7.ctx.arc(pip.x, pip.y, pip.radius, 0, 2 * Math.PI);
                        _this7.ctx.fill();
                        pipNum++;
                    }
                }
                if (result.inArray.length > 0) {
                    for (var _i2 = 0; _i2 < result.inArray.length; _i2++) {
                        var _pip = _this7.rows[_this7.turn].pipBoard.pips[_i2 + pipNum];
                        _this7.ctx.beginPath();
                        _this7.ctx.fillStyle = "#fff";
                        _this7.ctx.arc(_pip.x, _pip.y, _pip.radius, 0, 2 * Math.PI);
                        _this7.ctx.fill();
                    }
                }
                resolve();
            });
        }
    }, {
        key: 'nextTurn',
        value: function nextTurn() {
            this.turn++;
            this.rows[this.turn].renderButton();
        }
    }, {
        key: 'gameOver',
        value: function gameOver(result) {
            for (var i = 0; i < this.rows[10].pegSpots.length; i++) {
                this.rows[10].pegSpots[i].fill = pegColors[this.pattern[i]];
                this.rows[10].pegSpots[i].render("final").then(function () {});
            }
            this.ctx.font = "20px Verdana";
            var messageColor = void 0,
                messageText = void 0;
            if (result === "win") {
                messageColor = "#0f0";
                messageText = "SUCCESS";
                localStorage.mastermindWins++;
                document.getElementById("wins_score").innerHTML = localStorage.mastermindWins;
                document.getElementById("losses_score").innerHTML = localStorage.mastermindLosses;
            } else {
                messageColor = "#f00";
                messageText = "FAILURE";
                localStorage.mastermindLosses++;
            }
            this.ctx.fillStyle = messageColor;
            this.ctx.fillText(messageText, 190, 30);
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var boardColor = "#954";
var rowColor = "#843";
var pegSpotColor = "#222";

var ConsolePeg = function () {
    function ConsolePeg(ctx, name, fill, x, y) {
        _classCallCheck(this, ConsolePeg);

        this.ctx = ctx;
        this.name = name;
        this.fill = fill;
        this.x = x;
        this.y = y;
        this.radius = 14;
        this.selected = false;
    }

    _createClass(ConsolePeg, [{
        key: "render",
        value: function render() {
            var grad = this.ctx.createRadialGradient(this.x + 4, this.y - 4, 1, this.x, this.y, this.radius);
            grad.addColorStop(0, "#fff");
            grad.addColorStop(0.3, this.fill);
            this.ctx.beginPath();
            this.ctx.fillStyle = grad;
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#000";
            this.ctx.lineWidth = 3;
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }, {
        key: "select",
        value: function select() {
            this.selected = true;
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#cc0";
            this.ctx.lineWidth = 3;
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }, {
        key: "deselect",
        value: function deselect() {
            this.selected = false;
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#000";
            this.ctx.lineWidth = 3;
            this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }]);

    return ConsolePeg;
}();

var Row = function () {
    function Row(ctx, x, y) {
        _classCallCheck(this, Row);

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        if (y > 43) {
            this.width = 290;
        } else {
            this.width = 175;
        }
        this.height = 40;
        this.fill = rowColor;
        this.pegSpots = [];
        this.pipBoard;

        this.render = this.render.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
        this.renderPegSpots = this.renderPegSpots.bind(this);
        this.renderButton = this.renderButton.bind(this);
    }

    _createClass(Row, [{
        key: "render",
        value: function render() {
            var _this = this;

            this.renderBackground().then(function () {
                _this.renderPegSpots();
                if (_this.y > 43) {
                    _this.renderPipBoard();
                    if (_this.y > 425) {
                        _this.renderButton();
                    }
                }
            });
        }
    }, {
        key: "renderBackground",
        value: function renderBackground() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.ctx.fillStyle = _this2.fill;
                _this2.ctx.fillRect(_this2.x, _this2.y, _this2.width, _this2.height);
                resolve();
            });
        }
    }, {
        key: "renderPegSpots",
        value: function renderPegSpots() {
            for (var i = 0; i < 4; i++) {
                this.pegSpots.push(new PegSpot(this.ctx, 26 + 43 * i, this.y + 21));
                this.pegSpots[i].render();
            }
        }
    }, {
        key: "renderPipBoard",
        value: function renderPipBoard() {
            this.pipBoard = new PipBoard(this.ctx, 180, this.y + 5);
            this.pipBoard.render();
        }
    }, {
        key: "renderButton",
        value: function renderButton() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.ctx.fillStyle = "#888";
                _this3.ctx.fillRect(230, _this3.y + 8, 50, 25);
                resolve();
            }).then(function () {
                _this3.ctx.font = "12px Verdana";
                _this3.ctx.fillStyle = "#0f0";
                _this3.ctx.fillText("CHECK", 235, _this3.y + 25);
            });
        }
    }]);

    return Row;
}();

var PegSpot = function () {
    function PegSpot(ctx, x, y) {
        _classCallCheck(this, PegSpot);

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = 16;
        this.fill = pegSpotColor;
    }

    _createClass(PegSpot, [{
        key: "render",
        value: function render(final) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                _this4.ctx.beginPath();
                _this4.ctx.fillStyle = _this4.fill;
                _this4.ctx.arc(_this4.x, _this4.y, _this4.radius, 0, 2 * Math.PI);
                _this4.ctx.fill();
                resolve();
            }).then(function () {
                if (_this4.y < 43 && !final) {
                    _this4.ctx.font = "20px Verdana";
                    _this4.ctx.fillStyle = "#fff";
                    _this4.ctx.fillText("?", _this4.x - 5, _this4.y + 8);
                }
                if (_this4.fill !== pegSpotColor) {
                    var grad = _this4.ctx.createRadialGradient(_this4.x + 4, _this4.y - 4, 1, _this4.x, _this4.y, _this4.radius);
                    grad.addColorStop(0, "#fff");
                    grad.addColorStop(0.3, _this4.fill);
                    _this4.ctx.beginPath();
                    _this4.ctx.fillStyle = grad;
                    _this4.ctx.fillStyle = grad;
                    _this4.ctx.arc(_this4.x, _this4.y, _this4.radius, 0, 2 * Math.PI);
                    _this4.ctx.fill();
                }
            });
        }
    }]);

    return PegSpot;
}();

var PipBoard = function () {
    function PipBoard(ctx, x, y) {
        _classCallCheck(this, PipBoard);

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.fill = boardColor;
        this.length = 33;
        this.pips = [];

        this.render = this.render.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
        this.renderPips = this.renderPips.bind(this);
    }

    _createClass(PipBoard, [{
        key: "render",
        value: function render() {
            var _this5 = this;

            this.renderBackground().then(function () {
                _this5.renderPips();
            });
        }
    }, {
        key: "renderBackground",
        value: function renderBackground() {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                _this6.ctx.fillStyle = _this6.fill;
                _this6.ctx.fillRect(_this6.x, _this6.y, _this6.length, _this6.length);
                resolve();
            });
        }
    }, {
        key: "renderPips",
        value: function renderPips() {
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 2; j++) {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "#000";
                    this.pips.push({ x: this.x + 10 + 13 * i, y: this.y + 10 + 13 * j, color: "#000", radius: 5 });
                    this.ctx.arc(this.pips[i * 2 + j].x, this.pips[i * 2 + j].y, 5, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }
        }
    }]);

    return PipBoard;
}();

exports.ConsolePeg = ConsolePeg;
exports.Row = Row;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var insideCircle = function insideCircle(xClick, yClick, xCenter, yCenter, radius) {
    var dx = xCenter - xClick;
    var dy = yCenter - yClick;

    if ((dx ** 2 + dy ** 2) ** 0.5 < radius) {
        return true;
    } else {
        return false;
    }
};
exports.insideCircle = insideCircle;

/***/ })
/******/ ]);
//# sourceMappingURL=mastermind.js.map