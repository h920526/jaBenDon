'use strict';

angular.module('app').directive('clockPickerDirective', function() {
	/**
	 * timepicker
	 */
	function initClockPicker(scope, element, $scope) {
		element.clockpicker({
			'placement': 'right', // popover placement
			'align': 'bottom', // arrow of popover's align
			'autoclose': true,
			'default': 'now'
		});
	}

	/**
	 * directive
	 */
	function registerScopeFunctions(scope, element) {
		var $scope = scope.$parent;
		$scope.initClockPicker = function() {
			initClockPicker(scope, element, $scope);
		};
	}

	return {
		restrict: 'A',
		scope: {
			clockPickerDirective: '&'
		},
		link: function(scope, element, attrs) {
			registerScopeFunctions(scope, element);
			scope.clockPickerDirective();
		}
	};
});