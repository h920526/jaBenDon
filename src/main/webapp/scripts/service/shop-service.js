'use strict';

angular.module('app').service('ShopService', [ 'RestFactory', function(RestFactory) {
	this.createShop = function(shop, callBackFuncs) {
		if (shop == null) {
			return null;
		}
		return RestFactory.post('rest/shop', shop, callBackFuncs);
	};
	this.findShop = function(shopKey, callBackFuncs) {
		if (shopKey == null) {
			return null;
		}
		return RestFactory.get('rest/shop/' + shopKey, callBackFuncs);
	};
	this.findShops = function(callBackFuncs) {
		return RestFactory.get('rest/shop', callBackFuncs);
	};
	this.updateShop = function(shop, callBackFuncs) {
		if (shop == null) {
			return null;
		}
		return RestFactory.put('rest/shop', shop, callBackFuncs);
	};
	this.deleteShop = function(shopKey, callBackFuncs) {
		if (shopKey == null) {
			return null;
		}
		return RestFactory.del('rest/shop/' + shopKey, callBackFuncs);
	};

	/*
	 * custom service
	 */
} ]);
