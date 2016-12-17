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
    var pageDate = new Date(2016, december, 2, 0, 0, 0);
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
