'use strict';

angular.module('app').service('OrderDetailService', [ 'RestFactory', function(RestFactory) {
	this.createOrderDetail = function(orderDetail, callBackFuncs) {
		if (orderDetail == null) {
			return null;
		}
		return RestFactory.post('rest/orderDetail', orderDetail, callBackFuncs);
	};
	this.findOrderDetail = function(orderDetailKey, callBackFuncs) {
		if (orderDetailKey == null) {
			return null;
		}
		return RestFactory.get('rest/orderDetail/' + orderDetailKey, callBackFuncs);
	};
	this.findOrderDetails = function(callBackFuncs) {
		return RestFactory.get('rest/orderDetail', callBackFuncs);
	};
	this.updateOrderDetail = function(orderDetail, callBackFuncs) {
		if (orderDetail == null) {
			return null;
		}
		return RestFactory.put('rest/orderDetail', orderDetail, callBackFuncs);
	};
	this.deleteOrderDetail = function(orderDetailKey, callBackFuncs) {
		if (orderDetailKey == null) {
			return null;
		}
		return RestFactory.del('rest/orderDetail/' + orderDetailKey, callBackFuncs);
	};

	/*
	 * custom service
	 */
	this.findOrderDetailsByOrderKey = function(orderKey, callBackFuncs) {
		if (orderKey == null) {
			return null;
		}
		return RestFactory.get('rest/orderDetail/orderKey/' + orderKey, callBackFuncs);
	};
	this.findNewestDateOrderDetailsByShopKey = function(shopKey, callBackFuncs) {
		if (shopKey == null) {
			return null;
		}
		return RestFactory.get('rest/orderDetail/newestDate/shopKey/' + shopKey, callBackFuncs);
	};
	this.bulkCreateOrderDetail = function(orderDetails, callBackFuncs) {
		if (orderDetails == null || orderDetails.length <= 0) {
			return null;
		}
		return RestFactory.post('rest/orderDetail/bulk', orderDetails, callBackFuncs);
	};
} ]);
