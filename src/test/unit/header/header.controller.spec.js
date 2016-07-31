'use strict';

describe('Unit: Header - controller', function () {

    // Global variables
    var HeaderController;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function(_$controller_) {
        HeaderController = _$controller_('HeaderController');
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(HeaderController).toBeDefined();
    });

});
