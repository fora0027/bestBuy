angular.module('bestBuyAssignment')

.controller('StoresCtrl', function($scope, BestBuyService, $auth, $location, $ionicPopup, StorageService, $cordovaGeolocation) {
    $scope.data= {
        search: ''
    }
    
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    
    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      console.log(lat + ' ' + long);
      //$scope.getGeo(lat,long)
      
      
        BestBuyService.getGeo(lat,long)
            .success(function(data){
            
            if(data.stores[0] == null){
                $ionicPopup.alert({
                    title: 'No Stores Found',
                    content: 'Please Try Again'
                })
                $scope.add("Stores - No Stores Found");
            }else{
                $scope.stores = data.stores;
            }
            })
            .error(function(error){
                $ionicPopup.alert({
                    title: 'BestBuy Error',
                    content: 'Please Try Again (Enter Only A-Z)'
                })
               $scope.add("Stores - Best Buy API search error"); 
            })
    
        
      
    }, function(err) {
      $scope.add("Stores - Geolocation Error");
    });
    
    
    
    $scope.stores = [];
    
    $scope.search = function(term){
        if (term){
        BestBuyService.getStores(term)
            .success(function(data){
            
            if(data.stores[0] == null){
                $ionicPopup.alert({
                    title: 'No Stores Found',
                    content: 'Please Try Again'
                })
                $scope.add("Stores - No Stores Found");
            }else{
                $scope.stores = data.stores;
            }
            })
            .error(function(error){
                $ionicPopup.alert({
                    title: 'BestBuy Error',
                    content: 'Please Try Again (Enter Only A-Z)'
                })
               $scope.add("Stores - Best Buy API search error"); 
            })
        }else{
            $scope.add("Stores - Invalid Search Term");
            $ionicPopup.alert({
                    title: 'Invalid Search Term',
                    content: 'Please Ensure You Have Spelled The City Correctly'
                })
        }
    }
    
    $scope.logs = StorageService.getAll();
  $scope.add = function (newLog) {
    StorageService.add(newLog);
  };
    
});
