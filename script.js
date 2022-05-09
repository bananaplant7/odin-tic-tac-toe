const board = document.querySelector('.gameBoard');
const cells = document.querySelectorAll('.cell');

const gameBoard = (() => {
    let _board = [, , , , , , , , ];

    // function that renders _board array onto webpage
    function displayBoard() {
        for (let i = 0; i < _board.length; i++) {
            cells[i].textContent = _board[i];

        }
    }

    function placeMark(i) {
        _board[i] = flowOfTheGame.getTurn(); // for now, add turn switching later
    }

    return {
        displayBoard,
        placeMark,
    };
})();



const Player = (marker) => {
    const getMarker = () => marker;

    return {
        getMarker
    };
};

const playerX = Player('X');
const playerO = Player('O');



// controls flow of game: the turns, win or tie, 
const flowOfTheGame = (() => {
    let turn = ''
    function getTurn() {
        if (turn == 'X') {
            turn = 'O'
            return turn
        } else {
            turn = 'X'
            return turn
        }
    }
    return {
        getTurn,
    };
})();

cells.forEach(cell => cell.addEventListener('click', () => {
    gameBoard.placeMark(cell.id);
    gameBoard.displayBoard();
}, { once: true }));


