'use strict';

describe('Unit: Loader - directive', function () {

    // Global variables
    var $rootScope, $scope, $compile, $httpBackend, element;

    // Compile directive function
    function compileDirective(template) {
        var element = angular.element(template);
        var compiledElement = $compile(element)($scope);
        $scope.$digest();
        return compiledElement;
    }

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_, _$httpBackend_) {
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;

        $scope.$broadcast('loader:Show');

        $httpBackend.expectGET(/views\/loader/).respond(200);

        element = compileDirective('<loader></loader>');
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(element).toBeDefined();
    });

});
