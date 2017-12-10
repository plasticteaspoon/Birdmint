'use strict';
adventApp.controller("riddleController", ["$scope", "adventDate", function (scope, adventDate) {
    scope.messages = {
        info:'',
        success:'',
        error:'',
        clear: function () {
            this.info = '';
            this.success = '';
            this.error = '';
        }
    };

    var december = 11;
    var pageDate = new Date(birdmintVars.getCurrentYear(), december, 2, 0, 0, 0);
    var now = adventDate.now();
    
    scope.showAnswer = false;

    scope.giveAnswer = function () {
        if(now > pageDate) {
            scope.showAnswer = true;
        } else {
            scope.messages.info = "The answer shall only be revealed one day after the riddle has been revealed. You must be patient.";
        }
    }
}]);

adventApp.controller("jokeController", ["$scope", function (scope) {
    scope.showAnswer = false;
    
    scope.giveAnswer = function () {
            scope.showAnswer = true;
    }
}]);

adventApp.controller("day23Controller", ["$scope", function (scope) {
    scope.messages = {
        info:'',
        success:'',
        error:'',
        clear: function () {
            this.info = '';
            this.success = '';
            this.error = '';
        }
    };

    scope.selectedBauble = null;

    scope.bauble1Colour = 'grey';
    scope.bauble2Colour = 'grey';
    scope.bauble3Colour = 'grey';
    scope.bauble4Colour = 'grey';
    scope.bauble5Colour = 'grey';
    scope.bauble6Colour = 'grey';
    scope.bauble7Colour = 'grey';
    scope.bauble8Colour = 'grey';
    scope.bauble9Colour = 'grey';
    scope.bauble10Colour = 'grey';
    scope.bauble11Colour = 'grey';
    scope.bauble12Colour = 'grey';

    scope.selectBauble = function (colour) {
        scope.selectedBauble = colour;
    };

    scope.placeBauble = function (bauble) {
        if(scope.selectedBauble) {
            if(bauble == 'bauble1') {
                scope.bauble1Colour = scope.selectedBauble;
            } else if(bauble == 'bauble2') {
                scope.bauble2Colour = scope.selectedBauble;
            } else if(bauble == 'bauble3') {
                scope.bauble3Colour = scope.selectedBauble;
            } else if(bauble == 'bauble4') {
                scope.bauble4Colour = scope.selectedBauble;
            } else if(bauble == 'bauble5') {
                scope.bauble5Colour = scope.selectedBauble;
            } else if(bauble == 'bauble6') {
                scope.bauble6Colour = scope.selectedBauble;
            } else if(bauble == 'bauble7') {
                scope.bauble7Colour = scope.selectedBauble;
            } else if(bauble == 'bauble8') {
                scope.bauble8Colour = scope.selectedBauble;
            } else if(bauble == 'bauble9') {
                scope.bauble9Colour = scope.selectedBauble;
            } else if(bauble == 'bauble10') {
                scope.bauble10Colour = scope.selectedBauble;
            } else if(bauble == 'bauble11') {
                scope.bauble11Colour = scope.selectedBauble;
            } else if(bauble == 'bauble12') {
                scope.bauble12Colour = scope.selectedBauble;
            }
        }
    };

    scope.selected = function (bauble) {
        if (bauble == scope.selectedBauble) {          
            return true;
        } else {
            return false;
        }
    };
}]);

adventApp.controller("day22Controller", ["$scope", function (scope) {
    scope.showAnswer = false;
    
    scope.giveAnswer = function () {
            scope.showAnswer = true;
    }
}]);


adventApp.controller("day20Controller", ["$scope", function (scope) {
    console.log("Starting controller");

    var box = [
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-3-0.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-2-1.jpg',
            position: null,
            taken: false,
            selected: false
        },        
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-0-1.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-2-3.jpg',
            position: null,
            taken: false,
            selected: false
        },          
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-0-2.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-0-3.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-1-0.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-2-0.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-1-1.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-0-0.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-1-2.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-3-2.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-1-3.jpg',
            position: null,
            taken: false,
            selected: false
        },        
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-2-2.jpg',
            position: null,
            taken: false,
            selected: false
        },      
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-3-1.jpg',
            position: null,
            taken: false,
            selected: false
        },
        {
            picturePath: 'pictures/large/jigsaw-pieces/headphones-3-3.jpg',
            position: null,
            taken: false,
            selected: false
        }
    ];

    var board = {
        cells: [
            {
                picture: null,
                x: 0,
                y: 0,
                pieceIndex: null
            },
            {
                picture: null,
                x: 1,
                y: 0,
                pieceIndex: null                
            },

            {
                picture: null,
                x: 2,
                y: 0,
                pieceIndex: null
            },
            {
                picture: null,
                x: 3,
                y: 0,
                pieceIndex: null
            },
            {
                picture: null,
                x: 0,
                y: 1,
                pieceIndex: null
            },
            {
                picture: null,
                x: 1,
                y: 1,
                pieceIndex: null
            },

            {
                picture: null,
                x: 2,
                y: 1,
                pieceIndex: null
            },
            {
                picture: null,
                x: 3,
                y: 1,
                pieceIndex: null
            },            
            {
                picture: null,
                x: 0,
                y: 2,
                pieceIndex: null
            },
            {
                picture: null,
                x: 1,
                y: 2,
                pieceIndex: null
            },
            {
                picture: null,
                x: 2,
                y: 2,
                pieceIndex: null
            },
            {
                picture: null,
                x: 3,
                y: 2,
                pieceIndex: null
            },            
            {
                picture: null,
                x: 0,
                y: 3,
                pieceIndex: null
            },
            {
                picture: null,
                x: 1,
                y: 3,
                pieceIndex: null
            },
            {
                picture: null,
                x: 2,
                y: 3,
                pieceIndex: null
            },
            {
                picture: null,
                x: 3,
                y: 3,
                pieceIndex: null
            }            
        ]
    };

    scope.box = box;
    scope.board = board;

    scope.selectedPiece = null;

    scope.onDrop = function (cell, data) {
        //console.log("Cell contains: " + JSON.stringify(cell));
        //console.log("Data contains: " + JSON.stringify(data));
        cell.picture = 'url("' + box[data.index].picturePath + '")';

        if (cell.pieceIndex != null) {
            box[cell.pieceIndex].taken = false;
        }        
        if (data.originCell == null) {
            box[data.index].taken = true;
        } else {
            board.cells[data.originCell].pieceIndex = null;
            board.cells[data.originCell].picture = null;
        }

        cell.pieceIndex = data.index;
    };
}]);

adventApp.controller("day25Controller", ["$scope", function (scope) {
    scope.presentOpened = false;
    
    scope.openPresent = function () {
            scope.presentOpened = true;
    }
}]);