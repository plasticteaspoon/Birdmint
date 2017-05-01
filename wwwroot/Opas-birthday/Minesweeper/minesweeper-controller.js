angular.module("mineApp", ['ngRightClick']);

angular.module("mineApp").controller("mineController", ["$scope", function (scope) {
    var minesPlaced = null;

    scope.grid = undefined;
    
    scope.startGame = function () {
        minesPlaced = 0;
        
        scope.grid = {
            numRows: 10,
            numCols: 11,
            numMines: 10,
            rows: []
        };

        createCells();
        placeMines();
        countSurroundingMines();
    };

    var createCells = function () {
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
    };

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
        scope.grid.rows[1].cells[1].mined = true;
        scope.grid.rows[1].cells[4].mined = true;
        scope.grid.rows[1].cells[5].mined = true;
        scope.grid.rows[1].cells[9].mined = true;

        scope.grid.rows[2].cells[0].mined = true;
        scope.grid.rows[2].cells[2].mined = true;
        scope.grid.rows[2].cells[4].mined = true;
        scope.grid.rows[2].cells[6].mined = true;
        scope.grid.rows[2].cells[8].mined = true;
        scope.grid.rows[2].cells[10].mined = true;

        scope.grid.rows[3].cells[0].mined = true;
        scope.grid.rows[3].cells[2].mined = true;
        scope.grid.rows[3].cells[4].mined = true;
        scope.grid.rows[3].cells[6].mined = true;
        scope.grid.rows[3].cells[8].mined = true;
        scope.grid.rows[3].cells[10].mined = true;

        scope.grid.rows[4].cells[0].mined = true;
        scope.grid.rows[4].cells[2].mined = true;
        scope.grid.rows[4].cells[4].mined = true;
        scope.grid.rows[4].cells[5].mined = true;
        scope.grid.rows[4].cells[8].mined = true;
        scope.grid.rows[4].cells[10].mined = true;

        scope.grid.rows[5].cells[0].mined = true;
        scope.grid.rows[5].cells[2].mined = true;
        scope.grid.rows[5].cells[4].mined = true;
        scope.grid.rows[5].cells[8].mined = true;
        scope.grid.rows[5].cells[9].mined = true;
        scope.grid.rows[5].cells[10].mined = true;

        scope.grid.rows[6].cells[0].mined = true;
        scope.grid.rows[6].cells[2].mined = true;
        scope.grid.rows[6].cells[4].mined = true;
        scope.grid.rows[6].cells[8].mined = true;
        scope.grid.rows[6].cells[10].mined = true;

        scope.grid.rows[7].cells[0].mined = true;
        scope.grid.rows[7].cells[2].mined = true;
        scope.grid.rows[7].cells[4].mined = true;
        scope.grid.rows[7].cells[8].mined = true;
        scope.grid.rows[7].cells[10].mined = true;

        scope.grid.rows[8].cells[1].mined = true;
        scope.grid.rows[8].cells[4].mined = true;
        scope.grid.rows[8].cells[8].mined = true;
        scope.grid.rows[8].cells[10].mined = true;
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

    scope.startGame();
}]);
