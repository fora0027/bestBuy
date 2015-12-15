// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('bestBuyAssignment', ['ionic', 'satellizer', 'ngSanitize', 'ngStorage', 'ngCordova'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($authProvider) {
    $authProvider.facebook({
        clientId: '180348285649244',
        scope: 'email, public_profile, user_photos, user_friends',
        responseType: 'token'
    });
    $authProvider.google({
        clientId:'330544123901-afen8bv0kogqrkdb1c8evburmbttef70.apps.googleusercontent.com',
        redirectUri: 'http://localhost:8100/tab/account',
        scope: ['profile', 'email'],
        responseType:'token'
    });
})

.config(function ($stateProvider, $urlRouterProvider, $authProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('app', {
        url:'/app',
        abstract:true,
        templateUrl:'/templates/tabs.html',
        controller:'LoginCtrl'
    })
    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'LoginCtrl'
    })

    // Each tab has its own nav history stack:
    .state('tab.login', {
        url: '/login',
        views: {
            'tab-account': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
        }
    })


    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'LoginCtrl'
            }
        }
    })


    .state('tab.search', {
        url: '/search',
        views: {
            'tab-search': {
                templateUrl: 'templates/tab-search.html',
                controller: 'SearchCtrl'
            }
        }
    })

    .state('tab.stores', {
        url: '/stores',
        views: {
            'tab-stores': {
                templateUrl: 'templates/tab-stores.html',
                controller: 'StoresCtrl'
            }
        }
    })

    .state('tab.logs', {
        url: '/logs',
        views: {
            'tab-logs': {
                templateUrl: 'templates/tab-logs.html',
                controller: 'LogsCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/account');

});