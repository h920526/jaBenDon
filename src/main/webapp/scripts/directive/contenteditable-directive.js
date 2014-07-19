'use strict';

angular.module('app').directive('contenteditable', [ '$sce', '$filter', function($sce, $filter) {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attrs, ngModel) {
			if (!ngModel) {
				return;
			}
			// model -> view
			ngModel.$render = function() {
				var modelValue = ngModel.$viewValue;
				if (modelValue == null) {
					modelValue = '';
				} else if (typeof (modelValue) !== 'string') {
					modelValue = String(modelValue);
				}
				if (attrs.trustAsHtml) {
					element.html($filter('toTrustedHtmlFilter')(modelValue, true));
				} else {
					element.text($filter('stripHtmlFilter')(modelValue));
				}
			};

			// view -> model
			function read() {
				var modelValue = element.html();
				if (modelValue === '<br>') {
					modelValue = '';
				}
				if (attrs.trustAsHtml) {
					modelValue = $filter('toTrustedHtmlFilter')(modelValue, true);
				} else {
					modelValue = $filter('stripHtmlFilter')(modelValue);
				}
				ngModel.$setViewValue(modelValue);
				// reset
				element.html(modelValue);
			}
			element.on('blur keyup change', function() {
				scope.$apply(read);
			});

			// initialize (no need for this webapp)
			// read();
		}
	};
} ]);
