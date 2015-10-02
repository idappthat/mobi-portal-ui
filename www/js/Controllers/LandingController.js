(function() {

    var app = angular.module('starter.controllers', ['services', 'ionic', 'ngCookies']);

    app.controller('LandingController', function($scope, $ionicPopup, $state, $cookies, API, logout) {
        $scope.logo = "img/mobilogo.png";
        $scope.createButton = "Create Account";
        $scope.signInButton = "Sign In";


        $scope.userData = {
            "email" : '',
            "password" : '',
            "newMember" : false,
            "username" : '',
            'firstName' : '',
            'lastName' : '',
            'tshirtSize': '',
            'studentId' : ''
        };

        /* Sign in / Submit button */
        $scope.signIn = function() {     

            if($scope.userData.newMember) {
                API.signUp().save($scope.userData, function(response) {

                    if(typeof response.code !== 'undefined') {
                        switch(response.code) {
                            case 202:
                                $ionicPopup.alert({title: 'Error!', template: response.message});
                                return;

                            case 203:
                                $ionicPopup.alert({title: 'Error!', template: response.message});
                                return;
                        }
                    }

                    $scope.createAcc();
                    $ionicPopup.alert({
                        title: 'Awesome!',
                        template: 'Yay are now signed up for Mobi! Once you are a full member your account will be activated!'
                    });
                    $scope.userData = {};
                    logout();
                });
            }

            else {
                API.login().save($scope.userData).$promise.then(function(response) {
                    if(typeof response.code !== 'undefined') {
                        $ionicPopup.alert({title: 'Error!', template: 'Invalid Username or Password'});
                        $scope.userData = {};
                        return;
                    }
                    else if(typeof response.datePayed === 'undefined') {
                        logout();
                        return;
                    }
                    $cookies.put('mobiSession', response.sessionToken);
                    $state.go('dashboard.events', {}, {});
                });
            }
        }
        /* Create account / Cancel button*/
        $scope.createAcc = function() {

            if ($scope.userData.newMember) {
                $scope.userData.newMember = false;
                $scope.createButton = "Create Account";
                $scope.signInButton = "Sign In";
            } 
            else {
                $scope.userData.newMember = true;
                $scope.createButton = "Cancel";
                $scope.signInButton = "Submit";
            }

        }

        $scope.valid = function(isValid, isDirty) {
            if(!$scope.userData.newMember) return '';
            if(isValid && isDirty) return 'valid';
            else if(!isValid && isDirty) return 'invalid';
            return '';
        }
    });


})();
