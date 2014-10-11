'use strict';

angular.module('app').factory('ShopFactory', [ '$injector', '$translate', 'ObjectFactory', 'RestFactory', 'ShopService', function($injector, $translate, ObjectFactory, RestFactory, ShopService) {
	var shops = [];

	function findShop(shops, shopKey) {
		if (shops != null && shopKey != null) {
			for (var i = shops.length - 1; i >= 0; i--) {
				var shop = shops[i];
				if (shop.shopKey === shopKey) {
					return shop;
				}
			}
		}
		return null;
	}

	var ShopFactory = null;
	return (ShopFactory = {
		'getShops': function() {
			return shops;
		},
		'generateShop': function() {
			return {
				shopTitle: $translate.instant('generate_shop_default_title'),
				shopContent: $translate.instant('generate_shop_default_content'),
				shopPhone: $translate.instant('generate_shop_default_phone'),
				shopNote: $translate.instant('generate_shop_default_note')
			};
		},
		'addShop': function(newShop) {
			shops.push(newShop);
			return this;
		},
		'resetShops': function(replaceWithArray) {
			if (replaceWithArray == null) {
				orderDetails.length = 0;
				return this;
			}
			ObjectFactory.resetArray(shops, replaceWithArray);
			return this;
		},
		'getShopIndex': function(shopKey) {
			if (shopKey != null) {
				for (var i = shops.length - 1; i >= 0; i--) {
					if (shops[i].shopKey === shopKey) {
						return i;
					}
				}
			}
			return -1;
		},
		'removeShop': function(shopKey) {
			if (shopKey == null) {
				return this;
			}
			var shopIndex = this.getShopIndex(shopKey);
			if (shopIndex >= 0) {
				shops.splice(shopIndex, 1);
			}
			return this;
		},
		'sortShops': function() {
			shops.sort(function(shop1, shop2) {
				if ((shop1 == null && shop2 == null) || (shop1 === shop2)) {
					return 0;
				} else if (shop1 == null && shop2 != null) {
					return 1;
				} else if (shop1 != null && shop2 == null) {
					return -1;
				} else if (shop1.shopKey < shop2.shopKey) {
					return -1;
				} else if (shop1.shopKey > shop2.shopKey) {
					return 1;
				}
				return 0;
			});
			return this;
		},
		'updateExistedShops': function(replaceWithArray) {
			if (replaceWithArray == null || replaceWithArray.length <= 0) {
				return this;
			}
			for (var i = replaceWithArray.length - 1; i >= 0; i--) {
				var replaceWith = replaceWithArray[i];
				var shop = findShop(shops, replaceWith.shopKey);
				if (shop == null && !replaceWith.archived) {
					// append it
					shops.push(replaceWith);
				} else if (shop != null && replaceWith.archived) {
					// remove it
					var shopIndex = this.getShopIndex(shop.shopKey);
					shops.splice(shopIndex, 1);
				} else if (shop != null && !replaceWith.archived) {
					// replace existed item
					ObjectFactory.replaceObject(shop, replaceWith);
				}
			}
			this.sortShops();
			return this;
		},
		'preloadAllShops': function(callBackFuncs) {
			ShopService.findShopKeys({
				'success': function(response) {
					for (var i = response.length - 1; i >= 0; i--) {
						response[i] = {
							'shopKey': response[i],
							'shopTitle': $translate.instant('loading'),
							'shopNote': $translate.instant('loading'),
							'shopPhone': $translate.instant('loading'),
							'shopContent': $translate.instant('loading')
						};
					}
					ShopFactory.resetShops(response);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null),
				'complete': (callBackFuncs != null ? callBackFuncs.complete : null)
			});
			return this;
		},
		'reloadShop': function(shopIndex, overwrite, callBackFuncs) {
			var shop = shops[shopIndex];
			if (shop == null || (!overwrite && shop.createdAt > 0)) {
				return;
			}
			ShopService.findShop(shop.shopKey, {
				'success': function(response) {
					ObjectFactory.replaceObject(shops[shopIndex], response);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
		},
		'randomShop': function(ignoreShopKeys) {
			if (shops.length <= 0) {
				return null;
			}
			var randomShopArray = [];
			for (var i = 0; i < shops.length; i++) {
				var shop = shops[i];
				if (ignoreShopKeys != null && ignoreShopKeys.indexOf(shop.shopKey) >= 0) {
					continue;
				}
				randomShopArray.push(shop);
			}
			var randomShopIndex = Math.floor((Math.random() * randomShopArray.length));
			return randomShopArray[randomShopIndex];
		},
		'createShop': function(callBackFuncs) {
			var newShop = this.generateShop();
			ShopService.createShop(newShop, {
				'success': function(response) {
					ShopFactory.addShop(response);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'deleteShop': function(shopKey, callBackFuncs) {
			var OrderFactory = $injector.get('OrderFactory');
			ShopService.deleteShop(shopKey, {
				'success': function(response) {
					ShopFactory.removeShop(shopKey);
					OrderFactory.clearTodayOrder();
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success();
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'updateShop': function(shop, callBackFuncs) {
			ShopService.findShop(shop.shopKey, {
				'success': function(response) {
					if (response != null && response.shopKey != null && response.archived === false) {
						ShopService.updateShop(shop, callBackFuncs);
					} else if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success();
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		}
	});
} ]);
