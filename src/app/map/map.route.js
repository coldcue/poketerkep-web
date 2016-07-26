'use strict';

angular
    .module('angularApp')
    .config(MapRouteConfig);

/**
 * Map route config
 */
/*@ngInject*/
function MapRouteConfig($stateProvider) {

    var name = 'map';

    $stateProvider
        .state(name, {
            parent: 'main',
            url: '/' + name,
            views: {
                'content@': {
                    templateUrl: 'views/' + name + '.tpl.html',
                    controller: 'MapController',
                    controllerAs: 'vm'
                }
            }
        });

}
