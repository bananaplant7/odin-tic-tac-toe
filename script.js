const board = document.querySelector('.gameBoard');
const cells = document.querySelectorAll('.cell');

const gameBoard = (() => {
    let _board = ['', '', '', '', '', '', '', '', '',];

    // function that renders _board array onto webpage
    function displayBoard() {
        for (let i = 0; i < _board.length; i++) {
            cells[i].textContent = _board[i];

        }
    }

    function placeMark(i) {
        _board[i] = flowOfTheGame.flipTurn();
    }

    return {
        _board,
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



// controls flow of game: turns, win or tie, 
const flowOfTheGame = (() => {
    let currentTurn = '';
    let winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    function getCurrentTurn() {
        return currentTurn;
    }
    function flipTurn() {
        if (currentTurn == 'X') {
            return currentTurn = 'O';
        } else {
            return currentTurn = 'X';
        }
    }
    function checkWin() {
        return winningCombos.some(combo => {
            return combo.every(index => {
                return gameBoard._board[index] == currentTurn;
            });
        });
    }
    function checkTie() {
        return gameBoard._board.every(index => {
            return (index != '');
        });
    }
    return {
        getCurrentTurn,
        flipTurn,
        checkWin,
        checkTie,
    };
})();

cells.forEach(cell => cell.addEventListener('click', () => {
    gameBoard.placeMark(cell.id);
    if (flowOfTheGame.checkWin()) {
        console.log(`${flowOfTheGame.getCurrentTurn()} is the winner`);
    }
    if (flowOfTheGame.checkTie()) {
        console.log('Tie')
    }
    gameBoard.displayBoard();
}, { once: true }));