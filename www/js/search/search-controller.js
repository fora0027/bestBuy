angular.module('bestBuyAssignment')

.controller('SearchCtrl', function($scope, BestBuyService, $ionicSlideBoxDelegate, $location, $ionicPopup, StorageService) {
    $scope.data= {
        search: ''
    }
    
    $scope.products = [];
    
    $scope.search = function(term){
        if (term){
        BestBuyService.search(term)
            .success(function(data){
            if(data.products[0] == null){
                $ionicPopup.alert({
                    title: 'No Products Found',
                    content: 'Please Try Again'
                })
            $scope.add("Search - No Products Found in Search");
            }else{
                $scope.products = data.products;
                $ionicSlideBoxDelegate.update();
            }
            })
            .error(function(error){
            $ionicPopup.alert({
                    title: 'Best Buy Error',
                    content: 'Use Only A-Z, a-z, and 0-9'
                })
              $scope.add("Search - Best Buy API Error, Use Only A-Z, a-z, and 0-9"); 
            })
        }else{
            $scope.error("Invalid Search Term");
            $ionicPopup.alert({
                    title: 'Invalid Search',
                    content: 'Your Search Term was Invalid'
                })
            $scope.add("Search - Search Term was Invalid");
        }
    }
    
    $scope.logs = StorageService.getAll();
  $scope.add = function (newLog) {
    StorageService.add(newLog);
  };
//  $scope.remove = function (log) {
//    StorageService.remove(log);
//  };
    
});