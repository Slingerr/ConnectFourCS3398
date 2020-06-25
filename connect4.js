function showGame() {
    document.getElementById("menu").style.display = 'none';
    document.getElementById("OptionMenu").style.display = 'none';
    document.getElementById("board").style.display = 'inline-flex';
}

function showMenu() {
    document.getElementById("board").style.display = 'none';
    document.getElementById("OptionMenu").style.display = 'none';
    document.getElementById("menu").style.display = 'block';
}

function showOption() {
    document.getElementById("menu").style.display = 'none';
    document.getElementById("board").style.display = 'none';
    document.getElementById("OptionMenu").style.visibility = 'visible';
    document.getElementById("OptionMenu").style.display = 'block';
}

function showBoard(board, size, length) {
    console.log("\n");
    var boardString = "";
    for (var i = 0; i < size; i++) {
        boardString += board[i] + ", "

        if (i % length == (length - 1)) {
            boardString += "\n";
        }
    }
    console.log(boardString);
}

function checkHorizontal(board, length, currentPlayer, winNumber, i) {

    if (i % length >= (length - (winNumber - 1))) { // skips positions where it is impossible to have 4 in a row horizontally
        //console.log("\nhorizontal skipping " + i + "\n");
        return 0; // 0s returned for no win
    }

    for (var j = 0; j < winNumber; j++) { // runs for current position, the next 3 needed for a win
        if (board[i + j] == currentPlayer) { // checks if consecutive pieces are all the same player's
            if (j == (winNumber - 1)) { // if 4th position is the player's piece then it is a win
                console.log("\n***horizontal win startig at " + i + "\n");

                return 1; // 1 returned for win
            }
        }
        else
            break;
    }
    return 0;

}

function checkVertical(board, height, length, currentPlayer, winNumber, i) {

    if (i >= length * (height - (winNumber - 1))) { // skips positions where it is impossible to have 4 in a row vertically
        //console.log("\nvertical skipping " + i + "\n");
        return 0; // 0s returned for no win
    }

    for (var j = 0; j < winNumber; j++) { // runs for current position, the next 3 needed for a win
        if (board[i + (length * j)] == currentPlayer) { // checks if consecutive pieces are all the same player's
            if (j == (winNumber - 1)) { // if 4th position is the player's piece then it is a win
                console.log("\n***vertical win startig at " + i + "\n");
                return 1; // 1 returned for win
            }
        }
        else
            break;
    }
    return 0;

}

function diagonalRightCheck(board, height, length, currentPlayer, winNumber, i) {

    if (i % length >= (length - (winNumber - 1))) { // skips positions where it is impossible to have 4 in a row diagonally
        //console.log("\ndiagonal right skipping " + i + "\n");
        return 0; // 0s returned for no win
    }

    if (i >= length * (height - (winNumber - 1))) { // skips positions where it is impossible to have 4 in a row diagonlly
        //console.log("\ndiagonal right skipping " + i + "\n");
        return 0;
    }

    for (var j = 0; j < winNumber; j++) { // runs for current position, the next 3 needed for a win
        if (board[i + (length * j) + j] == currentPlayer) { // checks if consecutive pieces are all the same player's
            if (j == (winNumber - 1)) { // if 4th position is the player's piece then it is a win
                console.log("\n***right diagonal win startig at " + i + "\n");
                return 1; // 1 returned for win
            }
        }
        else
            break;
    }
    return 0;

}

function diagonalLeftCheck(board, height, length, currentPlayer, winNumber, i) {

    if (i % length < (winNumber - 1)) { // skips positions where it is impossible to have 4 in a row diagonally
        //console.log("\ndiagonal left skipping " + i + "\n");
        return 0; // 0s returned for no win
    }

    if (i >= length * (height - (winNumber - 1))) { // skips positions where it is impossible to have 4 in a row diagonlly
        //console.log("\ndiagonal left skipping " + i + "\n");
        return 0;
    }

    for (var j = 0; j < winNumber; j++) { // runs for current position, the next 3 needed for a win
        if (board[i + (length * j) - j] == currentPlayer) { // checks if consecutive pieces are all the same player's
            if (j == (winNumber - 1)) { // if 4th position is the player's piece then it is a win
                console.log("\n***left diagonal win startig at " + i + "\n");
                return 1; // 1 returned for win
            }
        }
        else
            break;
    }
    return 0;

}

function winCheck(board, size, height, length, currentPlayer, winNumber) {

    var win = 0;

    for (var i = 0; i < size; i++) { // checks every position on the board

        if (win > 0) // breaks if win condition is met, greater than zero because you could win with multiple rows of 4 at once
            break;

        //console.log("checking pos " + i + "\n");

        win += checkHorizontal(board, length, currentPlayer, winNumber, i); // checks the 4 different directions rows of 4 could be in
        win += checkVertical(board, height, length, currentPlayer, winNumber, i);
        win += diagonalRightCheck(board, height, length, currentPlayer, winNumber, i);
        win += diagonalLeftCheck(board, height, length, currentPlayer, winNumber, i);

    }

    return win > 0;

}

//Run when the HTML is loaded. I suggest putting everything in here except named functions
window.onload = function () {
    document.getElementById("singlePlayer").addEventListener("click", function () {
        //single player setup
        showGame();
    });
    document.getElementById("multiplayer").addEventListener("click", function () {
        //multiplayer setup
        showGame();
    });
    document.getElementById("tutorial").addEventListener("click", function () {
        //tutorial setup
        showGame();
    });
    document.getElementById("options").addEventListener("click", function () {
        //option menu
        showOption();

    });
    const length = 7; // length of board
    const height = 6; // height of board
    const winNumber = 4; // number of pieces in a row needed to win
    const size = length * height;
    var board = [0, 0, 0, 0, 0, 0, 0, // array of game board
                 0, 0, 0, 0, 0, 0, 0, // 0s are blank spaces, 1s are player 1 pieces, 2s are player 2 pieces
                 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0,];
    var currentPlayer = 1;
    var prevPlayer;
    var columns = document.getElementsByClassName("column");
    for (var i = 0; i < columns.length; i++) {
        var column = columns[i];
        var filledCol = 0;
        column.addEventListener('click', function (event) {
            var thisColumn = parseInt(event.currentTarget.id.charAt(0));
            if (board[thisColumn + length] != 0) {
                //remove the function that lets you place pieces
                this.removeEventListener('click', arguments.callee);
                event.currentTarget.classList.remove("column"); //remove hover effect
                filledCol++;
                if(filledCol == 7){
                    alert("\n The match is a draw");
                    window.location.reload();
                }
            }
            /*added player recognition to piece placement, solved issue of placing at the top.
            however there is no proper piece collision and pieces can only be placed diagonally...
            */
            var circles = this.getElementsByClassName("circle");
            for (var j = height - 1; j > -1; j--) {
                var circle = circles[j];
                console.log("before piece current player is " + currentPlayer);
                if (board[thisColumn + (j * length)] == 0) {
                    if (currentPlayer == 1) {
                        console.log("color set to red");
                        circle.classList.add("red");
                        board[thisColumn + (j * length)] = 1;
                        currentPlayer = 2;
                        prevPlayer = 1;
                    }
                    else {
                        circle.classList.add("black");
                        board[thisColumn + (j * length)] = 2;
                        currentPlayer = 1;
                        prevPlayer = 2;
                    }
                    j = -1;
                }
            }
            console.log(showBoard(board, size, length));
            console.log("after piece current player is " + currentPlayer);
            if (winCheck(board, size, height, length, prevPlayer, winNumber)) {
                    console.log("\nplayer " + prevPlayer + " wins");

                    alert("\nPlayer " + prevPlayer + " wins");  //alert the player of who won
                    window.location.reload(); //reset the menu
            }
        }, false);
    }
}