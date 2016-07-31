'use strict';

describe('Unit: Storage - service', function () {

    // Global variables
    var StorageService, localStorageService, fakeStorage = {};

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_StorageService_, _localStorageService_) {
        StorageService = _StorageService_;
        localStorageService = _localStorageService_;

        spyOn(localStorageService, 'get').and.callFake(function(key) {
            return fakeStorage[key];
        });
        spyOn(localStorageService, 'set').and.callFake(function(key, value) {
            fakeStorage[key] = value;
        });
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(StorageService).toBeDefined();
    });

    it('should have working getter/setter methods', function () {
        expect(StorageService.set('test', 'value')).toBe(true);
        expect(localStorageService.set).toHaveBeenCalled();
        expect(StorageService.get('test')).toEqual('value');
        expect(localStorageService.get).toHaveBeenCalled();
    });

    it('should have working getAll/setObject methods', function () {
        var fakeObject = {
            test: 'value',
            test2: 'value'
        };

        StorageService.setObject(fakeObject);

        expect(StorageService.getAll()).toEqual(fakeObject);
    });

});
