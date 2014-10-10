'use strict';

angular.module('app').factory('RestFactory', [ '$http', 'ObjectFactory', function($http, ObjectFactory) {

	function applyActionWrapper($http, callBackFuncs) {
		if (callBackFuncs == null) {
			return;
		}
		$http.success(callBackFuncs.success).error(callBackFuncs.error);
	}

	var RestFactory = null;
	return (RestFactory = {
		'get': function(url, callBackFuncs, ignoreLoadingBar) {
			applyActionWrapper($http.get(url, {
				'ignoreLoadingBar': ignoreLoadingBar
			}), callBackFuncs);
			return this;
		},
		'post': function(url, data, callBackFuncs) {
			applyActionWrapper($http.post(url, data), callBackFuncs);
			return this;
		},
		'put': function(url, data, callBackFuncs) {
			applyActionWrapper($http.put(url, data), callBackFuncs);
			return this;
		},
		'del': function(url, callBackFuncs) {
			applyActionWrapper($http['delete'](url), callBackFuncs);
			return this;
		},
		/**
		 * wrap func
		 */
		'functionWrapper': function(func) {
			var funcArgs = Array.prototype.slice.call(arguments, 1);
			return function() {
				return func.apply(null, Array.prototype.slice.call(arguments).concat(funcArgs));
			};
		},
		/**
		 * wrap all ajax request and trigger it after all done
		 */
		'ajaxRequestBundleWrapper': function() {
			var ajaxRequestArray = [];
			var successRequestCount = 0;
			var errorRequestCount = 0;
			// callback
			var eachSuccessCallback = null;
			var successCallback = null;
			var eachErrorCallback = null;
			var errorCallback = null;
			var completeCallback = null;

			function isFirstError() {
				return errorRequestCount === 1;
			}
			function isAllSuccessed() {
				return successRequestCount >= ajaxRequestArray.length;
			}
			function isAllCompleted() {
				return successRequestCount + errorRequestCount >= ajaxRequestArray.length;
			}
			var wrapperFuncs = {
				success: function() {
					successRequestCount++;
					if (eachSuccessCallback != null) {
						eachSuccessCallback();
					}
					if (successCallback != null && isAllSuccessed()) {
						successCallback();
					}
					if (completeCallback != null && isAllCompleted()) {
						completeCallback();
					}
				},
				error: function() {
					errorRequestCount++;
					if (eachErrorCallback != null) {
						eachErrorCallback();
					}
					if (errorCallback != null && isFirstError()) {
						errorCallback();
					}
					if (completeCallback != null && isAllCompleted()) {
						completeCallback();
					}
				}
			};
			return {
				'push': function(ajaxRequestFunc) {
					var dataArgs = Array.prototype.slice.call(arguments, 1);
					ajaxRequestArray.push({
						func: ajaxRequestFunc,
						dataArgs: dataArgs
					});
					return this;
				},
				'start': function(callBackFuncs) {
					if (callBackFuncs != null) {
						eachSuccessCallback = callBackFuncs.eachSuccess;
						successCallback = callBackFuncs.success;
						eachErrorCallback = callBackFuncs.eachError;
						errorCallback = callBackFuncs.error;
						completeCallback = callBackFuncs.complete;
					}
					for (var i = 0; i < ajaxRequestArray.length; i++) {
						var ajaxRequest = ajaxRequestArray[i];
						ajaxRequest.func.apply(null, ajaxRequest.dataArgs.concat([ wrapperFuncs ]));
					}
					return this;
				},
				'hasRequest': function() {
					return ajaxRequestArray.length > 0;
				}
			}
		}
	});
} ]);
