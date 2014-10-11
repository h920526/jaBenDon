'use strict';

angular.module('app', [ 'ngRoute', 'ngCookies', 'ngSanitize', 'angular-loading-bar', 'ngAnimate', 'pascalprecht.translate' ]).config(
	[ '$routeProvider', 'cfpLoadingBarProvider', '$translateProvider', function($routeProvider, cfpLoadingBarProvider, $translateProvider) {
		/*
		 * route
		 */
		$routeProvider.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'homeController'
		}).otherwise({
			redirectTo: '/home'
		});
		/*
		 * loading bar
		 */
		cfpLoadingBarProvider.latencyThreshold = 0;
		/*
		 * translate
		 */
		$translateProvider.useStaticFilesLoader({
			prefix: 'i18n/',
			suffix: '.json'
		}).preferredLanguage('en_US');
	} ]);