(function() {

    var app = angular.module('members.controller', ['services']);

    app.controller('MembersController', function($scope, $window, API, logout) {

        $scope.members = API.users().query();

        $scope.logOut = function() {
        	logout();
        }
    });


})();
