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
    scope.bombExploded = false;

    scope.startCountdown = function () {
        var timerId = interval(function () {
            scope.countdown = scope.countdown-1;
            if(scope.countdown == 0) {
                interval.cancel(timerId);
                scope.bombExploded = true;
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

    //kitten starting position
    scope.style = {
            'height': '50px',
            'top': '200px',
            'left': -70,
            'position': 'absolute',
            'display': 'block',
            'z-index': '-1'
    };

    var movePerson = function () {
        var timerId = interval(function () {
            if(scope.style.left < 700) {
                scope.style.left++;
            }  else {
                interval.cancel(timerId);
            }
        }, 20);
    };
    setTimeout(movePerson(), 1000);
}]);