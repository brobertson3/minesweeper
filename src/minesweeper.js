/* Function to handle formatting the board for printing to the console.
 * This uses the arrow function notation from ES6, omitting the set of
 * parentheses around the parameter since there is only a single parameter.
 */
const printBoard = board => {
	console.log('Current Board:');
	console.log(board[0].join(" | "));
	console.log(board[1].join(" | "));
	console.log(board[2].join(" | "));
}

let board = [
	[' ', ' ', ' '], 
	[' ', ' ', ' '], 
	[' ', ' ', ' ']
];

printBoard(board);

// Hardcode indexes of the board array
board[0][1] = '1';
board[2][2] = 'B';

printBoard(board);

