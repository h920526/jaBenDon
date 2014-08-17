'use strict';

angular.module('app').factory('SyncFactory', [ '$injector', 'SyncService', 'DateFactory', function($injector, SyncService, DateFactory) {
	var lastSyncUTCTime = 0;
	return {
		'syncAll': function(callBackFuncs) {
			var ShopFactory = $injector.get('ShopFactory');
			var OrderFactory = $injector.get('OrderFactory');
			var OrderDetailFactory = $injector.get('OrderDetailFactory');
			var OrderUserFactory = $injector.get('OrderUserFactory');
			// sync with server side
			SyncService.syncAll(lastSyncUTCTime, {
				'success': function(response) {
					lastSyncUTCTime = response.lastSyncTime;
					ShopFactory.updateExistedShops(response.newlyShops);
					OrderFactory.updateExistedOrder(response.newlyOrders);
					OrderDetailFactory.updateExistedOrderDetails(response.newlyOrderDetails);
					OrderUserFactory.updateExistedOrderUsers(response.newlyOrderUsers);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			}, true);
		}
	};
} ]);
