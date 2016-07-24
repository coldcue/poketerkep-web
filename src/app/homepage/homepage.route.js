'use strict';

angular
    .module('angularApp')
    .config(HomepageRouteConfig);

/**
 * Homepage route config
 */
/*@ngInject*/
function HomepageRouteConfig($stateProvider) {

    var name = 'homepage';

    $stateProvider
        .state(name, {
            parent: 'main',
            url: '/' + name,
            views: {
                'content@': {
                    templateUrl: 'views/' + name + '.tpl.html',
                    controller: 'HomepageController',
                    controllerAs: 'vm'
                }
            }
        });

}
