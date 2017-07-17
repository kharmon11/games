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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = document.getElementById('board');
var ctx = board.getContext('2d');

var game = new _game2.default(board, ctx);
game.renderBoard();

window.addEventListener('keydown', game.keyPress);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randInt = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrowKeys = {
    "37": "left",
    "38": "up",
    "39": "right",
    "40": "down"
};

var Game = function () {
    function Game(canvas, ctx) {
        _classCallCheck(this, Game);

        this.canvas = canvas;
        this.ctx = ctx;
        this.board = [[null, null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]];

        this.renderBoard = this.renderBoard.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
        this.renderBlankTitles = this.renderBlankTitles.bind(this);
        this.start = this.start.bind(this);
        this.generateTile = this.generateTile.bind(this);
        this.startingTiles = this.startingTiles.bind(this);
        this.drawBoard = this.drawBoard.bind(this);
        this.drawTile = this.drawTile.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.tileSlide = this.tileSlide.bind(this);
    }

    _createClass(Game, [{
        key: "renderBoard",
        value: function renderBoard() {
            var _this = this;

            this.renderBackground().then(function () {
                return _this.renderBlankTitles();
            }).then(function () {
                _this.start();
            });
        }
    }, {
        key: "renderBackground",
        value: function renderBackground() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.ctx.fillStyle = "#33a";
                _this2.ctx.fillRect(0, 0, 500, 500);
                resolve();
            });
        }
    }, {
        key: "renderBlankTitles",
        value: function renderBlankTitles() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.ctx.fillStyle = "#66d";
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        _this3.board[i][j] = 0;
                        _this3.ctx.fillRect(10 + i * 125, 10 + j * 125, 105, 105);
                    }
                }
                resolve();
            });
        }
    }, {
        key: "start",
        value: function start() {
            var _this4 = this;

            this.startingTiles().then(function () {
                _this4.drawBoard();
            });
        }
    }, {
        key: "generateTile",
        value: function generateTile() {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var space = [(0, _randInt.randInt)(0, 4), (0, _randInt.randInt)(0, 4)];
                if (_this5.board[space[0]][space[1]] === 0) {
                    resolve(space);
                } else {
                    _this5.generateTile().then(function (tile) {
                        resolve(tile);
                    });
                }
            });
        }
    }, {
        key: "startingTiles",
        value: function startingTiles() {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                _this6.generateTile().then(function (tile) {
                    if ((0, _randInt.randInt)(1, 101) < 95) {
                        _this6.board[tile[0]][tile[1]] = 2;
                    } else {
                        _this6.board[tile[0]][tile[1]] = 4;
                    }
                    return _this6.generateTile();
                }).then(function (tile) {
                    if ((0, _randInt.randInt)(1, 101) < 95) {
                        _this6.board[tile[0]][tile[1]] = 2;
                    } else {
                        _this6.board[tile[0]][tile[1]] = 4;
                    }
                    resolve();
                });
            });
        }
    }, {
        key: "drawBoard",
        value: function drawBoard() {
            var _this7 = this;

            var _loop = function _loop(i) {
                var _loop2 = function _loop2(j) {
                    if (_this7.board[i][j] > 0) {
                        var num = _this7.board[i][j];
                        _this7.drawTile(i, j, num).then(function () {
                            _this7.drawTileNumber(i, j, num);
                        });
                    }
                };

                for (var j = 0; j < 4; j++) {
                    _loop2(j);
                }
            };

            for (var i = 0; i < 4; i++) {
                _loop(i);
            }
        }
    }, {
        key: "drawTile",
        value: function drawTile(i, j, num) {
            var _this8 = this;

            return new Promise(function (resolve, reject) {
                _this8.ctx.fillStyle = "#ccf";
                _this8.ctx.fillRect(10 + i * 125, 10 + j * 125, 105, 105);
                resolve();
            });
        }
    }, {
        key: "drawTileNumber",
        value: function drawTileNumber(i, j, num) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "#003";
            this.ctx.font = "80px Verdana";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(num, 60 + i * 125, 60 + j * 125);
        }
    }, {
        key: "keyPress",
        value: function keyPress(event) {
            var key = event.keyCode;
            if (key > 36 && key < 41) {
                console.log(key, arrowKeys[key]);
                this.tileSlide(key);
            }
        }
    }, {
        key: "tileSlide",
        value: function tileSlide(key) {
            if (key === 37) {
                for (var i = 0; i < 4; i++) {
                    for (var j = 1; j < 4; j++) {
                        if (this.board[i][j] > 0) {
                            for (var k = 1; k > j + 1; k++) {
                                if (this.board[i][j - k] > 0) {
                                    if (this.board[i][j - k] === this.board[i][j]) {
                                        this.board[i][j - k] *= 2;
                                        this.board[i][j] = 0;
                                    } else {
                                        this.board[i][j - k] *= this.board[i][j];
                                        this.board[i][j] = 0;
                                    }
                                }
                            }
                        }
                    }
                }
                console.log(this.board);
            }
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ })
/******/ ]);
//# sourceMappingURL=2048.js.map