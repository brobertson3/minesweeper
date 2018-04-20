'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Board);

		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Board, [{
		key: 'flipTile',


		/*
  	 * User can choose a tile to flip and update that tile with either game over or
  	 * the number of surrounding bombs.
  	 */
		value: function flipTile(rowIndex, columnIndex) {
			if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
				console.log('This tile has already been flipped!');
				return;
			} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
				this._playerBoard[rowIndex][columnIndex] = 'B';
				//TODO - I feel like this should be game over
			} else {
				this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
			}
			this._numberOfTiles--;
		}

		/*
  	 * Function to check how many adjacent bombs there are to the user's choice.
  	 */

	}, {
		key: 'getNumberOfNeighborBombs',
		value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
			var _this = this;

			var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

			var numberOfRows = this._bombBoard.length;
			var numberOfColumns = this._bombBoard[0].length;
			var numberOfBombs = 0;

			neighborOffsets.forEach(function (offset) {
				var neighborRowIndex = offset[0] + rowIndex;
				var neighborColumnIndex = offset[1] + columnIndex;

				// If neighbor is on the board and contains a bomb then increment numberOfBombs
				if (neighborRowIndex < numberOfRows && neighborRowIndex >= 0 && neighborColumnIndex < numberOfColumns && neighborColumnIndex >= 0) {
					if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
						numberOfBombs++;
					}
				}
			});

			return numberOfBombs;
		}
	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {
			return this._numberOfTiles !== this._numberOfBombs;
		}

		/* Function to handle formatting the board for printing to the console.
  	 * This uses the arrow function notation from ES6, omitting the set of
  	 * parentheses around the parameter since there is only a single parameter.
  	 * Here 'row' is an array of spaces, so join works on it. The chained 'join'
  	 * call works to put newline char between rows.
  	 */

	}, {
		key: 'print',
		value: function print() {
			console.log(this._playerBoard.map(function (row) {
				return row.join(' | ');
			}).join('\n'));
		}

		// Function declaration to dynamically create blank board to hold player's guesses

	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}], [{
		key: 'generatePlayerBoard',
		value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
			var board = [];

			for (var i = 0; i < numberOfRows; i++) {
				var row = [];

				for (var j = 0; j < numberOfColumns; j++) {
					row.push(' ');
				}

				board.push(row);
			}

			return board;
		}

		// Function declaration to dynamically create blank board to hold bomb locations

	}, {
		key: 'generateBombBoard',
		value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
			var board = [];

			for (var i = 0; i < numberOfRows; i++) {
				var row = [];

				for (var j = 0; j < numberOfColumns; j++) {
					row.push(null);
				}

				board.push(row);
			}

			var numberOfBombsPlaced = 0;
			var randomRowIndex = 0;
			var randomColumnIndex = 0;

			while (numberOfBombsPlaced < numberOfBombs) {
				randomRowIndex = Math.floor(Math.random() * numberOfRows);
				randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

				// Check to see if bomb space free. If free then place bomb, else try again
				if (board[randomRowIndex][randomColumnIndex] !== 'B') {
					board[randomRowIndex][randomColumnIndex] = 'B';
					numberOfBombsPlaced++;
				}
			}

			return board;
		}
	}]);

	return Board;
}();