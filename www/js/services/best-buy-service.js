angular.module('bestBuyAssignment')

.factory('BestBuyService', function($http, $cordovaGeolocation) {
        var bestBuyAPIEndPoint = 'http://api.bestbuy.com/v1'
        var key = '5afx4bz58e9thpkqquetdzyd'
    
    return{
        search : function(term){
        return $http.get(bestBuyAPIEndPoint + '/products((search=' + term + '))?show=name,sku,salePrice,addToCartUrl,url,image,manufacturer,onlineAvailabilityText&format=json&apiKey=' + key);
        
  },
        getStores : function(term){
            return $http.get(bestBuyAPIEndPoint + '/stores(city=' + term + ')?format=json&apiKey=' + key);
        },
        getGeo : function(lat,long){
          return   $http.get(bestBuyAPIEndPoint + '/stores(area(' + lat + ',' + long + ',1000))?format=json&apiKey=' + key)
        }
  };
});


