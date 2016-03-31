angular.module('starter.controllers', [])

  // Root app + Menu
  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicLoading, $localStorage, $ionicHistory, appConst, $state) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    var vm = this;
    vm.dictionary = appConst.dictionary;
    vm.localStorageKeys = appConst.localStorageKeys;
    var loginState = $localStorage.get(vm.localStorageKeys.loginState);
    if (!loginState) {
      $state.go('app.login');
    }


    $scope.logout = function () {
      $ionicLoading.show({template: 'Logging out....'});
      $localStorage.set(vm.localStorageKeys.loginState, false);
      $localStorage.removeAll(appConst.localStorageKeys);

      $timeout(function () {
        $ionicLoading.hide();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({disableBack: true, historyRoot: true});
        $state.go('app.login');
      }, 30);

    };

    // Form data for the login modal
    $scope.loginData = {};    
  })


  // Login
  .controller('LoginCtrl', function ($state) {
    var vm = this;

    vm.onLogInClick = function () {
      $state.go('app.home');
    };

  })


  // Registration
  .controller('RegistrationCtrl', function ($state) {
    var vm = this;
    vm.hideTextDate = false;
    vm.onRegistrationClick = function () {
      $state.go('app.home');
    };

    vm.onDateFocus = function () {
      vm.hideTextDate = true;
      document.getElementById('date').focus();
    };

  })


  // Home
  .controller('HomeCtrl', function () {
    var vm = this;
    vm.activities = [];
    for (var i = 0; i < 10; i++) {
      vm.activities.push({
        id: i,
        shopName: 'Castro' + i,
        price: i * 100,
        dateAndTime: "20-03-2016 12:00"
      });
    }

  })


  // Activities
  .controller('ActivitiesCtrl', function () {
    var vm = this;

    vm.activities = [];
    for (var i = 0; i < 10; i++) {
      vm.activities.push({
        id: i,
        shopName: 'Castro' + i,
        price: i * 100,
        dateAndTime: "20-03-2016 12:00"
      });
    }

  })

  .controller('ActivityCtrl', function () {
    var vm = this;

  })


  // Settings
  .controller('SettingsCtrl', function ($ionicModal, $scope) {
    var vm = this;
    vm.passCodeData = {};

    createPassCodeModal();

    function createPassCodeModal() {
      // Create the pass code modal
      $ionicModal.fromTemplateUrl('templates/passCodeSetting.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.passCodeModal = modal;
      });
    }

    vm.openPassCodeModal = function () {
      $scope.passCodeModal.show();
    };

    vm.closePassCodeModal = function () {
      $scope.passCodeModal.hide();
      $scope.passCodeModal.remove();
      createPassCodeModal();
    };

  })


  // Load Card
  .controller('LoadCardCtrl', function ($ionicModal, $scope) {
    var vm = this;
    vm.paymentChoice = 'PayPal';
    vm.loadAmount = [0];

    createBillingInformationModal();

    function createBillingInformationModal() {
      $ionicModal.fromTemplateUrl('templates/billingInformationModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.billingInformationModal = modal;
      });
    }

    vm.openBillingInformationModal = function () {
      $scope.billingInformationModal.show();
    };

    vm.closeBillingInformationModal = function () {
      $scope.billingInformationModal.hide();
      $scope.billingInformationModal.remove();
      createBillingInformationModal();
    };

    vm.approveBillingInformation = function () {
      vm.closeBillingInformationModal();
    };

    vm.onCellClick = function (key) {
      if (vm.loadAmount[0] === 0 && key === -1) {
        return;
      }
      else if (vm.loadAmount.length === 1 && vm.loadAmount[0] !== 0 && key === -1) {
        vm.loadAmount[0] = 0;
      }
      else if (vm.loadAmount[0] === 0 && key !== -2) {
        vm.loadAmount[0] = key;
      }
      else {
        if (key === -1) { // On delete click
          vm.loadAmount.pop();
        }
        else if (key === -2) { // On approve click
          vm.openBillingInformationModal();
        }
        else {
          vm.loadAmount.push(key);
        }
      }
    };
  })


  // Billing Information
  .controller('BillingInformationCtrl', function () {
    var vm = this;
    vm.paymentChoice = 'PayPal';

    vm.approveBillingInformation = function(){

    };
  })


  // Send Card
  .controller('SendCardCtrl', function ($state) {
    var vm= this;
    vm.onSendClick = function(){
      $state.go('app.billingInformation');
    };
  });



