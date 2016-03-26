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
        isUserPassCodeExist = $localStorage.get(appConst.localStorageKeys.userPassCode),
        secondEnteredPassCode;


    $scope.message = isUserPassCodeExist ? appConst.dictionary.removePassCode : appConst.dictionary.enterPassword;


    $scope.enteredPasscode = '';

    $scope.digit = function (digit) {
        $scope.selected = +digit;

        $scope.enteredPasscode += '' + digit;
        if ($scope.enteredPasscode.length >= 4) {
            if (isUserPassCodeExist) {
                $scope.passcodeWrong = isUserPassCodeExist !== encrypt($scope.enteredPasscode);
                if ($scope.passcodeWrong) {
                    $scope.enteredPasscode = '';
                }
                else {
                    $localStorage.remove(userPassCode);
                    $scope.onSetNewPassCodeDone();
                }
            }
            else if (isSecondTime) {

                $scope.passcodeWrong = secondEnteredPassCode !== $scope.enteredPasscode;
                if ($scope.passcodeWrong) {
                    isSecondTime = false;
                    $scope.enteredPasscode = '';
                    secondEnteredPassCode = undefined;
                    $scope.message = appConst.dictionary.enterPassword;
                }
                else {
                    $localStorage.set(userPassCode, encrypt($scope.enteredPasscode));
                    $scope.onSetNewPassCodeDone();
                }

            }
            else {
                $timeout(function () {
                    isSecondTime = true;
                    secondEnteredPassCode = $scope.enteredPasscode;
                    $scope.enteredPasscode = '';
                    $scope.message = appConst.dictionary.reEnterPassword;
                }, 200);
            }

        }
    };

    function encrypt(val) {
        return md5(val);
    }
}
