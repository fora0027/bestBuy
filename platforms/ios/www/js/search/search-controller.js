angular.module('bestBuyAssignment')

.controller('SearchCtrl', function($scope, BestBuyService, $ionicSlideBoxDelegate) {
    $scope.data= {
        search: ''
    }
    
    $scope.products = [];
    
    $scope.search = function(term){
        if (term){
        BestBuyService.search(term)
            .success(function(data){
                $scope.products = data.products;
                $ionicSlideBoxDelegate.update();
                console.log($scope.products);    
            //$log.info(data);
            })
            .error(function(error){
               //$log.error("Best Buy API search error"); 
            })
        }else{
            //$log.error("Invalid Search Term");
        }
    }
});
