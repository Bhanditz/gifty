// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-lock-screen'])

  .run(function ($ionicPlatform, $lockScreen, $localStorage, appConst) {
    $ionicPlatform.ready(function () {

      var userPassCode = $localStorage.get(appConst.localStorageKeys.userPassCode);
      if (userPassCode) {
        $lockScreen.show({
          code: userPassCode,
          onCorrect: function () {
            console.log('correct!');
          },
          onWrong: function (attemptNumber) {
            console.log(attemptNumber + ' wrong passcode attempt(s)');
          }
        });
      }


      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    // Root app
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl as app'
      })

      // User Registration
      .state('app.registration', {
        url: '/registration',
        views: {
          'menuContent': {
            templateUrl: 'templates/registration.html',
            controller: 'RegistrationCtrl as registrationCtrl'
          }
        }
      })

      // Home
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl as homeCtrl'
          }
        }
      })

      // Activities
      .state('app.activities', {
        url: '/activities',
        views: {
          'menuContent': {
            templateUrl: 'templates/activities.html',
            controller: 'ActivitiesCtrl as activitiesCtrl'
          }
        }
      })

      // Activity
      .state('app.activity', {
        url: '/activities/:activityId',
        views: {
          'menuContent': {
            templateUrl: 'templates/activity.html',
            controller: 'ActivityCtrl as activityCtrl'
          }
        }
      })

      // Send Card
      .state('app.sendCard', {
        url: '/sendCard',
        views: {
          'menuContent': {
            templateUrl: 'templates/sendCard.html',
            controller: 'SendCardCtrl as sendCardCtrl'
          }
        }
      })

      // Load Card
      .state('app.loadCard', {
        url: '/loadCard',
        views: {
          'menuContent': {
            templateUrl: 'templates/loadCard.html',
            controller: 'LoadCardCtrl as loadCardCtrl'
          }
        }
      })

      // Load Card
      .state('app.billingInformation', {
        url: '/billingInformation',
        views: {
          'menuContent': {
            templateUrl: 'templates/billingInformation.html',
            controller: 'BillingInformationCtrl as billingInformationCtrl'
          }
        }
      })

      // Settings
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl as settingsCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
  });
