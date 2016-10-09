var oxoApp = angular.module("oxoApp", []);

oxoApp.controller("oxoController", ["$scope", function (scope) {
    scope.winner = null;

    scope.player1 = {
        letter: "X"
    };

    scope.player2 = {
        letter: "O"
    };
    scope.nobody = {
        letter:"Nobody"
    };

    scope.game = {
        numRows: 3,
        numCells: 3,
        rows: [],
        currentPlayer: scope.player1
    };

    //create the board
    for (i = 0; i < scope.game.numRows; i++) {
        row = {
            cells: [],
        };

        for (j = 0; j < scope.game.numCells; j++) {
            row.cells.push({owner: null});
        }

        scope.game.rows.push(row);
    }

    scope.cellClicked = function (cell) {
        if(scope.winner != null) {
            return;
        }
        if(cell.owner == null) {
            cell.owner = scope.game.currentPlayer;
        
            if(scope.game.currentPlayer == scope.player1) {
                scope.game.currentPlayer = scope.player2;
            }else if (scope.game.currentPlayer == scope.player2) {
                scope.game.currentPlayer = scope.player1;
            }
        }
        checkForWinner();
    };



    var checkForWinner = function () {
        //if someone has already won then return
        if (scope.winner != null) {
            return;
        } else {
            checkRows();
            checkColumns();
            checkFrontDiagonal();
            checkBackDiagonal();

            if(scope.winner == null) {
                checkForDraw();
            }
        }
    };

    var checkRows = function () {
        for(i=0; i < scope.game.numRows; i++) {
            var player1count = 0;
            var player2count = 0;
            for(j=0; j < scope.game.numCells; j++) {
                if (scope.game.rows[i].cells[j].owner == scope.player1) {
                    player1count++;
                } else if (scope.game.rows[i].cells[j].owner == scope.player2) {
                    player2count++;
                }
            }
            //check if someone has won
            if(player1count == scope.game.numCells) {
                scope.winner = scope.player1;
            } else if(player2count == scope.game.numCells) {
                scope.winner = scope.player2;
            }
        }
    };

    var checkColumns = function () {
        for(i=0; i < scope.game.numCells; i++) {
            var player1count = 0;
            var player2count = 0;
            for(j=0; j < scope.game.numRows; j++) {
                if (scope.game.rows[j].cells[i].owner == scope.player1) {
                    player1count++;
                } else if (scope.game.rows[j].cells[i].owner == scope.player2) {
                    player2count++;
                }
            }
            //check if someone has won
            if(player1count == scope.game.numCells) {
                scope.winner = scope.player1;
            } else if(player2count == scope.game.numCells) {
                scope.winner = scope.player2;
            }
        }
    };

    var checkFrontDiagonal = function () {
        var player1count = 0;
        var player2count = 0;
        for(i=0; i < scope.game.numCells; i++) {
            if (scope.game.rows[i].cells[i].owner == scope.player1) {
                player1count++;
            } else if (scope.game.rows[i].cells[i].owner == scope.player2) {
                player2count++;
            }
        }
        //check if someone has won
        if(player1count == scope.game.numCells) {
            scope.winner = scope.player1;
        } else if(player2count == scope.game.numCells) {
            scope.winner = scope.player2;
        }
    };

    var checkBackDiagonal = function () {
        var player1count = 0;
        var player2count = 0;
        for(i=0; i < scope.game.numCells; i++) {
            if (scope.game.rows[i].cells[scope.game.numCells - i - 1].owner == scope.player1) {
                player1count++;
            } else if (scope.game.rows[i].cells[scope.game.numCells - i - 1].owner == scope.player2) {
                player2count++;
            }
        }
        //check if someone has won
        if(player1count == scope.game.numCells) {
            scope.winner = scope.player1;
        } else if(player2count == scope.game.numCells) {
            scope.winner = scope.player2;
        }
    };

    var checkForDraw = function () {
        var usedCellcount = 0;
        for(i=0; i < scope.game.numRows; i++) {            
            for(j=0; j < scope.game.numCells; j++) {
                if (scope.game.rows[i].cells[j].owner != null) {
                    usedCellcount++;
                }
            }
            //check if someone has won
            if(usedCellcount == scope.game.numCells * scope.game.numRows) {
                scope.winner = scope.nobody;
            }
        }
        
    }
}]);