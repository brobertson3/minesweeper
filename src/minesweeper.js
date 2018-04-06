// Function declaration to dynamically create blank board to hold player's guesses
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
	let board = [];

	for (let i = 0; i < numberOfRows; i++) {
		let row = [];

		for (let j = 0; j < numberOfColumns; j++) {
			row.push(' ');
		}

		board.push(row);
	}

	return board;
};

// Function declaration to dynamically create blank board to hold bomb locations
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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

/*
 * Function to check how many adjacent bombs there are to the user's choice.
 */
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {

	const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1],
	                         [0, -1], [0, 1],
	                         [1, -1], [1, 0], [1, 1]];

    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
    	const neighborRowIndex = offset[0] + rowIndex;
    	const neighborColumnIndex = offset[1] + columnIndex;

    	// If neighbor is on the board and contains a bomb then increment numberOfBombs
    	if (neighborRowIndex < numberOfRows && neighborRowIndex >= 0 &&
    		neighborColumnIndex < numberOfColumns && neighborColumnIndex >= 0) {
    		if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
    			numberOfBombs++;
    		}
    	}
    });

    return numberOfBombs;
}

/*
 * User can choose a tile to flip and update that tile with either game over or
 * the number of surrounding bombs.
 */
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
	if (playerBoard[rowIndex][columnIndex] !== ' ') {
		console.log('This tile has already been flipped!');
		return;
	} else if (bombBoard[rowIndex][columnIndex] === 'B') {
		playerBoard[rowIndex][columnIndex] = 'B';
		//TODO - I feel like this should be game over
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
	}
}

/* Function to handle formatting the board for printing to the console.
 * This uses the arrow function notation from ES6, omitting the set of
 * parentheses around the parameter since there is only a single parameter.
 * Here 'row' is an array of spaces, so join works on it. The chained 'join'
 * call works to put newline char between rows.
 */
const printBoard = board => {
	console.log(board.map(row => {
		return row.join(' | ');
	}).join('\n'));
};

const rows = 4;
const columns = 3;
const bombs = 5;


let playerBoard = generatePlayerBoard(rows, columns);
let bombBoard = generateBombBoard(rows, columns, bombs);

console.log('-- Player Board --')
printBoard(playerBoard);
console.log('--- Bomb Board ---')
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0 , 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);

