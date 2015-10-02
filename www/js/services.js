

var app = angular.module('services', ['ngResource', 'ngCookies']);

app.factory('API', function($resource) {

    return {
    	events: function() {
    		return $resource("http://localhost/events");   
    	},

    	projects: function() {
    		return $resource("http://localhost/projects");
    	},

        login: function() {
            return $resource('http://localhost/login', {}, {});
        },

        signUp: function() {
            return $resource('http://localhost/signup', {}, {});
        },

        videos: function() {
            return $resource('http://localhost/videos');
        },

        users: function() {
            return $resource('http://localhost/users');
        },

        logOut: function() {
            return $resource('http://localhost/logout', {}, {});
        },

        validate: function() {
            return $resource('http://localhost/validate', {}, {})
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


