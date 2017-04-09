var opaApp = angular.module("opaApp", []);

opaApp.controller("opaController", ["$scope", "$interval", function (scope, interval) {
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

    scope.countdown = 10;

    scope.startCountdown = function () {
        var timerId = interval(function () {
            scope.countdown = scope.countdown-1;
            if(scope.countdown == 0) {
                interval.cancel(timerId);
            }
        }, 1000);
    };

    scope.countdownClass = function () {
        if(scope.countdown == 10) {
            return false;
        } else {
            return true;
        }
    };
}]);