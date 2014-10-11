'use strict';

angular.module('app').factory('RestFactory', [ '$http', 'ObjectFactory', function($http, ObjectFactory) {

	function applyActionWrapper($http, callBackFuncs) {
		if (callBackFuncs == null) {
			return;
		}
		$http.success(callBackFuncs.success).error(callBackFuncs.error)['finally'](callBackFuncs.complete);
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
	});
} ]);
