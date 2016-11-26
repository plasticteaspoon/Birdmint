adventApp.controller("day2Controller", ["$scope", function (scope) {
    scope.showAnswer = false;

    scope.giveAnswer = function () {
        scope.showAnswer = true;
    }
}]);