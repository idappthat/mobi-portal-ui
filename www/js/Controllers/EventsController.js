(function() {

    var app = angular.module('events.controller', ['services']);

    app.controller('EventsController', function($scope, $state, $window, $cookies, API, logout) {


        $scope.events = [];

        //Center the loading spinner
        $scope.spinner = false;
        $scope.center = {'position':'absolute', 'left':'', 'top':''};
        $scope.center.top = $window.innerHeight / 3 + 'px';
        $scope.center.left = $window.innerWidth / 2 - 15 + 'px';

        //Query the server with the API module
        API.events().query(function(events) {
            events.forEach(function(event) {
                var start = new Date(event.start);
                var end = new Date(event.end);

                var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                var date = "";
                var hour = "";
                var formatted = "";
                var minute = "";
                var postfix = '';

                date = start.toLocaleDateString('en-US', options);
                hour = (start.getHours() + 1) % 12;
                formatted = (hour === 0) ? 12 : hour;
                minute = start.getMinutes();
                postfix = start.getHours() < 12 ? ' am' : ' pm';

                if(minute < 10) minute = "0" + start.getMinutes();
                
                event.start = date + " at " + formatted + ":" + minute + postfix;


                date = end.toLocaleDateString('en-US', options);
                hour = (end.getHours() + 1) % 12;
                formatted = (hour === 0) ? 12 : hour;
                minute = end.getMinutes();
                postfix = end.getHours() < 12 ? ' am' : ' pm';

                if(minute < 10) minute = "0" + end.getMinutes();

                event.end = "to " + date + " at " + formatted + ":" + minute + postfix;

                $scope.events.push(event);
            });
            $scope.spinner = true;
        });


        $scope.logOut = function() {
            logout();
        }
    });

})();
