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

    return {
        request: function (request) {
            requestCount++;

            // Show loader
            $rootScope.$broadcast('loader:Show');

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
            if (!(--requestCount)) {
                // Hide loader
                $rootScope.$broadcast('loader:Hide');
            }

            return $q.reject(response);
        }
    };

}
