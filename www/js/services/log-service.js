angular.module('bestBuyAssignment')

.factory('LogService', function() {
  return{
      error : function(error){
          return error;
      },
      returnedInfo : function (info){
          return info;
      }
  };
});