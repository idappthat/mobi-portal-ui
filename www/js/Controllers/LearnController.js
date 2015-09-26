(function() {

    var app = angular.module('learn.controller', ['services']);

    app.config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://www.youtube.com/embed/**'
            ]);
    })

    app.controller('LearnController', function($scope, $window, API, logout) {

        //Center the loading spinner
        $scope.center = {'position':'absolute', 'left':'', 'top':''};
        $scope.center.top = $window.innerHeight / 3 + 'px';
        $scope.center.left = $window.innerWidth / 2 - 15 + 'px';
        $scope.spinner = false;

    	$scope.videos = API.videos().query(function() {
            $scope.spinner = true;
        });

        $scope.logOut = function() {
            logout();
        }
    });


})();
