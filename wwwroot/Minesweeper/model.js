"use strict";
var mineApp = angular.module("mineApp", ['ngRightClick']);

mineApp.controller("mineController", ["$scope", function (scope) {
    scope.messages = {
        warning:'',
        success:'',
        error:'',
        clear: function () {
            this.warning = '';
            this.success = '';
            this.error = '';
        }
    };

    var minesPlaced = 0;

    scope.grid = {
        numRows: 10,
        numCols: 10,
        numMines: 10,
        rows: []
    };

    for (var i = 0; i < scope.grid.numRows; i++) {
        var row = {
            cells: []
        };

        for (var j = 0; j < scope.grid.numCols; j++) {
            row.cells.push({ 
                mined: false,
                detonated: false, 
                open: false, 
                marked: false, 
                x: j, 
                y: i, 
                numCloseMines: 0
            });
        }

        scope.grid.rows.push(row);
    }

    placeMines();
    countSurroundingMines();

    scope.cellClicked = function (cell) {
        if(getGameState() == 'playing') {
            if(cell.marked) {
                //do nothing
            } else if(cell.mined) {
                cell.detonated = true;
                gameOver();
            } else {
                openCell(cell);
            }
        }

    };
    scope.cellRightClicked = function (cell) {
        if(getGameState() == 'playing') {
            if(cell.marked == false && cell.open == false) {
                cell.marked = true;
            } else {
                cell.marked = false;
            }
        }
    };

    function placeMines () {
        while (minesPlaced < scope.grid.numMines) {
            var randomRow = Math.floor((Math.random() * scope.grid.numRows));
            var randomCol = Math.floor((Math.random() * scope.grid.numCols));

            if (scope.grid.rows[randomRow].cells[randomCol].mined == false) {
                scope.grid.rows[randomRow].cells[randomCol].mined = true;
                minesPlaced++;
            }
        }
    }

    function countSurroundingMines () {
        var cell;

        for (var j = 0; j < scope.grid.numRows; j++) {
            for (var i = 0; i < scope.grid.numCols; i++) {
                var mineCount = 0;
                cell = getCell(j, i);
                var neighbors = getNeighbors(cell);

                neighbors.forEach(function (neighbor) {
                    if(neighbor.mined) {
                        mineCount++;
                    }
                });
                
                cell.numCloseMines = mineCount;
            }
        }
    }

    function openCell (cell) {
        if(cell.open) {
            return;
        }

        var neighbors = getNeighbors(cell);
        cell.open = true;

        if(cell.numCloseMines == 0) {
            neighbors.forEach(function (neighbor) {
                openCell(neighbor);
            });
        }
    }

    function getCell (rowNum, colNum) {
        var result = null;

        if (scope.grid.rows[rowNum] && scope.grid.rows[rowNum].cells[colNum]) {
            result = scope.grid.rows[rowNum].cells[colNum];
        }
        return result;
    }

    function getNeighbors (cell) {
        var neighbors = [];
        var neighbor;

        for(var i=-1; i<=1; i++) {
            for(var j=-1; j<=1; j++) {
                neighbor = getCell(cell.y + i, cell.x + j);
                //a cell isn't its own neighbor. REMEMBER THIS!!!
                //either in a different collum or a different row. Or both.
                if(neighbor && (cell.y != i || cell.x != j)) {
                    neighbors.push(neighbor);
                }
            }
        }

        return neighbors;        
    }

    function getGameState () {
        var openCellCount = 0;
        var markedCellCount = 0;
        var explodedCellCount = 0;

        scope.grid.rows.forEach(function (row) {
            row.cells.forEach(function (cell) {
                if(cell.open && cell.mined) {
                    explodedCellCount++;
                }
                if(cell.open) {
                    openCellCount++;
                }
                if(cell.marked) {
                    markedCellCount++;
                }
            });
        });

        if(explodedCellCount > 0) {
            return 'lost';
        } else if(openCellCount + markedCellCount == scope.grid.numRows*scope.grid.numCols && 
                  markedCellCount == scope.grid.numMines) {
            return 'won';
        } else {
            return 'playing';
        }
    }

    scope.getGameState = getGameState;

    function gameOver () {
        scope.grid.rows.forEach(function (row) {
            row.cells.forEach(function (cell) {
                if(cell.mined) {
                    cell.open = true;
                }
            });
        });

    }
}]);