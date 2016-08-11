'use strict';

angular
    .module('angularApp')
    .factory('LoaderInterceptor', LoaderInterceptor);

/**
 * Interceptor for loader spinner
 */
/*@ngInject*/
function LoaderInterceptor($rootScope, $q) {

    var requestCount = 0;
    var ignoredEndpoints = [];

    return {
        request: function (request) {
            requestCount++;

            // Check if the url is ignored
            var isIgnored = false;
            angular.forEach(ignoredEndpoints, function (ignoredUrl) {
                if (request && request.url.indexOf(ignoredUrl) !== -1) {
                    isIgnored = true;
                }
            });

            if (!isIgnored) {
                $rootScope.$broadcast('loader:Show');
            }

            return request || $q.when(request);
        },
        response: function (response) {
            if ((--requestCount) === 0) {
                // Hide loader
                $rootScope.$broadcast('loader:Hide');
            }

            return response || $q.when(response);
        },
        responseError: function (response) {
            if ((--requestCount) === 0) {
                // Hide loader
                $rootScope.$broadcast('loader:Hide');
            }

            return $q.reject(response);
        },
        addIgnoredEndpoint: function (endpointUrl) {
            ignoredEndpoints.push(endpointUrl);
            return ignoredEndpoints;
        }
    };

}
