angular.module('app').directive('contenteditable', [ '$sce', '$filter', function($sce, $filter) {
	return {
		restrict: 'A', // only activate on element attribute
		require: '?ngModel', // get a hold of NgModelController
		link: function(scope, element, attrs, ngModel) {
			if (!ngModel)
				return; // do nothing if no ng-model

			// Specify how UI should be updated
			ngModel.$render = function() {
				// viewValue could be a number
				var modelValue = ngModel.$viewValue;
				if (modelValue == null) {
					modelValue = '';
				} else if (typeof (modelValue) !== 'string') {
					modelValue = String(modelValue);
				}
				if (attrs.trustAsHtml) {
					element.html($filter('toTrustedHtmlFilter')(modelValue, true));
				} else {
					element.html($sce.getTrustedHtml(modelValue));
				}
			};

			// Listen for change events to enable binding
			element.on('blur keyup change', function() {
				scope.$apply(read);
			});

			// read(); // initialize (no need for this webapp)

			// Write data to the model
			function read() {
				var html = element.html();
				// When we clear the content editable the browser leaves a <br>
				// behind
				// If strip-br attribute is provided then we strip this out
				if (attrs.stripBr && html == '<br>') {
					html = '';
				}
				ngModel.$setViewValue(html);
			}
		}
	};
} ]);
