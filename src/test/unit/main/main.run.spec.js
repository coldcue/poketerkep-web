'use strict';

describe('Unit: Main - run', function () {

    var rootScope, httpBackend;

    beforeEach(angular.mock.module('angularApp'));

    beforeEach(inject(function($rootScope, $httpBackend) {
        rootScope = $rootScope;
        httpBackend = $httpBackend;
    }));

    it('should have stateChangeStart working event handler', function () {
        httpBackend.expectGET(/views\/header/).respond(200);
        httpBackend.expectGET(/views\/map/).respond(200);

        rootScope.$emit('$stateChangeStart', {
            event: null,
            toState: 'test',
            toStateParams: 'test'
        });
        rootScope.$digest();

        httpBackend.flush();
        expect(rootScope.toState).toBeDefined();
        expect(rootScope.toStateParams).toBeDefined();
    });

    it('should have back function be defined', function () {
        expect(rootScope.back).toBeDefined();
    });
});
