angular.module('bestBuyAssignment')

.controller('StoresCtrl', function($scope, BestBuyService) {
    $scope.data= {
        search: ''
    }
    
    $scope.stores = [];
    
    $scope.search = function(term){
        if (term){
        BestBuyService.getStores(term)
            .success(function(data){
                $scope.stores = data.stores;
                //$log.info(data);
                console.log($scope.stores);
            })
            .error(function(error){
               //$log.error("Best Buy API search error"); 
            })
        }else{
            //$log.error("Invalid Search Term");
        }
    }
});
