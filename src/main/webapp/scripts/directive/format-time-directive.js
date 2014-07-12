'use strict';

angular.module('app').directive('formatTimeDirective', [ 'DateFactory', function(DateFactory) {
	/**
	 * formatter
	 */
	function initUtcTimeFormatter(ngModel) {
		// input -> model
		ngModel.$parsers.push(function(text) {
			var matchResult = text.match(/^(\d{1,2}):(\d{1,2})$/i);
			if (matchResult == null || matchResult.length != 3) {
				return null;
			}
			var deadlineDate = new Date();
			deadlineDate.setHours(matchResult[1]);
			deadlineDate.setMinutes(matchResult[2]);
			DateFactory.clearToMinutes(deadlineDate)
			return DateFactory.toUTCTime(deadlineDate.getTime());
		});
		// model -> input
		ngModel.$formatters.push(function(text) {
			if (text == null || text === '' || isNaN(text) || typeof (text) !== 'number') {
				return "";
			}
			var localizeDate = DateFactory.toLocalizeDate(text);
			return (localizeDate.getHours() < 10 ? '0' : '') + localizeDate.getHours() + ':' + (localizeDate.getMinutes() < 10 ? '0' : '') + localizeDate.getMinutes();
		});
	}

	/**
	 * directive
	 */
	function registerScopeFunctions(scope, ngModel) {
		var $scope = scope.$parent;
		$scope.initUtcTimeFormatter = function() {
			initUtcTimeFormatter(ngModel);
		};
	}

	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			formatTimeDirective: '&'
		},
		link: function(scope, element, attr, ngModel) {
			registerScopeFunctions(scope, ngModel);
			scope.formatTimeDirective();
		}
	};
} ]);
