'use strict';

angular.module('app').directive('contenteditable', [ '$sce', '$filter', function($sce, $filter) {
	var userAgentStr = navigator.userAgent.toLowerCase();
	var isIE = /msie/.test(userAgentStr);

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
				var oldModelValue = element.html();
				var newModelValue = oldModelValue;
				if (newModelValue === '<br>') {
					newModelValue = '';
				}
				if (attrs.trustAsHtml) {
					newModelValue = $filter('toTrustedHtmlFilter')(newModelValue, true);
				} else {
					newModelValue = $filter('stripHtmlFilter')(newModelValue);
				}
				ngModel.$setViewValue(newModelValue);
				// reset if html striped
				if (oldModelValue !== newModelValue) {
					element.html(newModelValue);
				}
			}
			element.on('blur keyup change', function(event) {
				// bind keyup at contenteditable column for IE only..
				if (event.type !== 'keyup' || isIE) {
					scope.$apply(read);
				}
			}).each(function() {
				// change event sequence to first one!
				var events = $._data(this, "events");
				events.blur.unshift(events.blur.pop());
				events.keyup.unshift(events.keyup.pop());
				events.change.unshift(events.change.pop());
			});

			// initialize (no need for this webapp)
			// read();
		}
	};
} ]);
