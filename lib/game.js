'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

var Game = function () {
	function Game(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Game);

		this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Game, [{
		key: 'playMove',
		value: function playMove(rowIndex, columnIndex) {
			this._board.flipTile(rowIndex, columnIndex);
			/* 
    * Check to see if the user won, lost, or is still playing
    */
			if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
				console.log("Game over man!");
				this._board.print();
				// TODO - Need to start a new game here
			} else if (!this._board.hasSafeTiles()) {
				// TODO - Need to start a new game here
				console.log("Nice work. You've won!");
			} else {
				console.log('Current Board:');
				this._board.print();
			}
		}
	}]);

	return Game;
}();