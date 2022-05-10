const board = document.querySelector('.gameBoard');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('#restartBtn');
const gameBoard = (() => {
    let _board = ['', '', '', '', '', '', '', '', '',];

    // function that renders _board array onto webpage
    function displayBoard() {
        for (let i = 0; i < _board.length; i++) {
            cells[i].textContent = _board[i];
        }
    }
    function getBoard() {
        return _board;
    }
    function placeMark(i) {
        _board[i] = flowOfTheGame.flipTurn();
    }

    function clearBoard() {
        _board = ['', '', '', '', '', '', '', '', '',];
        displayBoard();
    }

    return {
        getBoard,
        displayBoard,
        placeMark,
        clearBoard,
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
                return gameBoard.getBoard()[index] == currentTurn;
            });
        });
    }
    function checkTie() {
        return gameBoard.getBoard().every(index => {
            return (index != '');
        });
    }
    function addListeners() {
        cells.forEach(cell => cell.addEventListener('click', () => {
            if (cell.textContent == '') {
                gameBoard.placeMark(cell.id);
                if (checkWin()) {
                    console.log(`${getCurrentTurn()} is the winner`);
                }
                if (flowOfTheGame.checkTie()) {
                    console.log('Tie');
                }
                gameBoard.displayBoard();
            }
        }));
    }

    function restartGame() {
        gameBoard.clearBoard();
        currentTurn = '';
    }
    return {
        getCurrentTurn,
        flipTurn,
        checkWin,
        checkTie,
        addListeners,
        restartGame,
    };
})();

flowOfTheGame.addListeners();
restartBtn.addEventListener('click', () => {flowOfTheGame.restartGame()})