
// Create game interface
var gameUI = new GameUI(".container", player);

// Initialize game
// TODO: Re-implement this function to support multi-player
var init = function() {
    $.get("/board", function(board) {
        gameUI.setBoard(JSON.parse(board));
    });
    
    //Here comes the most important part of client-side process
    //Waiting for opponent, or current player to make a move and checking if the game is over;
    var turn; 
    $.get("/turn", function(resp) {
        turn = JSON.parse(resp);
    });
    if(turn === gameUI.player) {
        gameUI.setMessage("It is your move.");
        waitForMove();
        // waitForNextMove();
    } else if(turn === "") {
        gameUI.setMessage("The game has ended.");
    } else {
        gameUI.setMessage("Waiting for opponent...");
        waitForNextMove();
    }
};


var waitForNextMove = function(){
    var turnTimer = setInterval(function() {
        $.get("/turn", function(turn) {
            turn = JSON.parse(turn);
            if(turn === gameUI.player) {
                gameUI.setMessage("It is your turn");
                $.get("/board", function(board) {
                    gameUI.setBoard(JSON.parse(board));
                });
                    gameUI.waitForMove(); 
                clearInterval(turnTimer);
            } else if(turn === "") {
                $.get("/board", function(board) {
                    gameUI.setBoard(JSON.parse(board));
                });
                gameUI.setMessage("The game has ended.");
                clearInterval(turnTimer);   
            } else {    
                gameUI.disable();
            }
        });
    }, 1000);
};


// Callback function for when the user makes a move
// TODO: Re-implement this function to support multi-player
var callback = function(row, col, player) {
    gameUI.setMessage("Sending your move");
	var data = {
		"row": row,
		"col": col,
		"player": player
	};

    $.get('/move', data, function(resp){
        resp = JSON.parse(resp);
        if(resp) {
            gameUI.setMessage("Waiting for opponent...");
            waitForNextMove();
        } else {
            gameUI.setMessage("Invalid move");
            gameUI.waitForMove();
        }
    });
};

// Set callback for user move
gameUI.callback = callback;

// Initialize game
init();
