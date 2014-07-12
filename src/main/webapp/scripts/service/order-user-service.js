'use strict';

angular.module('app').service('OrderUserService', [ 'RestFactory', function(RestFactory) {
	this.createOrderUser = function(orderUser, callBackFuncs) {
		if (orderUser == null) {
			return null;
		}
		return RestFactory.post('rest/orderUser', orderUser, callBackFuncs);
	};
	this.findOrderUser = function(orderUserKey, callBackFuncs) {
		if (orderUserKey == null) {
			return null;
		}
		return RestFactory.get('rest/orderUser/' + orderUserKey, callBackFuncs);
	};
	this.findOrderUsers = function(callBackFuncs) {
		return RestFactory.get('rest/orderUser', callBackFuncs);
	};
	this.updateOrderUser = function(orderUser, callBackFuncs) {
		if (orderUser == null) {
			return null;
		}
		return RestFactory.put('rest/orderUser', orderUser, callBackFuncs);
	};
	this.deleteOrderUser = function(orderUserKey, callBackFuncs) {
		if (orderUserKey == null) {
			return null;
		}
		return RestFactory.del('rest/orderUser/' + orderUserKey, callBackFuncs);
	};

	/*
	 * custom service
	 */
	this.findOrderUsersByOrderKey = function(orderKey, callBackFuncs) {
		if (orderKey == null) {
			return null;
		}
		return RestFactory.get('rest/orderUser/orderKey/' + orderKey, callBackFuncs);
	};
	this.findOrderUsersByOrderDetailKey = function(orderDetailKey, callBackFuncs) {
		if (orderDetailKey == null) {
			return null;
		}
		return RestFactory.get('rest/orderUser/orderDetailKey/' + orderDetailKey, callBackFuncs);
	};
	this.findAllOrderUserNames = function(callBackFuncs) {
		return RestFactory.get('rest/orderUser/orderUserName', callBackFuncs);
	};
} ]);
