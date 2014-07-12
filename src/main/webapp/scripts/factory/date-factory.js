'use strict';

angular.module('app').factory('DateFactory', function() {
	var timeZoneOffset = -60000 * new Date().getTimezoneOffset();

	return {
		'toUTCTime': function(localizeTime) {
			return (localizeTime - timeZoneOffset);
		},
		'nowUTCDate': function() {
			var now = new Date();
			return new Date(now.getTime() - timeZoneOffset);
		},
		'clearToDate': function(date) {
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			return date;
		},
		'clearToMinutes': function(date) {
			date.setSeconds(0);
			date.setMilliseconds(0);
			return date;
		},
		'toLocalizeDate': function(utcTime) {
			return new Date(utcTime + timeZoneOffset);
		}
	};
});
