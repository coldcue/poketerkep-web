'use strict';

angular
    .module('angularApp')
    .factory('MockService', MockService);

/**
 * Backend mock endpoints
 */
/*@ngInject*/
function MockService($httpBackend, GameMockDataModel, Utils) {

    return {
        passThrough: passThrough,
        gameMock: gameMock
    };

    /**
     * PassThrough locations
     */
    function passThrough() {
        $httpBackend.whenGET(/views\//).passThrough();
        $httpBackend.whenGET(/game/).passThrough();
    }

    /**
     * Game mock
     */
    /* istanbul ignore next */
    function gameMock() {
        $httpBackend.whenGET(/game/).respond(function(method, url) {
            return [200, GameMockDataModel.getFiltered(Utils.queryStringToJSON(url)), {}];
        });
    }

}
