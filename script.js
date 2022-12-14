
// all the variables 
var player1 = prompt('🔵Player 1 : Enter your name ');
var player1Color = 'rgb(86,151,255)';

var player2 = prompt('🔴Player 2 : Enter your name ');
var player2Color = 'rgb(237,45,73)';

var game_on = true;
var table = $('table tr');

// return Winning row and coloumn 
function reportWin(rowNum, colNum) {
    console.log('You won starting at this row,col');
    console.log(rowNum);
    console.log(colNum);
}

// return color - when u enter row-index and column-index
function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

// changes color - when u enter row-index and column-index
function changeColor(rowIndex, colIndex, color) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

// Take in column index, returns the bottom row that is still gray
function checkBottom(colIndex) {
    var colorReport = returnColor(5,colIndex);
    for ( var row = 5; row > -1; row-- ) {
        colorReport = returnColor(row, colIndex);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row
        }
    }
}

// Check to see if 4 inputs are the same color
function colorMatchCheck(one,two,three,four){
    return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
  }

// Check for Horizontal Wins
function horizontalWinCheck() {

    // goes through every row
    for (var row = 0; row < 6; row++) {

      // goes through every col
      for (var col = 0; col < 4; col++) {

        // color match cols for wins
        if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
          console.log('horiz');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }
  
  // Check for Vertical Wins
  function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 3; row++) {

        // color match rows for wins
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
          console.log('vertical');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }
  
  // Check for Diagonal Wins
  function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
      for (var row = 0; row < 7; row++) {

        // color match horz buttons for wins
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
          console.log('diag');
          reportWin(row,col);
          return true;
        }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
          console.log('diag');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }


// game end
function gameEnd(winningPlayer) {
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 7; row++) {
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
        $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
      }
    }
  }



////////////////// GAME LOGIC ////////////////////

// starting the game with player 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+": it is your turn, please pick a column to drop your blue chip.");


// on clicking any button 
$('.board button').on('click',function(){

    // return index of button clicked
    var col = $(this).closest('td').index();

    // check botton is used to check last grey button
    var bottomAvail = checkBottom(col);

    // change color is used to change color of button with current player color
    changeColor(bottomAvail, col, currentColor);

    // win condition checks or tie
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        gameEnd(currentName);
    }

    // If no win or tie, continue to next player
    currentPlayer = currentPlayer * -1;

    // Re-Check who the current Player is.
    if (currentPlayer === 1) {
        currentName = player1
        $('h3').text(currentName+": it is your turn, please pick a column to drop your blue chip.");
        currentColor = player1Color
    }else {
        currentName = player2
        $('h3').text(currentName+": it is your turn, please pick a column to drop your red chip.");
        currentColor = player2Color
    }

})