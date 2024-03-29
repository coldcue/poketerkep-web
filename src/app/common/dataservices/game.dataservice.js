'use strict';

angular
    .module('angularApp')
    .factory('GameDataService', GameDataService);

/**
 * This is the resource for game handling
 */
/*@ngInject*/
function GameDataService($resource, ENV) {

    return $resource(ENV.apiEndpoint + 'game', {}, {
        get: { method: 'GET', cancellable : true }
    });

}
