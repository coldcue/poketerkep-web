'use strict';

angular
    .module('angularApp')
    .config(MainRouteConfig);

/**
 * Main route (abstract route)
 */
/*@ngInject*/
function MainRouteConfig($stateProvider) {

    $stateProvider
        .state('main', {
            abstract: true,
            views: {
                'header': {
                    templateUrl: 'views/header.tpl.html',
                    controller: 'HeaderController',
                    controllerAs: 'vm'
                },
                'footer': {
                    templateUrl: 'views/footer.tpl.html',
                    controller: 'FooterController',
                    controllerAs: 'vm'
                }
            }
        });

}
