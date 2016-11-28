adventApp.controller("day2Controller", ["$scope", function (scope) {
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

    var december = 10;
    var pageDate = new Date(2016, december, 2, 0, 0, 0);
    var now = new Date(2016, december);
    
    scope.showAnswer = false;

    scope.giveAnswer = function () {
        if(now > pageDate) {
            scope.showAnswer = true;
        } else {
            scope.messages.info = "The answer shall only be revealed one day after the riddle has been revealed. You must be patient.";
        }
    }
}]);

adventApp.controller("day6Controller", ["$scope", function (scope) {
    scope.showAnswer = false;
    
    scope.giveAnswer = function () {
            scope.showAnswer = true;
    }
}]);