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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var displayScores = function displayScores() {
    document.getElementById("wins_score").innerHTML = localStorage.tictactoeWins;
    document.getElementById("losses_score").innerHTML = localStorage.tictactoeLosses;
    document.getElementById("draws_score").innerHTML = localStorage.tictactoeDraws;
};

exports.displayScores = displayScores;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _drawBoard = __webpack_require__(2);

var _displayScores = __webpack_require__(0);

var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var boardCanvas = document.getElementById("board");
var ctx = boardCanvas.getContext("2d");
(0, _drawBoard.drawBoard)(boardCanvas, ctx);

if (typeof Storage !== "undefined") {
    if (!localStorage.tictactoeWins) {
        localStorage.setItem("tictactoeWins", 0);
        localStorage.setItem("tictactoeLosses", 0);
        localStorage.setItem("tictactoeDraws", 0);
    }
    (0, _displayScores.displayScores)();
}

var game = new _game2.default(boardCanvas, ctx);
game.start();

function restartGame(event) {
    location.reload();
}
document.getElementById("restart_btn").addEventListener("click", restartGame);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var drawBoard = function drawBoard(boardCanvas, ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.lineWidth = 10;
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 300);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 300);
    ctx.moveTo(0, 100);
    ctx.lineTo(300, 100);
    ctx.moveTo(0, 200);
    ctx.lineTo(300, 200);
    ctx.stroke();
};
exports.drawBoard = drawBoard;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randInt = __webpack_require__(4);

var _displayScores = __webpack_require__(0);

var _wins = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TicTacToe = function () {
    function TicTacToe(canvas, ctx) {
        _classCallCheck(this, TicTacToe);

        this.canvas = canvas;
        this.size = [canvas.offsetWidth / 3, canvas.offsetWidth * (2 / 3), canvas.offsetWidth];
        this.ctx = ctx;
        this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.turn = 0;

        this.start = this.start.bind(this);
        this.click = this.click.bind(this);
        this.getCursorCoords = this.getCursorCoords.bind(this);
        this.findBoardSpace = this.findBoardSpace.bind(this);
        this.findSpaceDimension = this.findSpaceDimension.bind(this);
        this.checkSpace = this.checkSpace.bind(this);
        this.computerMove = this.computerMove.bind(this);
        this.findComputerSpace = this.findComputerSpace.bind(this);
        this.winningMoves = this.winningMoves.bind(this);
        this.winningSpaceTest = this.winningSpaceTest.bind(this);
        this.randomSpace = this.randomSpace.bind(this);
        this.gameOverCheck = this.gameOverCheck.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.drawX = this.drawX.bind(this);
        this.drawO = this.drawO.bind(this);
    }

    _createClass(TicTacToe, [{
        key: 'start',
        value: function start() {
            this.canvas.style.display = "block";
            this.canvas.addEventListener("click", this.click);
        }
    }, {
        key: 'click',
        value: function click(event) {
            var _this = this;

            this.getCursorCoords(event).then(function (clickCoords) {
                _this.findBoardSpace(clickCoords).then(function (dims) {
                    if (_this.checkSpace(dims)) {
                        _this.board[dims.x][dims.y] = 1;
                        return _this.drawX(dims);
                    } else {
                        return Promise.reject("Space occupied", dims);
                    }
                }).then(function () {
                    return _this.gameOverCheck(1);
                }).then(function (result) {
                    if (result) {
                        _this.gameOver(1);
                    } else {
                        if (_this.turn < 9) {
                            return _this.computerMove();
                        } else {
                            _this.gameOver(0);
                        }
                    }
                }).then(function (result) {
                    if (result) {
                        _this.gameOver(2);
                    }
                }).catch(function (reason) {});
            });
        }
    }, {
        key: 'getCursorCoords',
        value: function getCursorCoords(event) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var rect = _this2.canvas.getBoundingClientRect();
                resolve({
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                });
            });
        }
    }, {
        key: 'findBoardSpace',
        value: function findBoardSpace(clickCoords) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.findSpaceDimension(clickCoords.x).then(function (xDim) {
                    _this3.findSpaceDimension(clickCoords.y).then(function (yDim) {
                        resolve({ x: xDim, y: yDim });
                    });
                });
            });
        }
    }, {
        key: 'findSpaceDimension',
        value: function findSpaceDimension(coord) {
            return new Promise(function (resolve, reject) {
                if (coord < 100) {
                    resolve(0);
                } else if (coord > 100 && coord < 200) {
                    resolve(1);
                } else {
                    resolve(2);
                }
            });
        }
    }, {
        key: 'checkSpace',
        value: function checkSpace(space) {
            if (this.board[space.x][space.y] === 0) {
                return true;
            }
        }
    }, {
        key: 'computerMove',
        value: function computerMove() {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                _this4.findComputerSpace().then(function (space) {
                    _this4.board[space.x][space.y] = 2;
                    _this4.drawO(space).then(function () {
                        return _this4.gameOverCheck(2);
                    }).then(function (result) {
                        resolve(result);
                    });
                });
            });
        }
    }, {
        key: 'findComputerSpace',
        value: function findComputerSpace() {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var space = {
                    x: 1,
                    y: 1
                };
                var results = { i: 0, j: 0, open: 0, p1: 0, p2: 0, openSpace: false, blockSpace: false };
                _this5.winningMoves(results).then(function (space) {
                    if (space) {
                        resolve(space);
                    } else {
                        _this5.randomSpace().then(function (space) {
                            resolve(space);
                        });
                    }
                });
            });
        }
    }, {
        key: 'winningMoves',
        value: function winningMoves(results) {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
                results.j = 0;
                results.open = 0;
                results.p1 = 0;
                results.p2 = 0;
                results.openSpace = false;
                var blockSpace = void 0;
                results.spaces = [_this6.board[_wins.wins[results.i][0][0]][_wins.wins[results.i][0][1]], _this6.board[_wins.wins[results.i][1][0]][_wins.wins[results.i][1][1]], _this6.board[_wins.wins[results.i][2][0]][_wins.wins[results.i][2][1]]];
                _this6.winningSpaceTest(results).then(function (results) {
                    results.j++;
                    return _this6.winningSpaceTest(results);
                }).then(function (results) {
                    results.j++;
                    return _this6.winningSpaceTest(results);
                }).then(function (results) {
                    if (results.open === 1 && (results.p1 === 2 || results.p2 === 2)) {
                        if (results.p2 === 2) {
                            resolve(results.openSpace);
                        } else if (results.p1 === 2) {
                            results.blockSpace = results.openSpace;
                            if (results.i < 7) {
                                results.i++;
                                _this6.winningMoves(results).then(function (space) {
                                    resolve(space);
                                });
                            } else {
                                resolve(results.blockSpace);
                            }
                        }
                    } else {
                        if (results.i < 7) {
                            results.i++;
                            _this6.winningMoves(results).then(function (space) {
                                resolve(space);
                            });
                        } else {
                            resolve(results.blockSpace);
                        }
                    }
                });
            });
        }
    }, {
        key: 'winningSpaceTest',
        value: function winningSpaceTest(results) {
            return new Promise(function (resolve, reject) {
                if (results.spaces[results.j] === 0) {
                    results.open++;
                    results.openSpace = { x: _wins.wins[results.i][results.j][0], y: _wins.wins[results.i][results.j][1] };
                } else if (results.spaces[results.j] === 1) {
                    results.p1++;
                } else {
                    results.p2++;
                }
                resolve(results);
            });
        }
    }, {
        key: 'randomSpace',
        value: function randomSpace() {
            var _this7 = this;

            return new Promise(function (resolve, reject) {
                if (_this7.board[1][1] === 0) {
                    var roll = (0, _randInt.randInt)(0, 101);
                    if (roll > 25) {
                        resolve({ x: 1, y: 1 });
                    } else {
                        var space = { x: "", y: "" };
                        space.x = (0, _randInt.randInt)(0, 3);
                        space.y = (0, _randInt.randInt)(0, 3);
                        if (_this7.checkSpace(space)) {
                            resolve(space);
                        } else {
                            _this7.randomSpace().then(function (space) {
                                resolve(space);
                            });
                        }
                    }
                } else {
                    var _space = { x: "", y: "" };
                    _space.x = (0, _randInt.randInt)(0, 3);
                    _space.y = (0, _randInt.randInt)(0, 3);
                    if (_this7.checkSpace(_space)) {
                        resolve(_space);
                    } else {
                        _this7.randomSpace().then(function (space) {
                            resolve(space);
                        });
                    }
                }
            });
        }
    }, {
        key: 'gameOverCheck',
        value: function gameOverCheck(player) {
            var _this8 = this;

            return new Promise(function (resolve, reject) {
                if (_this8.turn > 4) {
                    var i = 0;
                    for (i; i < _wins.wins.length; i++) {
                        if (_this8.board[_wins.wins[i][0][0]][_wins.wins[i][0][1]] === player && _this8.board[_wins.wins[i][1][0]][_wins.wins[i][1][1]] === player && _this8.board[_wins.wins[i][2][0]][_wins.wins[i][2][1]] === player) {
                            resolve(_wins.wins[i]);
                        } else {
                            if (i === 7) {
                                resolve(false);
                            }
                        }
                    }
                } else {
                    resolve(false);
                }
            });
        }
    }, {
        key: 'gameOver',
        value: function gameOver(winner) {
            var message = document.getElementById('message');
            if (winner === 0) {
                message.innerHTML = 'Draw!';
                message.className = "message-draw";
                localStorage.tictactoeDraws++;
            } else if (winner === 1) {
                message.innerHTML = 'You Win!';
                message.className = "message-win";
                localStorage.tictactoeWins++;
            } else {
                message.innerHTML = 'You Lose!';
                message.className = "message-loss";
                localStorage.tictactoeLosses++;
            }
            (0, _displayScores.displayScores)();
            this.canvas.removeEventListener("click", this.click);
        }
    }, {
        key: 'drawX',
        value: function drawX(dims) {
            var _this9 = this;

            return new Promise(function (resolve, reject) {
                var topX = dims.x * 100 + 100 * 0.05;
                var botX = dims.x * 100 + 100 * 0.95;
                var leftY = dims.y * 100 + 100 * 0.05;
                var rightY = dims.y * 100 + 100 * 0.95;

                _this9.ctx.beginPath();
                _this9.ctx.strokeStyle = "#f00";
                _this9.ctx.lineWidth = 5;
                _this9.ctx.moveTo(topX, leftY);
                _this9.ctx.lineTo(botX, rightY);
                _this9.ctx.moveTo(botX, leftY);
                _this9.ctx.lineTo(topX, rightY);
                _this9.ctx.stroke();
                _this9.turn++;
                resolve();
            });
        }
    }, {
        key: 'drawO',
        value: function drawO(dims) {
            var _this10 = this;

            return new Promise(function (resolve, reject) {
                _this10.ctx.beginPath();
                _this10.ctx.strokeStyle = "#00f";
                _this10.ctx.lineWidth = 5;
                _this10.ctx.arc(dims.x * 100 + 100 * 0.5, dims.y * 100 + 100 * 0.5, 45, 0, 2 * Math.PI, false);
                _this10.ctx.stroke();
                _this10.turn++;
                resolve();
            });
        }
    }]);

    return TicTacToe;
}();

exports.default = TicTacToe;

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var wins = [[[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]], [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]], [[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]];
exports.wins = wins;

/***/ })
/******/ ]);
//# sourceMappingURL=tictactoe.js.map