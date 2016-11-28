var adventApp = angular.module("adventApp", ["ngRoute", "ang-drag-drop"]);

adventApp.controller("adventController", ["$scope", "$location", function (scope, location) {
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

    mangleCalendarData();

    scope.calendar = calendarData;
    
    scope.openDoorIfCorrectTime = openDoorIfCorrectTime;

    scope.dayPage = function (cell) {
        location.url(cell.link);
    };

    function openDoorIfCorrectTime (cell) {
        var december = 10;
        var doorDate = new Date(2016, december, cell.number, 0, 0, 0);
        var now = new Date();

        if(now > doorDate) {
            cell.open = true;
        }
    };

    // mangle calendarData so it will open up to and not including today's doors
    function mangleCalendarData () {
        calendarData.rows.forEach(function(row) {
            row.cells.forEach(function(cell) {
                openDoorIfCorrectTime(cell);
            });
        });
    }
}]);

adventApp.config(["$routeProvider", function(routeProvider) {
    routeProvider
    .otherwise( {
        templateUrl : "calendar-view.html"
    })
    .when("/day1", {
        templateUrl : "templates/day1.html"
    })
    .when("/day2", {
        templateUrl : "templates/day2.html"
    })
    .when("/day3", {
        templateUrl : "templates/day3.html"
    })
    .when("/day4", {
        templateUrl : "templates/day4.html"
    })
    .when("/day5", {
        templateUrl : "templates/day5.html"
    })
    .when("/day6", {
        templateUrl : "templates/day6.html"
    })
    .when("/day7", {
        templateUrl : "templates/day7.html"
    })
    .when("/day8", {
        templateUrl : "templates/day8.html"
    })
    .when("/day9", {
        templateUrl : "templates/day9.html"
    })
    .when("/day9", {
        templateUrl : "templates/day9.html"
    })
    .when("/day10", {
        templateUrl : "templates/day10.html"
    })
    .when("/day11", {
        templateUrl : "templates/day11.html"
    })
    .when("/day12", {
        templateUrl : "templates/day12.html"
    })
    .when("/day13", {
        templateUrl : "templates/day13.html"
    })
    .when("/day14", {
        templateUrl : "templates/day14.html"
    })
    .when("/day15", {
        templateUrl : "templates/day15.html"
    })
    .when("/day16", {
        templateUrl : "templates/day16.html"
    })
    .when("/day17", {
        templateUrl : "templates/day17.html"
    })
    .when("/day18", {
        templateUrl : "templates/day18.html"
    })
    .when("/day19", {
        templateUrl : "templates/day19.html"
    })
    .when("/day20", {
        templateUrl : "templates/day20.html"
    })
    .when("/day21", {
        templateUrl : "templates/day21.html"
    })
    .when("/day22", {
        templateUrl : "templates/day22.html"
    })
    .when("/day23", {
        templateUrl : "templates/day23.html"
    })
    .when("/day24", {
        templateUrl : "templates/day24.html"
    })
    .when("/day25", {
        templateUrl : "templates/day25.html"
    });
}]);