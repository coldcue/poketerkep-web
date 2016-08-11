'use strict';

angular
    .module('angularApp')
    .factory('MockService', MockService);

/**
 * Backend mock endpoints
 */
/*@ngInject*/
function MockService($httpBackend, GameMockDataModel) {

    return {
        passThrough: passThrough,
        gameMock: gameMock
    };

    /**
     * PassThrough locations
     */
    function passThrough() {
        $httpBackend.whenGET(/views\//).passThrough();
        $httpBackend.whenPOST(/game/).passThrough();
    }

    /**
     * Game mock
     */
    /* istanbul ignore next */
    function gameMock() {
        $httpBackend.whenPOST(/game/).respond(function(method, url, data) {
            return [200, GameMockDataModel.getFiltered(data), {}];
        });
    }

}
