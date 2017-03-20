var opaApp = angular.module("opaApp", []);

opaApp.controller("opaController", ["$scope", function (scope) {
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

    
}]);