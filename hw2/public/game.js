//var http = require('http');
// var request = require('request');

// Create game interface
var gameUI = new GameUI(".container", player);

// Initialize game
// TODO: Re-implement this function to support multi-player
var init = function() {
    $.get("/board", function(board) {
        gameUI.setBoard(JSON.parse(board));
    });

    var turn;
    $.get("/turn", function(resp){
        turn = resp.replace(/\"/g, "");
    });

    var timer = setInterval(function () {
        $.get("/turn", function(resp){
            turn = resp.replace(/\"/g, "");
        });
        if(turn === gameUI.player) {
            gameUI.setMessage("It is my, " + turn.toUpperCase() + "'s turn.");
            gameUI.waitForMove();
            waitForOpponentMove();
        } else if(turn === ""){
            gameUI.setMessage("The game has ended.");
            clearInterval(timer);
            $.get("/board", function(board) {
                gameUI.setBoard(JSON.parse(board));
            });
        } else {
            waitForOpponentMove();
        }
    }, 1000);


};



var waitForOpponentMove = function(){
    var turnTimer = setInterval(function() {
        $.get("/turn", function(turn) {
            turn  = turn.replace(/\"/g, "");
            console.log("Server replied with : it's "+turn+"'s turn. ");
            if(turn === gameUI.player) {
                $.get("/board", function(board) {
                    gameUI.setBoard(JSON.parse(board));
                });
                gameUI.enable(); //should i use game-ui waitForMove()?
                clearInterval(turnTimer);
                return turn;
            } else if(turn === "") {
                console.log("Game over");
                clearInterval(turnTimer);
                return turn;
            } else {
                gameUI.disable();
                console.log("Still waiting");
            }
        });
    }, 1000);
};



// Callback function for when the user makes a move
// TODO: Re-implement this function to support multi-player
var callback = function(row, col, player) {
    gameUI.setMessage("It's not my turn"); // TODO: Need to change this;
    gameUI.disable();
	var data = {
		"row": row,
		"col": col,
		"player": player
	};

    $.ajax({
        type: 'GET',
        url: '/move',
        data: data,
        success: function( resp ) {
            console.log("Server replied with legal - " + resp);
        },
        error: function(xhr, status, error) {
            console.log(xhr + " " + status + " "+ error);
        },
        dataType: 'text'
    });
};

// Set callback for user move
gameUI.callback = callback;

// Initialize game
init();
