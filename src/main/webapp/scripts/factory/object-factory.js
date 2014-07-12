'use strict';

angular.module('app').factory('ObjectFactory', function() {
	return {
		'clearObject': function(object) {
			if (object == null) {
				return object;
			}
			for ( var prop in object) {
				if (object.hasOwnProperty(prop)) {
					delete object[prop];
				}
			}
			return object;
		},
		'extend': function() {
			return angular.extend.apply(null, Array.prototype.slice.call(arguments));
		},
		'equals': function(object, compareTo, sortingMatch) {
			if (sortingMatch) {
				return (JSON.stringify(object) === JSON.stringify(compareTo));
			}
			return angular.equals(object, compareTo);
		},
		'copy': function(object) {
			return angular.copy(object);
		},
		// reset inner items for referenced array
		'resetArray': function(array, replaceWithArray) {
			if (array === replaceWithArray) {
				return array;
			}
			array.length = replaceWithArray.length;
			return this.extend(array, replaceWithArray);
		},
		// reset inner props for referenced object
		'replaceObject': function(object, replaceWith) {
			if (object === replaceWith) {
				return object;
			} else if (object != null && replaceWith == null) {
				this.clearObject(object);
			} else if (object == null && replaceWith != null) {
				return replaceWith;
			}
			this.extend(object, replaceWith);
			for ( var prop in object) {
				if (object.hasOwnProperty(prop) && !replaceWith.hasOwnProperty(prop)) {
					delete object[prop];
				}
			}
			return object;
		}
	};
});
