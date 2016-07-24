'use strict';

describe('Unit: Loader - interceptor', function () {

    var loaderInterceptor;

    beforeEach(angular.mock.module('angularApp'));

    beforeEach(angular.mock.inject(function(LoaderInterceptor) {
        loaderInterceptor = LoaderInterceptor;
    }));

    it('should have LoaderInterceptor be defined', function () {
        expect(loaderInterceptor).toBeDefined();
    });

});
