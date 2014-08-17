'use strict';

angular.module('app').service('SyncService', [ 'RestFactory', function(RestFactory) {
	/*
	 * custom service
	 */
	this.syncAll = function(utcTime, callBackFuncs, ignoreLoadingBar) {
		return RestFactory.get('rest/sync/' + utcTime, callBackFuncs, ignoreLoadingBar);
	};
} ]);
