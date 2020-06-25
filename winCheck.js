

// function randBoard(board, size){ // doesnt work, just used for testing
//     for (var i = 0; i < size; i++){
//         board[i] = Math.floor(Math.random() * Math.floor(3)); 
//     }
// }

function showBoard(board, size, height, length){ // doesnt print correctly
    for (var i = 0; i < size; i++)
    {
        console.log(board[i]);
        
        if (i % length == (length - 1))
        {
            console.log("\n");
        }
    }
}

function checkHorizontal(board, size, height, length, currentPlayer, winNumber, i){

    if(i % length >= (length-(winNumber - 1))){ // skips positions where it is impossible to have 4 in a row horizontally
        console.log("\nhorizontal skipping " + i + "\n" );
        return 0; // 0s returned for no win
    }

    for(var j = 0; j < winNumber; j++){ // runs for current position, the next 3 needed for a win

            if(board[i+j] == currentPlayer){ // checks if consecutive pieces are all the same player's
            
                if(j == (winNumber - 1)){ // if 4th position is the player's piece then it is a win
                    console.log("\n***horizontal win startig at " + i + "\n");
                    
                    return 1; // 1 returned for win
                }
            }  
            else
                break;  
        }
        return 0;

}

function checkVertical(board, size, height, length, currentPlayer, winNumber, i){
    
    if(i >= length * (height - (winNumber - 1))){ // skips positions where it is impossible to have 4 in a row vertically
        console.log("\nvertical skipping " + i + "\n");
        return 0; // 0s returned for no win
    }

    for(var j = 0; j < winNumber; j++){ // runs for current position, the next 3 needed for a win

            if(board[i+(length*j)] == currentPlayer){ // checks if consecutive pieces are all the same player's

                if(j == (winNumber - 1)){ // if 4th position is the player's piece then it is a win
                    console.log("\n***vertical win startig at " + i + "\n");
                    return 1; // 1 returned for win
                }
            }  
            else
                break;  
        }
        return 0;

}

function diagonalRightCheck(board, size, height, length, currentPlayer, winNumber, i){

    if(i % length >= (length-(winNumber - 1))){ // skips positions where it is impossible to have 4 in a row diagonally
        console.log("\ndiagonal right skipping " + i + "\n");
        return 0; // 0s returned for no win
    }

    if(i >= length * (height - (winNumber - 1))){ // skips positions where it is impossible to have 4 in a row diagonlly
        console.log("\ndiagonal right skipping " + i + "\n");
        return 0;
    }

    for(var j = 0; j < winNumber; j++){ // runs for current position, the next 3 needed for a win

            if(board[i + (length*j) + j] == currentPlayer){ // checks if consecutive pieces are all the same player's

                if(j == (winNumber - 1)){ // if 4th position is the player's piece then it is a win
                console.log("\n***right diagonal win startig at " + i + "\n");
                    return 1; // 1 returned for win
                }
            }  
            else
                break;  
        }
        return 0;

}

function diagonalLeftCheck(board, size, height, length, currentPlayer, winNumber, i){

    if(i % length < (winNumber - 1)){ // skips positions where it is impossible to have 4 in a row diagonally
        console.log("\ndiagonal left skipping " + i + "\n");
        return 0; // 0s returned for no win
    }

    if(i >= length * (height - (winNumber - 1))){ // skips positions where it is impossible to have 4 in a row diagonlly
        console.log("\ndiagonal left skipping " + i + "\n");
        return 0;
    }

    for(var j = 0; j < winNumber; j++){ // runs for current position, the next 3 needed for a win

            if(board[i + (length*j) - j] == currentPlayer){ // checks if consecutive pieces are all the same player's
 
                if(j == (winNumber - 1)){ // if 4th position is the player's piece then it is a win
                console.log("\n***left diagonal win startig at " + i + "\n");
                    return 1; // 1 returned for win
                }
            }  
            else
                break;  
        }
        return 0;

}

function winCheck(board, size, height, length, currentPlayer, winNumber){

    
    var win = 0;

    for(var i = 0; i < size; i++){ // checks every position on the board

        if(win > 0) // breaks if win condition is met, greater than zero because you could win with multiple rows of 4 at once
            break;

        console.log("checking pos " + i + "\n");

        win += checkHorizontal(board, size, height, length, currentPlayer, winNumber, i); // checks the 4 different directions rows of 4 could be in
        win += checkVertical(board, size, height, length, currentPlayer, winNumber, i);
        win += diagonalRightCheck(board, size, height, length, currentPlayer, winNumber, i);
        win += diagonalLeftCheck(board, size, height, length, currentPlayer, winNumber, i); 

    }

    if(win > 0){
        console.log("\nplayer " + currentPlayer + " wins\n\n");

        //showBoard(board, size, height, length);
    }
    else{
        console.log("\nno win\n");
    }


}

    var length = 7; // length of board
    var height = 6; // height of board
    var winNumber = 4; // number of pieces in a row needed to win
    var size = length * height;
    var board;
         board = [ 0, 0, 0, 0, 0, 0, 0, // array of game board, upside down compared to actual board,
                   0, 2, 2, 2, 2, 0, 1,   // but logic works the same way
                   0, 1, 0, 1, 1, 1, 0,
                   0, 0, 1, 2, 0, 2, 1,  // used for manual tests
                   1, 1, 1, 2, 1, 1, 1,  // 0s are blank spaces, 1s are player 1 pieces, 2s are player 2 pieces
                   0, 1, 1, 1, 1, 1, 0,];

    var currentPlayer = 1; // player being checked for win, would alternate every turn

    //randBoard(board, size); // randomly generates board with 0s 1s and 2s, used for testing, does not always make possible layouts
    //showBoard(board, size, height, length); // doesnt print correctly, used for testing

    winCheck(board, size, height, length, currentPlayer, winNumber); // checks for win

    
