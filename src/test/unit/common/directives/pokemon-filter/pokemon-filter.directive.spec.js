'use strict';

describe('Unit: PokemonFilter - directive', function () {

    // Global variables
    var $scope, $compile, $httpBackend, element;

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
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;

        $scope.model = {};
        $scope.onChange = jasmine.createSpy('onChange');

        $httpBackend.expectGET(/views\/pokemon\-filter/).respond(200);

        element = compileDirective('<pokemon-filter ng-model="model" ng-change="onChange()"></pokemon-filter>');
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(element).toBeDefined();
    });

});
