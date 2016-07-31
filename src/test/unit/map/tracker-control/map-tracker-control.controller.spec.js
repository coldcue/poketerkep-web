'use strict';

describe('Unit: MapTrackerControl - controller', function () {

    // Global variables
    var MapTrackerControlController, MapDTO, $scope;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function(_$controller_, _MapDTO_, _$rootScope_) {
        MapDTO = _MapDTO_;
        $scope = _$rootScope_.$new();

        MapTrackerControlController = _$controller_('MapTrackerControlController', {
            $scope: $scope
        });
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(MapTrackerControlController).toBeDefined();
    });

    it('should have working enablePositionTracking function', function () {
        expect($scope.enablePositionTracking).toBeDefined();

        spyOn(MapDTO, 'enablePositionTracking');

        $scope.enablePositionTracking();

        expect(MapDTO.enablePositionTracking).toHaveBeenCalled();
    });

});
