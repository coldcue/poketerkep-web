'use strict';

describe('Unit: Loader - interceptor', function () {

    // Global variables
    var LoaderInterceptor, $rootScope;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_LoaderInterceptor_, _$rootScope_) {
        LoaderInterceptor = _LoaderInterceptor_;
        $rootScope = _$rootScope_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(LoaderInterceptor).toBeDefined();
    });

    it('should have request method', function () {
        expect(LoaderInterceptor.request).toBeDefined();

        var fakeRequest = {
            url: ['test']
        };
        LoaderInterceptor.addIgnoredEndpoint('test');
        var request = LoaderInterceptor.request(fakeRequest);

        expect(request).toEqual(fakeRequest);

        request = LoaderInterceptor.request();

        expect(request).toBeDefined();
    });

    it('should have response method', function () {
        expect(LoaderInterceptor.response).toBeDefined();

        var fakeResponse = {};
        var response = LoaderInterceptor.response(fakeResponse);

        expect(response).toEqual(fakeResponse);

        response = LoaderInterceptor.response();

        expect(response).toBeDefined();
    });

    it('should have responseError method', function () {
        expect(LoaderInterceptor.responseError).toBeDefined();

        var fakeRequest = {
            url: ['test']
        };
        var fakeResponse = {};

        LoaderInterceptor.request(fakeRequest);

        var responseError = LoaderInterceptor.responseError(fakeResponse);

        expect(responseError).toBeDefined();

        responseError = LoaderInterceptor.responseError(fakeResponse);

        expect(responseError).toBeDefined();
    });

    it('should have addIgnoredEndpoint method', function () {
        expect(LoaderInterceptor.addIgnoredEndpoint).toBeDefined();

        var ignoredEndpoints = LoaderInterceptor.addIgnoredEndpoint('test');

        expect(ignoredEndpoints).toBeDefined();
    });

});
