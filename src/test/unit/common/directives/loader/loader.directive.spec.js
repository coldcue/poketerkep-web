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

        $httpBackend.expectGET(/loader/).respond(200);
        $httpBackend.expectGET(/header/).respond(200);
        $httpBackend.expectGET(/map/).respond(200);

        element = compileDirective('<loader></loader>');

        $httpBackend.flush();
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(element).toBeDefined();
    });

    it('should have working displayElement function', function () {
        expect($scope.displayElement).toBeDefined();

        $scope.displayElement(true);

        expect(element.css('display')).toEqual('');

        $scope.displayElement(false);

        expect(element.css('display')).toEqual('none');
    });

    it('should have working showLoading function', function () {
        expect($scope.showLoading).toBeDefined();

        var showLoading1 = $scope.showLoading();
        var showLoading2 = $scope.showLoading();

        expect(showLoading1).toBeDefined();
        expect(showLoading2).not.toBeDefined();
    });

    it('should have working hideLoading function', function () {
        expect($scope.hideLoading).toBeDefined();

        spyOn($scope, 'displayElement');

        $scope.showLoading();
        $scope.hideLoading();

        expect($scope.displayElement).toHaveBeenCalledWith(false);

        $scope.$emit('loader:Show');
    });

    it('should have working event handlers', function () {
        spyOn($scope, 'showLoading');
        spyOn($scope, 'hideLoading');

        $scope.$emit('loader:Show');

        expect($scope.showLoading).toHaveBeenCalled();

        $scope.$emit('loader:Hide');

        expect($scope.hideLoading).toHaveBeenCalled();
    });

});
