'use strict';

angular
    .module('angularApp')
    .factory('StorageService', StorageService);

/**
 * Storage service - it handles browser's localStorage
 */
/*@ngInject*/
function StorageService(localStorageService) {

    var rootObject = 'pokeTerkep_v1';

    var storageService = {
        get: get,
        getAll: getAll,
        set: set,
        setObject: setObject
    };

    /**
     * Get specified data by key from localStorage
     * @param key - Data key
     */
    function get(key) {
        var data = storageService.getAll();
        return data[key];
    }

    /**
     * Get all data from localStorage
     */
    function getAll() {
        return localStorageService.get(rootObject) || {};
    }

    /**
     * Set the specified key-value pair in localStorage
     * @param key - Data key
     * @param value - Data value
     */
    function set(key, value) {
        var data = storageService.getAll();
        data[key] = value;
        localStorageService.set(rootObject, data);
        return true;
    }

    /**
     * Set the specified JSON object in localStorage
     * @param object - JSON object
     */
    function setObject(object) {
        var data = storageService.getAll();
        angular.forEach(object, function(value, key) {
            data[key] = value;
        });
        localStorageService.set(rootObject, data);
        return true;
    }

    return storageService;

}
