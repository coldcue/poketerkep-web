'use strict';

angular
    .module('angularApp')
    .controller('MapTrackerControlController', MapTrackerControlController);

/**
 * Controller for map tracker control
 */
/*@ngInject*/
function MapTrackerControlController($scope, MapDTO) {

    // Model bindings
    $scope.isTrackingEnabled = MapDTO.isTrackingEnabled;
    $scope.enablePositionTracking = enablePositionTracking;

    /**
     * Enable position tracking
     */
    function enablePositionTracking() {
        MapDTO.enablePositionTracking();
    }

}
