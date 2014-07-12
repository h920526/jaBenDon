'use strict';

angular.module('app').factory('OrderDetailFactory', [ '$injector', 'ObjectFactory', 'RestFactory', 'OrderDetailService', function($injector, ObjectFactory, RestFactory, OrderDetailService) {
	// order details under order
	var orderDetails = [];

	function findOrderDetailsByOrderKey(orderDetails, orderKey) {
		var result = [];
		if (orderDetails != null && orderKey != null) {
			for (var i = orderDetails.length - 1; i >= 0; i--) {
				var orderDetail = orderDetails[i];
				if (orderDetail.order.orderKey === orderKey) {
					result.push(orderDetail);
				}
			}
		}
		return result;
	}

	function findOrderDetail(orderDetails, orderDetailKey) {
		if (orderDetails != null && orderDetailKey != null) {
			for (var i = orderDetails.length - 1; i >= 0; i--) {
				var orderDetail = orderDetails[i];
				if (orderDetail.orderDetailKey === orderDetailKey) {
					return orderDetail;
				}
			}
		}
		return null;
	}

	var OrderDetailFactory = null;
	return (OrderDetailFactory = {
		'getOrderDetails': function() {
			return orderDetails;
		},
		'resetOrderDetails': function(replaceWithArray) {
			if (replaceWithArray == null) {
				orderDetails.length = 0;
				return this;
			}
			ObjectFactory.resetArray(orderDetails, replaceWithArray);
			return this;
		},
		'generateOrderDetail': function(orderKey) {
			return {
				'order': {
					'orderKey': orderKey
				}
			};
		},
		'addOrderDetail': function(newOrderDetails) {
			orderDetails.push(newOrderDetails);
			return this;
		},
		'sortOrderDetails': function() {
			orderDetails.sort(function(orderDetail1, orderDetail2) {
				if ((orderDetail1 == null && orderDetail2 == null) || (orderDetail1 === orderDetail2)) {
					return 0;
				} else if (orderDetail1 == null && orderDetail2 != null) {
					return 1;
				} else if (orderDetail1 != null && orderDetail2 == null) {
					return -1;
				} else if (orderDetail1.orderDetailKey < orderDetail2.orderDetailKey) {
					return -1;
				} else if (orderDetail1.orderDetailKey > orderDetail2.orderDetailKey) {
					return 1;
				}
				return 0;
			});
			return this;
		},
		'getOrderDetailIndex': function(orderDetailKey) {
			if (orderDetailKey != null) {
				for (var i = orderDetails.length - 1; i >= 0; i--) {
					if (orderDetails[i].orderDetailKey === orderDetailKey) {
						return i;
					}
				}
			}
			return -1;
		},
		'updateExistedOrderDetails': function(replaceWithArray) {
			var OrderFactory = $injector.get('OrderFactory');
			var order = OrderFactory.getOrder();
			if (replaceWithArray == null || replaceWithArray.length <= 0 || order == null || order.orderKey == null) {
				return this;
			}
			replaceWithArray = findOrderDetailsByOrderKey(replaceWithArray, order.orderKey);
			for (var i = replaceWithArray.length - 1; i >= 0; i--) {
				var replaceWith = replaceWithArray[i];
				var orderDetail = findOrderDetail(orderDetails, replaceWith.orderDetailKey);
				if (orderDetail == null && !replaceWith.archived) {
					// append it
					orderDetails.push(replaceWith);
				} else if (orderDetail != null && replaceWith.archived) {
					// remove it
					var orderDetailIndex = this.getOrderDetailIndex(orderDetail.orderDetailKey);
					orderDetails.splice(orderDetailIndex, 1);
				} else if (orderDetail != null && !replaceWith.archived) {
					// replace existed item
					ObjectFactory.replaceObject(orderDetail, replaceWith);
				}
			}
			this.sortOrderDetails();
			return this;
		},
		'reloadOrderDetailsByOrderKey': function(orderKey, callBackFuncs) {
			if (orderKey == null) {
				if (callBackFuncs != null && callBackFuncs.success != null) {
					callBackFuncs.success();
				}
				return this;
			}
			OrderDetailService.findOrderDetailsByOrderKey(orderKey, {
				'success': function(response) {
					OrderDetailFactory.resetOrderDetails(response);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'removeOrderDetail': function(orderDetailKey) {
			if (orderDetailKey == null) {
				return this;
			}
			var orderDetailIndex = this.getOrderDetailIndex(orderDetailKey);
			if (orderDetailIndex >= 0) {
				orderDetails.splice(orderDetailIndex, 1);
			}
			return this;
		},
		'createOrderDetail': function(orderKey, callBackFuncs) {
			var newOrderDetail = this.generateOrderDetail(orderKey);
			OrderDetailService.createOrderDetail(newOrderDetail, {
				'success': function(response) {
					OrderDetailFactory.addOrderDetail(response);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'updateOrderDetail': function(orderDetail, callBackFuncs) {
			OrderDetailService.findOrderDetail(orderDetail.orderDetailKey, {
				'success': function(response) {
					if (response != null && response.orderDetailKey != null && response.archived === false) {
						OrderDetailService.updateOrderDetail(orderDetail, callBackFuncs);
					} else if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success();
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'deleteOrderDetail': function(orderDetailKey, callBackFuncs) {
			var OrderUserFactory = $injector.get('OrderUserFactory');
			OrderDetailService.deleteOrderDetail(orderDetailKey, {
				'success': function() {
					OrderDetailFactory.removeOrderDetail(orderDetailKey);
					OrderUserFactory.removeOrderUsersByOrderDetailKey(orderDetailKey);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success();
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'clearWithoutMealData': function(orderDetails) {
			if (orderDetails == null) {
				return;
			}
			var result = [];
			for (var i = 0; i < orderDetails.length; i++) {
				var orderDetail = orderDetails[i];
				result.push({
					'mealName': orderDetail.mealName,
					'mealPrice': orderDetail.mealPrice
				});
			}
			return result;
		},
		'bulkRecreateOrderDetails': function(order, orderDetails, callBackFuncs) {
			if (order == null || order.orderKey == null || order.orderAt == null || orderDetails == null || orderDetails.length <= 0) {
				if (callBackFuncs != null && callBackFuncs.success != null) {
					callBackFuncs.success();
				}
				return this;
			}
			for (var i = orderDetails.length - 1; i >= 0; i--) {
				orderDetails[i].order = order;
			}
			OrderDetailService.bulkCreateOrderDetail(orderDetails, {
				'success': function(response) {
					OrderDetailFactory.resetOrderDetails(response);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		}
	});
} ]);
