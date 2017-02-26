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
        numRows: 4,
        numCols: 4,
        numMines: 6,
        rows: []
    };

    for (var i = 0; i < scope.grid.numRows; i++) {
        var row = {
            cells: []
        };

        for (var j = 0; j < scope.grid.numCols; j++) {
            row.cells.push({ mined: false, open: false, marked: false, x: j, y: i, numCloseMines: 0});
        }

        scope.grid.rows.push(row);
    }

    placeMines();
    countSurroundingMines();

    scope.cellClicked = function (cell) {
        if(cell.open == false) {
            cell.open = true;
        } else {
            cell.open = false;
        }
    };
    scope.cellRightClicked = function (cell) {
        if(cell.marked == false) {
            cell.marked = true;
        } else {
            cell.marked = false;
        }
    };

    function placeMines () {
        while (minesPlaced < scope.grid.numMines) {
            var randomRow = Math.floor((Math.random() * (scope.grid.numRows - 1)) + 0);
            var randomCol = Math.floor((Math.random() * (scope.grid.numCols - 1)) + 0);

            if (scope.grid.rows[randomRow].cells[randomCol].mined == false) {
                scope.grid.rows[randomRow].cells[randomCol].mined = true;
                minesPlaced++;
            }
        }
    }

    function countSurroundingMines () {
        for (var i = 0; i < scope.grid.numRows; i++) {

            for (var j = 0; j < scope.grid.numCols; j++) {
                var mineCount = 0;
                
                if(scope.grid.rows[i].cells[j-1] && 
                scope.grid.rows[i].cells[j-1].mined == true) {
                       mineCount ++;
                } if(scope.grid.rows[i].cells[j+1] &&
                  scope.grid.rows[i].cells[j+1].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i-1] && 
                  scope.grid.rows[i-1].cells[j].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i-1] &&
                  scope.grid.rows[i-1].cells[j-1] && 
                  scope.grid.rows[i-1].cells[j-1].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i-1] &&
                  scope.grid.rows[i-1].cells[j+1] && 
                  scope.grid.rows[i-1].cells[j+1].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i+1] && 
                  scope.grid.rows[i+1].cells[j].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i+1] &&
                  scope.grid.rows[i+1].cells[j-1] && 
                  scope.grid.rows[i+1].cells[j-1].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i+1] &&
                  scope.grid.rows[i+1].cells[j+1] && 
                  scope.grid.rows[i+1].cells[j+1].mined == true) {
                      mineCount ++;
                }
                
                scope.grid.rows[i].cells[j].numCloseMines = mineCount;
            }
        }
    }
}]);