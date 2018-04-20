export class Board {
	constructor (numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	get playerBoard () {
		return this._playerBoard;
	}

	/*
 	 * User can choose a tile to flip and update that tile with either game over or
 	 * the number of surrounding bombs.
 	 */
	flipTile (rowIndex, columnIndex) {
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
	getNumberOfNeighborBombs (rowIndex, columnIndex) {

		const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1],
	                 	        [0, -1], [0, 1],
	                     	    [1, -1], [1, 0], [1, 1]];

    	const numberOfRows = this._bombBoard.length;
    	const numberOfColumns = this._bombBoard[0].length;
    	let numberOfBombs = 0;

    	neighborOffsets.forEach(offset => {
    		const neighborRowIndex = offset[0] + rowIndex;
    		const neighborColumnIndex = offset[1] + columnIndex;

    		// If neighbor is on the board and contains a bomb then increment numberOfBombs
    		if (neighborRowIndex < numberOfRows && neighborRowIndex >= 0 &&
    			neighborColumnIndex < numberOfColumns && neighborColumnIndex >= 0) {
    			if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
    				numberOfBombs++;
    			}
    		}
    	});

    	return numberOfBombs;
	}

	hasSafeTiles () {
		return (this._numberOfTiles !== this._numberOfBombs);
	}

	/* Function to handle formatting the board for printing to the console.
 	 * This uses the arrow function notation from ES6, omitting the set of
 	 * parentheses around the parameter since there is only a single parameter.
 	 * Here 'row' is an array of spaces, so join works on it. The chained 'join'
 	 * call works to put newline char between rows.
 	 */
	print () {
		console.log(this._playerBoard.map(row => {
			return row.join(' | ');
		}).join('\n'));
	}

	// Function declaration to dynamically create blank board to hold player's guesses
	static generatePlayerBoard (numberOfRows, numberOfColumns) {
		let board = [];

		for (let i = 0; i < numberOfRows; i++) {
			let row = [];

			for (let j = 0; j < numberOfColumns; j++) {
				row.push(' ');
			}

			board.push(row);
		}

		return board;
	}

	// Function declaration to dynamically create blank board to hold bomb locations
	static generateBombBoard (numberOfRows, numberOfColumns, numberOfBombs) {
		let board = [];

		for (let i = 0; i < numberOfRows; i++) {
			let row = [];

			for (let j = 0; j < numberOfColumns; j++) {
				row.push(null);
			}

			board.push(row);
		}

		let numberOfBombsPlaced = 0;
		let randomRowIndex = 0;
		let randomColumnIndex = 0;

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
}