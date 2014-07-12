'use strict';

angular.module('app').factory('OrderFactory', [ '$injector', 'ObjectFactory', 'RestFactory', 'OrderService', 'OrderDetailService', function($injector, ObjectFactory, RestFactory, OrderService, OrderDetailService) {
	// today order
	var order = {};

	function findOrder(orders, orderKey) {
		if (orders != null && orderKey != null) {
			for (var i = orders.length - 1; i >= 0; i--) {
				var childOrder = orders[i];
				if (childOrder.orderKey === orderKey) {
					return childOrder;
				}
			}
		}
		return null;
	}

	var OrderFactory = null;
	return (OrderFactory = {
		'getOrder': function() {
			return order;
		},
		'resetOrder': function(replaceWith) {
			// reset inner propertiess for referenced object
			ObjectFactory.replaceObject(order, replaceWith);
			return this;
		},
		'clearTodayOrder': function() {
			var OrderDetailFactory = $injector.get('OrderDetailFactory');
			var OrderUserFactory = $injector.get('OrderUserFactory');
			this.resetOrder(null);
			OrderDetailFactory.resetOrderDetails(null);
			OrderUserFactory.resetOrderUsers(null);
			return this;
		},
		'generateOrder': function(orderAtUtcTime, shopKey) {
			return {
				'orderAt': orderAtUtcTime,
				'shop': {
					'shopKey': shopKey
				}
			};
		},
		'updateExistedOrder': function(replaceWithArray) {
			if (order.orderKey == null || replaceWithArray == null || replaceWithArray.length <= 0) {
				return this;
			}
			var replaceWith = findOrder(replaceWithArray, order.orderKey);
			if (replaceWith == null) {
				return this;
			} else if (replaceWith.archived) {
				replaceWith = null;
			}
			this.resetOrder(replaceWith);
			return this;
		},
		'reloadTodayOrder': function(callBackFuncs) {
			OrderService.findTodayOrder({
				'success': function(response) {
					OrderFactory.resetOrder(response);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'createOrder': function(orderAtUtcTime, shopKey, callBackFuncs) {
			var OrderDetailFactory = $injector.get('OrderDetailFactory');
			OrderDetailService.findNewestDateOrderDetailsByShopKey(shopKey, {
				'success': function(response) {
					// prepare newest order details
					var orderDetails = OrderDetailFactory.clearWithoutMealData(response);
					// create order
					var newOrder = OrderFactory.generateOrder(orderAtUtcTime, shopKey);
					OrderService.createOrder(newOrder, {
						'success': function(response) {
							OrderFactory.resetOrder(response);
							// create default order details
							OrderDetailFactory.bulkRecreateOrderDetails(response, orderDetails, callBackFuncs);
						},
						'error': (callBackFuncs != null ? callBackFuncs.error : null)
					});
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'deleteOrder': function(orderKey, callBackFuncs) {
			OrderService.deleteOrder(orderKey, {
				'success': function() {
					OrderFactory.clearTodayOrder();
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success();
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'updateOrder': function(order, recalculateTotalPrice, callBackFuncs) {
			var OrderUserFactory = $injector.get('OrderUserFactory');
			var OrderDetailFactory = $injector.get('OrderDetailFactory');
			// calculate total amount
			order.totalAmount = OrderUserFactory.getOrderUsers().length;
			// recalculate total price
			if (recalculateTotalPrice) {
				var totalPrice = 0;
				var orderDetails = OrderDetailFactory.getOrderDetails();
				for (var i = orderDetails.length - 1; i >= 0; i--) {
					var orderDetail = orderDetails[i];
					var orderDetailUsers = OrderUserFactory.findOrderUsersByOrderDetailKey(orderDetail.orderDetailKey);
					totalPrice += (orderDetail.mealPrice * orderDetailUsers.length);
				}
				order.totalPrice = totalPrice;
			}
			// update
			OrderService.findOrder(order.orderKey, {
				'success': function(response) {
					if (response != null && response.orderKey != null && response.archived === false) {
						OrderService.updateOrder(order, callBackFuncs);
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
