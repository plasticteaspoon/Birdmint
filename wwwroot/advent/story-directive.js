angular.module("adventApp").directive("jdStory", [function () {
    return {
        templateUrl: function (elem, attr) {
            return attr.path;
        },
        replace: true
    };
}]);