angular.module("adventApp").directive("jdHome", [function () {
    return {
        template: '<a href="#">Back to the calendar</a>',
        replace: true
    };
}]);