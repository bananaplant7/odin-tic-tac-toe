const board = document.querySelector('.gameBoard');
const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('#restartBtn');
const msg = document.querySelector('#msg')
const overlay = document.querySelector('#overlay')

// relates the the game board
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

// controls flow of game: turns, win or tie, etc
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

    // if space is not marked, mark the spot & check for win or tie
    // doing like this allows easy removal
    let onClick = function () {
        if (this.textContent == '') {
            gameBoard.placeMark(this.id);
            if (checkWin()) {
                msg.textContent = `${getCurrentTurn()} IS THE WINNER`;
                overlay.classList.add('show')
            }
            if (flowOfTheGame.checkTie()) {
                msg.textContent = 'IT IS A TIE';
                overlay.classList.add('show')
            }
            gameBoard.displayBoard();
        }
    };

    function addListeners() {
        cells.forEach(cell => cell.addEventListener('click', onClick));
    }

    function restartGame() {
        gameBoard.clearBoard();
        currentTurn = '';
        msg.textContent = ''
        overlay.classList.remove('show')
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
restartBtn.addEventListener('click', () => { flowOfTheGame.restartGame(); });