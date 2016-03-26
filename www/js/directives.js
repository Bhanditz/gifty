angular
    .module('starter')
    .directive('passCode', passCode);

function passCode() {
    var directive = {
        restrict: 'E',
        templateUrl: 'templates/passCodeTemplate.html',
        scope: {
            onSetNewPassCodeDone: '&'
        },
        controller: PassCodeCtrl
    };

    return directive;
}

PassCodeCtrl.$inject = ['$scope', 'appConst', '$localStorage', '$timeout'];

function PassCodeCtrl($scope, appConst, $localStorage, $timeout) {

    var userPassCode = appConst.localStorageKeys.userPassCode,
        isSecondTime = false,
        secondEnteredPasscode;
    $scope.message = appConst.dictionary.enterPassword;


    $scope.enteredPasscode = '';

    $scope.digit = function (digit) {
        $scope.selected = +digit;

        $scope.enteredPasscode += '' + digit;
        if ($scope.enteredPasscode.length >= 4) {
            if (isSecondTime) {

                $scope.passcodeWrong = secondEnteredPasscode !== $scope.enteredPasscode;
                if ($scope.passcodeWrong) {
                    isSecondTime = false;
                    $scope.enteredPasscode = '';
                    secondEnteredPasscode = undefined;
                    $scope.message = appConst.dictionary.enterPassword;
                }
                else {
                    $localStorage.set(userPassCode, md5($scope.enteredPasscode));
                    $scope.onSetNewPassCodeDone();
                }

            }
            else {
                $timeout(function () {
                    isSecondTime = true;
                    secondEnteredPasscode = $scope.enteredPasscode;
                    $scope.enteredPasscode = '';
                    $scope.message = appConst.dictionary.reEnterPassword;
                }, 200);
            }

        }
    };
}
