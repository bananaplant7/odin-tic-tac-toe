const board = document.querySelector('.gameBoard');
const cells = document.querySelectorAll('.cell');

const gameBoard = (() => {
    let _board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    function _displayBoard() {
        for (let i = 0; i < _board.length; i++) {
            cells[i].textContent = _board[i]
            
        }
    }
    return {
        _displayBoard,
    };
})();

const player = (marker) => {
    const _marker = () => console.log(marker);

    return {
        _marker
    };
};

// and you’re probably going to want an object to control the flow of the game itself
// maybe the turns 
const flowOfTheGameItself = (() => {

    return {};
});



