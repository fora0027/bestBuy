angular.module('bestBuyAssignment')

.controller('LogsCtrl', function ($scope, $location, StorageService) {
    $scope.logs = StorageService.getAll();
    $scope.add = function (newLog) {
        StorageService.add(newLog);
        console.log($scope.newLog);
    };
//    $scope.addUserPass = function (newLog) {
//        StorageService.addUserPass(newLog);
//        console.log($scope.newLog);
//    };

    $scope.remove = function (log) {
        StorageService.remove(log);
    };
})