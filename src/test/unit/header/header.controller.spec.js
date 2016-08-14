'use strict';

describe('Unit: Header - controller', function () {

    // Global variables
    var HeaderController, Analytics;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function(_$controller_, _Analytics_) {
        HeaderController = _$controller_('HeaderController');
        Analytics = _Analytics_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(HeaderController).toBeDefined();
    });

    it('should have menuClick method which triggers Analytics', function () {
        expect(HeaderController.menuClick).toBeDefined();

        spyOn(Analytics, 'trackEvent');

        HeaderController.menuClick();

        expect(Analytics.trackEvent).toHaveBeenCalled();
    });

    it('should have betaClick method which triggers Analytics', function () {
        expect(HeaderController.betaClick).toBeDefined();

        spyOn(Analytics, 'trackEvent');

        HeaderController.betaClick();

        expect(Analytics.trackEvent).toHaveBeenCalled();
    });

});
