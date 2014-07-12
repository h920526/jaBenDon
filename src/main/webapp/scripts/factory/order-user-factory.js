'use strict';

angular.module('app').factory('OrderUserFactory', [ '$injector', 'ObjectFactory', 'RestFactory', 'OrderUserService', function($injector, ObjectFactory, RestFactory, OrderUserService) {
	// order users under order
	var orderUsers = [];

	function findOrderUsersByOrderKey(orderUsers, orderKey) {
		var result = [];
		if (orderUsers != null && orderKey != null) {
			for (var i = 0; i < orderUsers.length; i++) {
				var orderUser = orderUsers[i];
				if (orderUser.orderDetail.order.orderKey === orderKey) {
					result.push(orderUser);
				}
			}
		}
		return result;
	}

	function findOrderUser(orderUsers, orderUserKey) {
		if (orderUsers != null && orderUserKey != null) {
			for (var i = orderUsers.length - 1; i >= 0; i--) {
				var orderUser = orderUsers[i];
				if (orderUser.orderUserKey === orderUserKey) {
					return orderUser;
				}
			}
		}
		return null;
	}

	var OrderUserFactory = null;
	return (OrderUserFactory = {
		'getOrderUsers': function() {
			return orderUsers;
		},
		'resetOrderUsers': function(replaceWithArray) {
			if (replaceWithArray == null) {
				orderUsers.length = 0;
				return this;
			}
			ObjectFactory.resetArray(orderUsers, replaceWithArray);
			return this;
		},
		'generateOrderUser': function(orderDetailKey, orderUserName) {
			return {
				'orderUserName': orderUserName,
				'orderDetail': {
					'orderDetailKey': orderDetailKey
				}
			};
		},
		'addOrderUser': function(newOrderUsers) {
			orderUsers.push(newOrderUsers);
			return this;
		},
		'sortOrderUsers': function() {
			orderUsers.sort(function(orderUser1, orderUser2) {
				if ((orderUser1 == null && orderUser2 == null) || (orderUser1 === orderUser2)) {
					return 0;
				} else if (orderUser1 == null && orderUser2 != null) {
					return 1;
				} else if (orderUser1 != null && orderUser2 == null) {
					return -1;
				} else if (orderUser1.orderUserKey < orderUser2.orderUserKey) {
					return -1;
				} else if (orderUser1.orderUserKey > orderUser2.orderUserKey) {
					return 1;
				}
				return 0;
			});
			return this;
		},
		'getOrderUserIndex': function(orderUserKey) {
			if (orderUserKey != null) {
				for (var i = orderUsers.length - 1; i >= 0; i--) {
					if (orderUsers[i].orderUserKey === orderUserKey) {
						return i;
					}
				}
			}
			return -1;
		},
		'getOrderUser': function(orderUserKey) {
			if (orderUserKey != null) {
				for (var i = orderUsers.length - 1; i >= 0; i--) {
					var orderUser = orderUsers[i];
					if (orderUser.orderUserKey === orderUserKey) {
						return orderUser;
					}
				}
			}
			return null;
		},
		'updateExistedOrderUsers': function(replaceWithArray) {
			var OrderFactory = $injector.get('OrderFactory');
			var order = OrderFactory.getOrder();
			if (replaceWithArray == null || replaceWithArray.length <= 0 || order == null || order.orderKey == null) {
				return this;
			}
			replaceWithArray = findOrderUsersByOrderKey(replaceWithArray, order.orderKey);
			for (var i = replaceWithArray.length - 1; i >= 0; i--) {
				var replaceWith = replaceWithArray[i];
				var orderUser = findOrderUser(orderUsers, replaceWith.orderUserKey);
				if (orderUser == null && !replaceWith.archived) {
					// append it
					orderUsers.push(replaceWith);
				} else if (orderUser != null && replaceWith.archived) {
					// remove it
					var orderUserIndex = this.getOrderUserIndex(orderUser.orderUserKey);
					orderUsers.splice(orderUserIndex, 1);
				} else if (orderUser != null && !replaceWith.archived) {
					// replace existed item
					ObjectFactory.replaceObject(orderUser, replaceWith);
				}
			}
			this.sortOrderUsers();
			return this;
		},
		'reloadOrderUsersByOrderKey': function(orderKey, callBackFuncs) {
			if (orderKey == null) {
				if (callBackFuncs != null && callBackFuncs.success != null) {
					callBackFuncs.success();
				}
				return this;
			}
			OrderUserService.findOrderUsersByOrderKey(orderKey, {
				'success': function(response) {
					OrderUserFactory.resetOrderUsers(response);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'removeOrderUser': function(orderUserKey) {
			if (orderUserKey == null) {
				return this;
			}
			var orderUserIndex = this.getOrderUserIndex(orderUserKey);
			if (orderUserIndex >= 0) {
				orderUsers.splice(orderUserIndex, 1);
			}
			return this;
		},
		'removeOrderUsersByOrderDetailKey': function(orderDetailKey) {
			if (orderDetailKey == null) {
				return this;
			}
			for (var i = orderUsers.length - 1; i >= 0; i--) {
				var orderUser = orderUsers[i];
				if (orderUser.orderDetail.orderDetailKey === orderDetailKey) {
					orderUsers.splice(i, 1);
				}
			}
			return this;
		},
		'createOrderUser': function(orderDetailKey, orderUserName, callBackFuncs) {
			var newOrderUser = this.generateOrderUser(orderDetailKey, orderUserName);
			OrderUserService.createOrderUser(newOrderUser, {
				'success': function(response) {
					OrderUserFactory.addOrderUser(response);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success(response);
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'deleteOrderUser': function(orderUserKey, callBackFuncs) {
			OrderUserService.deleteOrderUser(orderUserKey, {
				'success': function() {
					OrderUserFactory.removeOrderUser(orderUserKey);
					if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success();
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'findOrderUsersByOrderDetailKey': function(orderDetailKey) {
			var result = [];
			if (orderDetailKey != null) {
				for (var i = 0; i < orderUsers.length; i++) {
					var orderUser = orderUsers[i];
					if (orderUser.orderDetail.orderDetailKey === orderDetailKey) {
						result.push(orderUser);
					}
				}
			}
			return result;
		},
		'updateOrderUser': function(orderUser, callBackFuncs) {
			OrderUserService.findOrderUser(orderUser.orderUserKey, {
				'success': function(response) {
					if (response != null && response.orderUserKey != null && response.archived === false) {
						OrderUserService.updateOrderUser(orderUser, callBackFuncs);
					} else if (callBackFuncs != null && callBackFuncs.success != null) {
						callBackFuncs.success();
					}
				},
				'error': (callBackFuncs != null ? callBackFuncs.error : null)
			});
			return this;
		},
		'updateOrderUsersByOrderUserNames': function(orderDetailKey, addedOrderDetailUserName, removedOrderDetailUserKey, callBackFuncs) {
			if (addedOrderDetailUserName != null) {
				this.createOrderUser(orderDetailKey, addedOrderDetailUserName, callBackFuncs)
			}
			if (removedOrderDetailUserKey != null) {
				this.deleteOrderUser(removedOrderDetailUserKey, callBackFuncs);
			}
		}
	});
} ]);
