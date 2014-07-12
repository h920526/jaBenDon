'use strict';

angular.module('app').service('OrderService', [ 'RestFactory', 'DateFactory', function(RestFactory, DateFactory) {
	this.createOrder = function(order, callBackFuncs) {
		if (order == null) {
			return null;
		}
		return RestFactory.post('rest/order', order, callBackFuncs);
	};
	this.findOrder = function(orderKey, callBackFuncs) {
		if (orderKey == null) {
			return null;
		}
		return RestFactory.get('rest/order/' + orderKey, callBackFuncs);
	};
	this.findOrders = function(callBackFuncs) {
		return RestFactory.get('rest/order', callBackFuncs);
	};
	this.updateOrder = function(order, callBackFuncs) {
		if (order == null) {
			return null;
		}
		return RestFactory.put('rest/order', order, callBackFuncs);
	};
	this.deleteOrder = function(orderKey, callBackFuncs) {
		if (orderKey == null) {
			return null;
		}
		return RestFactory.del('rest/order/' + orderKey, callBackFuncs);
	};

	/*
	 * custom service
	 */
	this.findOrderByOrderAt = function(orderAtUtcTime, callBackFuncs) {
		if (orderAtUtcTime == null) {
			return null;
		}
		return RestFactory.get('rest/order/orderAt/' + orderAtUtcTime, callBackFuncs);
	};
	this.findTodayOrder = function(callBackFuncs) {
		var orderAtUtcTime = DateFactory.clearToDate(DateFactory.nowUTCDate()).getTime();
		return this.findOrderByOrderAt(orderAtUtcTime, callBackFuncs);
	};
} ]);
