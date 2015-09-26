

var app = angular.module('services', ['ngResource', 'ngCookies']);

app.factory('API', function($resource) {

    return {
    	events: function() {
    		return $resource("http://localhost:3000/events");   
    	},

    	projects: function() {
    		return $resource("http://localhost:3000/projects");
    	},

        login: function() {
            return $resource('http://localhost:3000/login', {}, {});
        },

        signUp: function() {
            return $resource('http://localhost:3000/signup', {}, {});
        },

        videos: function() {
            return $resource('http://localhost:3000/videos');
        },

        users: function() {
            return $resource('http://localhost:3000/users');
        },

        logOut: function() {
            return $resource('http://localhost:3000/logout', {}, {});
        },

        validate: function() {
            return $resource('http://localhost:3000/validate', {}, {})
        }
    } 
});

app.factory('logout', function($state, $cookies, API) {
    return function() {
        if(!$cookies.get('mobiSession')) {
            $state.go('landing', {}, {});
            return;
        }

        API.logOut().save({'sessionToken': $cookies.get('mobiSession')});
        $cookies.remove('mobiSession');
        $state.go('landing');
    }
});


