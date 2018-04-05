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

		board[randomRowIndex][randomColumnIndex] = 'B';

		numberOfBombsPlaced++;

		//TODO - restrict bombs from being placed at the same index
	}

	return board;
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

