angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicLoading, $localStorage, $ionicHistory, appConst) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        var vm = this;
        vm.dictionary = appConst.dictionary;
        vm.userSetup = {showPassCode: true};
        $scope.navTitle = '<img class="ion-arrow-swap" />';

        $scope.logout = function () {
            $ionicLoading.show({template: 'Logging out....'});
            $localStorage.set('loggin_state', '');

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


    .controller('SettingsCtrl', function ($ionicModal, $scope) {
        var vm = this;
        vm.passCodeData ={};

        // Create the pass code modal
        $ionicModal.fromTemplateUrl('templates/passCodeSetting.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.passCodeModal = modal;
        });

        vm.openPassCodeModal = function () {
            $scope.passCodeModal.show();
        };

        vm.closePassCodeModal = function () {
            $scope.passCodeModal.hide();
        };
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });

