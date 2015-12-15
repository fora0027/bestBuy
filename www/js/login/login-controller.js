angular.module('bestBuyAssignment')

.controller('LoginCtrl', function ($scope, $ionicModal, $timeout, $auth, $ionicPopup, $q, $http, $location, $ionicTabsDelegate, StorageService) {

    // Form data for the login modal
    $scope.loginData = {};
    $scope.fbRetrieved = [];

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.normalLogin = function (username, password) {
        console.log("normalLogin");
        var badUsername = "guest";
//        console.log("Password: " + password);
//        console.log("Username: " + username);
//        $scope.addUserPass(username);
        if (username && password != null) {
            if (username != badUsername && password.length >= 5) {
                $scope.modal.hide();
            } else {
                $scope.add("Invalid Username/Password");
                $ionicPopup.alert({
                    title: 'Please Try Again',
                    content: 'Username Can Not Be "Guest" and Password Must Be More Than 5 Characters'
                })
            }
        } else {
            $ionicPopup.alert({
                title: 'Please Try Again',
                content: 'Make Sure You Enter Your Username AND Password'
            })
        }
    }

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    $scope.fbLogin = function () {

    }

    $scope.getFBData = function () {
        var deferred = $q.defer();

        FacebookService.me().success(function (data) {
                deferred.resolve(data);

                $scope.fbData = data;

                console.log($scope.fbData);
            })
            .error(function (errorData) {
                deferred.reject(errorData)
            });
        return deferred.promise;
    }

    $scope.authenticate = function (provider) {
        $auth.authenticate(provider).then(function (result) {
            var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
            var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
            $http.get(graphApiUrl).then(function (response) {
                $scope.fbRetrieved = [response.data.first_name, response.data.last_name]
                $ionicPopup.alert({
                    title: 'Success',
                    content: 'Welcome ' + response.data.first_name + "!"
                })

                .catch(function (response) {
                    $ionicPopup.alert({
                        title: 'Error',
                        content: response.data ? response.data ||
                            response.data.message : response
                    })
                    $scope.add("Login Unsuccessful");
                });
            })
        });

        $scope.modal.hide();




        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };

    $scope.isAuthenticated = function () {
//        if (StorageService.getLogged[0] != null) {
//            return true;
//            console.log($auth.isAuthenticated());
//        } else {
            return $auth.isAuthenticated();
//        }
    }

    $scope.logout = function () {
        return $auth.logout();
    }

    $scope.logs = StorageService.getAll();
    $scope.add = function (newLog) {
        StorageService.add(newLog);
    };
    $scope.addUserPass = function (newLog) {
        StorageService.addUserPass(newLog);
    };

    $scope.isLoggedIn = function (logged) {
        if ($scope.getLogged != null) {
            return true;
        } else {
            return false;
        }
    }
    
//    $scope.showing = function(){
//        var authenticated = $scope.isAuthenticated();
//        if(authenticated){
//            console.log("showing");
//            return true;
//        }else{
//            console.log("hidden");
//            return false;
//        }
//    }

});