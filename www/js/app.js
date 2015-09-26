// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic',
    'starter.controllers',
    'dashboard.controller',
    'events.controller',
    'learn.controller',
    'members.controller',
    'projects.controller',
    'services'
]);


app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

/**
 * State change watcher to for checking states
 */
app.run(function($rootScope, $state, $cookies, API) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {

         if(!$cookies.get('mobiSession') && toState.name === 'landing') {
            return;
         }

         else if(!$cookies.get('mobiSession')) {
            $state.go('landing');
            return;
         }


         API.validate().save({'sessionToken':$cookies.get('mobiSession')})
            .$promise.then(function(resposne) {
                if(typeof resposne.code !== 'undefined') {
                    $cookies.remove('mobiSession');
                    $state.go('landing');
                    return;
                }
        });
    });
});

// /**
//  * Startup checks
//  */
// app.run(function($state, $cookies, $ionicPopup, API) {

//     if(!$cookies.get('mobiSession')) {
//         console.log("No cookie");
//         return;
//     }

//     API.validate().save({'sessionToken':$cookies.get('mobiSession')})
//         .$promise.then(function(response) {

//         if(typeof response.code !== 'undefined') {
//             console.log("invalid cookie");
//             $cookie.remove('mobiSession');
//             return;
//         }

//         console.log("valid cookie");
//         $state.go('dashboard.events');
//     });
// });

app.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('landing', {
            url: '/landing',
            templateUrl: 'templates/landing.html',
            controller: 'LandingController',
            
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html',
            abstract: true
        })
        .state('dashboard.events', {
            url: '/events',
            views: {
                events: {
                    templateUrl: 'templates/events.html',
                    controller: 'EventsController'
                }
            }
        })
        .state('dashboard.learn', {
            url: '/learn',
            views: {
                learn: {
                    templateUrl: 'templates/learn.html',
                    controller: 'LearnController'
                }
            }
        })        
        .state('dashboard.projects', {
            url: '/projects',
            views: {
                projects: {
                    templateUrl: 'templates/projects.html',
                    controller: 'ProjectsController'
                }
            } 
        })
        .state('dashboard.members', {
            url: '/members',
            views: {
                members: {
                    templateUrl: 'templates/members.html',
                    controller: 'MembersController'
                }
            }
        });
        // .state('dashboard.android', {
        //     url: '/android',
        //     views: {
        //         learn: {
        //             templateUrl: 'templates/android.html',
        //             controller: ''
        //         }
        //     }
        // })
        // .state('dashboard.ios', {
        //     url: '/ios',
        //     views: {
        //         learn: {
        //             templateUrl: 'templates/ios.html',
        //             controller: ''
        //         }
        //     }
        // })
        // .state('dashboard.web', {
        //     url: '/web',
        //     views: {
        //         learn: {
        //             templateUrl: 'templates/web.html',
        //             controller: ''
        //         }
        //     }
        // })
        // .state('dashboard.hardware', {
        //     url: '/hardware',
        //     views: {
        //         learn: {
        //             templateUrl: 'templates/hardware.html',
        //             controller: ''
        //         }
        //     }
        // });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('landing');

});
