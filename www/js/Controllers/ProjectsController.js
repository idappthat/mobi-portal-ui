(function() {

    var app = angular.module('projects.controller', ['services']);

    app.controller('ProjectsController', function($scope, $window, API, logout) {

        //Center the loading spinner
        $scope.spinner = false;
        $scope.center = {'position':'absolute', 'left':'', 'top':''};
        $scope.center.top = $window.innerHeight / 3 + 'px';
        $scope.center.left = $window.innerWidth / 2 - 15 + 'px';

        $scope.projects = API.projects().query();
        $scope.spinner = true;

        $scope.logOut = function() {
            logout();
        }
    });


})();
