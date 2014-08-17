'use strict';

angular.module('app').factory('SyncFactory', [ '$injector', 'SyncService', 'DateFactory', function($injector, SyncService, DateFactory) {
	var lastSyncUTCDate = DateFactory.nowUTCDate();
	return {
		'syncAll': function(callBackFuncs) {
			var ShopFactory = $injector.get('ShopFactory');
			var OrderFactory = $injector.get('OrderFactory');
			var OrderDetailFactory = $injector.get('OrderDetailFactory');
			var lastSyncUTCTime = lastSyncUTCDate.getTime();
			// reset sync time
			lastSyncUTCDate = DateFactory.nowUTCDate();
			// sync with server side
			SyncService.syncAll(lastSyncUTCTime, {
				'success': function(response) {
					ShopFactory.updateExistedShops(response.newlyShops);
					OrderFactory.updateExistedOrder(response.newlyOrders);
					OrderDetailFactory.updateExistedOrderDetails(response.newlyOrderDetails);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			}, true);
		}
	};
} ]);
