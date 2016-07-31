'use strict';

describe('Unit: Main - run', function () {

    // Global variables
    var $rootScope, $httpBackend, $state;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function(_$rootScope_, _$httpBackend_, _$state_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $state = _$state_;
    }));

    /**
     * TEST CASES:
     */

    it('should have stateChangeStart working event handler', function () {
        $httpBackend.expectGET(/views\/header/).respond(200);
        $httpBackend.expectGET(/views\/map/).respond(200);

        $rootScope.$emit('$stateChangeStart', {
            event: null,
            toState: 'test',
            toStateParams: 'test'
        });
        $rootScope.$digest();

        $httpBackend.flush();
        expect($rootScope.toState).toBeDefined();
        expect($rootScope.toStateParams).toBeDefined();
    });

    it('should have back function be defined', function () {
        expect($rootScope.back).toBeDefined();

        spyOn($state, 'go');

        $rootScope.previousStateName = null;
        $rootScope.back();

        expect($state.go).toHaveBeenCalledWith('map');

        $rootScope.previousStateName = 'map';
        $rootScope.back();

        expect($state.go).toHaveBeenCalledWith('map');
    });

});
