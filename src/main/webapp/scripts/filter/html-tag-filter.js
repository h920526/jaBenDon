'use strict';

angular.module('app').filter('toTrustedHtmlFilter', [ '$sce', function($sce) {
	var escapeEntities = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': '&quot;',
		"'": '&#39;',
		"/": '&#x2F;'
	};
	var unsafeTags = [ 'html', 'head', 'meta', 'title', 'link', 'script', 'body', 'frame', 'frameset' ];

	function escapeHtml(string) {
		return string.replace(new RegExp('[' + Object.keys(escapeEntities).join('') + ']', 'gi'), function(entity) {
			return escapeEntities[entity];
		});
	}

	return function(text, ignoreWrapper) {
		if (text == null) {
			return text;
		}
		text = text.replace(new RegExp('(<(' + unsafeTags.join('|') + '))', 'gi'), function(entity) {
			return escapeHtml(entity);
		});
		return (ignoreWrapper ? text : $sce.trustAsHtml(text));
	};
} ]).filter('stripHtmlFilter', function() {
	return function(text) {
		var tmpDiv = document.createElement("div");
		tmpDiv.innerHTML = text;
		return tmpDiv.textContent || tmpDiv.innerText || "";
	};
});