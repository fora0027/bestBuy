angular.module('bestBuyAssignment')

.factory('BestBuyService', function($http) {
        var bestBuyAPIEndPoint = 'http://api.bestbuy.com/v1'
        var key = '5afx4bz58e9thpkqquetdzyd'
    
    return{
        search : function(term){
        return $http.get(bestBuyAPIEndPoint + '/products((search=' + term + '))?show=name,sku,salePrice,image&format=json&apiKey=' + key);
        
  },
        getStores : function(term){
            return $http.get(bestBuyAPIEndPoint + '/stores(city=' + term + ')?format=json&apiKey=' + key);
        }
  };
});


