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
       $state.go('app.registration');
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
        $scope.login();
        //$state.go('login');
      }, 30);

    };

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
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
    vm.loadAmount = [0];

    createBillingInformationModal();

    function createBillingInformationModal() {
      $ionicModal.fromTemplateUrl('templates/billingInformation.html', {
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


  .controller('SendCardCtrl', function () {
   
  });



