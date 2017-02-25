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

    for (i = 0; i < scope.grid.numRows; i++) {
        row = {
            cells: []
        };

        for (j = 0; j < scope.grid.numCols; j++) {
            row.cells.push({ mined: false, open: false, marked: false, x: j, y: i, numCloseMines: 0});
        }

        scope.grid.rows.push(row);
    }

    placeMines();

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
            randomRow = Math.floor((Math.random() * (scope.grid.numRows - 1)) + 0);
            randomCol = Math.floor((Math.random() * (scope.grid.numCols - 1)) + 0);

            if (scope.grid.rows[randomRow].cells[randomCol].mined == false) {
                scope.grid.rows[randomRow].cells[randomCol].mined = true;
                minesPlaced++;
            }
        }
    }

    function countSurroundingMines () {
        for (i = 0; i < scope.grid.numRows; i++) {

            for (j = 0; j < scope.grid.numCols; j++) {
                mineCount = 0;
                
                if(scope.grid.rows[i].cells[j-1].x >= 0 && 
                scope.grid.rows[i].cells[j-1].x < numCols && 
                scope.grid.rows[i].cells[j-1].mined == true) {
                       mineCount ++;
                } if(scope.grid.rows[i].cells[j+1].x >= 0 && 
                  scope.grid.rows[i].cells[j+1].x < numCols && 
                  scope.grid.rows[i].cells[j+1].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i-1].cells[j].y >= 0 && 
                  scope.grid.rows[i-1].cells[j].y < numRows && 
                  scope.grid.rows[i-1].cells[j].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i-1].cells[j-1].x >= 0 && 
                  scope.grid.rows[i-1].cells[j-1].x < numCols &&
                  scope.grid.rows[i-1].cells[j-1].y >= 0 && 
                  scope.grid.rows[i-1].cells[j-1].y < numRows && 
                  scope.grid.rows[i-1].cells[j-1].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i-1].cells[j+1].x >= 0 && 
                  scope.grid.rows[i-1].cells[j+1].x < numCols &&
                  scope.grid.rows[i-1].cells[j+1].y >= 0 && 
                  scope.grid.rows[i-1].cells[j+1].y < numRows && 
                  scope.grid.rows[i-1].cells[j+1].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i+1].cells[j].y >= 0 && 
                  scope.grid.rows[i+1].cells[j].y < numRows && 
                  scope.grid.rows[i+1].cells[j].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i+1].cells[j-1].x >= 0 && 
                  scope.grid.rows[i+1].cells[j-1].x < numCols &&
                  scope.grid.rows[i+1].cells[j-1].y >= 0 && 
                  scope.grid.rows[i+1].cells[j-1].y < numRows && 
                  scope.grid.rows[i+1].cells[j-1].mined == true) {
                      mineCount ++;
                } if(scope.grid.rows[i+1].cells[j+1].x >= 0 && 
                  scope.grid.rows[i+1].cells[j+1].x < numCols &&
                  scope.grid.rows[i+1].cells[j+1].y >= 0 && 
                  scope.grid.rows[i+1].cells[j+1].y < numRows && 
                  scope.grid.rows[i+1].cells[j+1].mined == true) {
                      mineCount ++;
                }
                
                scope.grid.rows[i].cells[j].numCloseMines = mineCount;
            }
        }
    }
}]);