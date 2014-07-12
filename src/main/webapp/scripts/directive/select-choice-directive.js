'use strict';

angular.module('app').directive('selectChoiceDirective', [ '$timeout', 'ObjectFactory', 'OrderUserService', 'OrderUserFactory', 'OrderFactory', function($timeout, ObjectFactory, OrderUserService, OrderUserFactory, OrderFactory) {
	/**
	 * carousel shop
	 */
	function initOrderUserChoice(scope, element, orderDetail) {
		var tagsArray = [];
		// init
		var orderUserChoice = element.select2({
			'width': '100%',
			'containerCssClass': 'orderUserChoice',
			'tags': tagsArray,
			'tokenSeparators': [ ",", " " ],
			'formatSelection': function(item) {
				return item.text;
			},
			'formatResult': function(item) {
				return item.text;
			}
		});
		// load tags
		OrderUserService.findAllOrderUserNames({
			'success': function(response) {
				ObjectFactory.resetArray(tagsArray, response);
			}
		});
		// callback
		orderUserChoice.on("change", function(event) {
			scope.selectChoiceDirectiveOnchange({
				'$event': event
			});
		});
		orderUserChoice.prev('.select2-container').click(function(event) {
			scope.selectChoiceDirectiveOnclick({
				'$event': event
			});
		});
	}

	function onChangeOrderUserChoice($event, orderDetail) {
		var addedOrderDetailUserName = ($event.added != null ? $event.added.text : null);
		var removedOrderDetailUserKey = ($event.removed != null ? $event.removed.id : null);
		OrderUserFactory.updateOrderUsersByOrderUserNames(orderDetail.orderDetailKey, addedOrderDetailUserName, removedOrderDetailUserKey, {
			'success': function() {
				OrderFactory.updateOrder(OrderFactory.getOrder(), true);
			}
		});
	}

	function toggleOrderUserChoice($event) {
		var $tokenItem = $($event.target);
		if ($tokenItem.not('.select2-search-choice')) {
			var $tokenItemChain = $tokenItem.parents('.select2-search-choice');
			if ($tokenItemChain.length <= 0) {
				return;
			}
			$tokenItem = $tokenItemChain.eq(0);
		}
		var select2Data = $tokenItem.data('select2Data');
		var orderUser = OrderUserFactory.getOrderUser(select2Data.id);
		orderUser.isPaid = !(orderUser.isPaid != null ? orderUser.isPaid : false);
		if (orderUser.isPaid) {
			$tokenItem.addClass('orderUserPaid');
		} else {
			$tokenItem.removeClass('orderUserPaid');
		}
		OrderUserFactory.updateOrderUser(orderUser);
	}

	/**
	 * directive
	 */
	function registerScopeFunctions(scope, element) {
		var $scope = scope.$parent;
		$scope.initOrderUserChoice = function(orderDetail) {
			initOrderUserChoice(scope, element, orderDetail);
		};
		$scope.onLoadOrderUserChoice = function(orderDetailUsers) {
			onLoadOrderUserChoice(element, orderDetailUsers);
		};
		$scope.onChangeOrderUserChoice = onChangeOrderUserChoice;
		$scope.toggleOrderUserChoice = toggleOrderUserChoice;
	}

	return {
		restrict: 'A',
		scope: {
			selectChoiceDirective: '&',
			selectChoiceDirectiveOnload: '&',
			selectChoiceDirectiveOnchange: '&',
			selectChoiceDirectiveOnclick: '&'
		},
		link: function(scope, element, attrs) {
			registerScopeFunctions(scope, element);
			scope.selectChoiceDirective();
		}
	};
} ]);