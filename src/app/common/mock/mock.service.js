'use strict';

angular
    .module('angularApp')
    .factory('MockService', MockService);

/**
 * Backend mock endpoints
 */
/*@ngInject*/
function MockService($httpBackend, GameMockDataModel) {

    /**
     * Constructor, initialize
     */
    function init() {
        //gameMock();
        passThrough();
    }

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
    function gameMock() {
        $httpBackend.whenGET(/game/).respond(function() {
            return [200, GameMockDataModel.findAll(), {}];
        });
    }

    return {
        init: init,
        passThrough: passThrough
    };

}
