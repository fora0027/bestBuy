angular.module('bestBuyAssignment')

.factory('StorageService', function ($localStorage) {
    $localStorage = $localStorage.$default({
        logs: [],
        logged:[]
    });
    
    var key = 0;

    var _getAll = function () {
        return $localStorage.logs;
    };
    var _getLogged = function () {
        return $localStorage.logged;
    };
    var _add = function (log) {
        $localStorage.logs.push([key, log]);
        key++;
    }
    
    var _addUserPass = function (log) {
        $localStorage.logged.push(log);
    }
    
    var _remove = function (log) {
        $localStorage.logs.splice($localStorage.logs.indexOf(log), 1);
    }
    return {
        getAll: _getAll,
        add: _add,
        remove: _remove,
        addUserPass: _addUserPass,
        getLogged: _getLogged
    };
})