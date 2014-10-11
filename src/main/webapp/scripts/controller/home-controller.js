'use strict';

angular.module('app').controller(
	'homeController',
	[ '$scope', '$timeout', '$cookies', '$translate', 'SyncFactory', 'DateFactory', 'RestFactory', 'ObjectFactory', 'ShopFactory', 'OrderService', 'OrderFactory', 'OrderDetailFactory', 'OrderUserFactory',
		function($scope, $timeout, $cookies, $translate, SyncFactory, DateFactory, RestFactory, ObjectFactory, ShopFactory, OrderService, OrderFactory, OrderDetailFactory, OrderUserFactory) {
			/**
			 * init
			 */
			$scope.carouselPlayControl = false;
			$scope.isCarouselSlideStoped = true;
			$scope.activedShopIndex = 0;
			$scope.carouselShops = ShopFactory.getShops();
			$scope.order = OrderFactory.getOrder();
			$scope.orderDetails = OrderDetailFactory.getOrderDetails();
			$scope.orderUsers = OrderUserFactory.getOrderUsers();
			$scope.isOrderDialogVisible = false;

			/**
			 * private functions
			 */
			function initShopAndOrderOnLoad() {
				RestFactory.ajaxRequestBundleWrapper().push(function(wrapperFuncs) {
					// relad all shops
					ShopFactory.preloadAllShops(wrapperFuncs);
				}).push(function(wrapperFuncs) {
					// reload today order
					OrderFactory.reloadTodayOrder(wrapperFuncs);
				}).start({
					'complete': function() {
						$timeout(function() {
							if ($scope.order != null && $scope.order.orderKey > 0 && $cookies.isOrderDialogShown !== 'false') {
								// today order existed
								gotoSpecifyShopAndShowOrder($scope.order);
							} else if ($scope.carouselShops.length > 0) {
								$scope.gotoCarouselShop(0);
								$scope.playCarouselShop();
							}
						}, 500);
					}
				});
			}

			function confirmToAddTodayOrder(shopKey, callBackFuncs) {
				// find today order
				var orderAtUtcTime = DateFactory.clearToDate(DateFactory.nowUTCDate()).getTime();
				OrderService.findOrderByOrderAt(orderAtUtcTime, {
					'success': function(response) {
						if (response == null || response.orderKey == null) {
							OrderFactory.createOrder(orderAtUtcTime, shopKey, callBackFuncs);
						} else if (response.shopKey !== shopKey) {
							bootbox.confirm($translate.instant('confirm_replace_today_order'), function(result) {
								if (!result) {
									if (callBackFuncs != null && callBackFuncs.success != null) {
										callBackFuncs.success();
									}
									return;
								}
								// delete existed order and then create a new
								// one
								OrderService.deleteOrder(response.orderKey, {
									'success': function(response) {
										OrderFactory.createOrder(orderAtUtcTime, shopKey, callBackFuncs);
									},
									'error': (callBackFuncs != null ? callBackFuncs.error : null)
								});
							});
						} else if (callBackFuncs != null && callBackFuncs.success != null) {
							callBackFuncs.success();
						}
					},
					'error': (callBackFuncs != null ? callBackFuncs.error : null)
				});
			}

			// 1. if today order existed, go to this shop and show this order
			function gotoSpecifyShopAndShowOrder(order) {
				if (order.shop == null) {
					return;
				}
				var shopIndex = ShopFactory.getShopIndex(order.shop.shopKey);
				if (shopIndex < 0) {
					return;
				}
				// copy it because it will be reseted after carousel sliding
				order = ObjectFactory.copy(order);
				$scope.pauseCarouselShop();
				$scope.gotoCarouselShop(shopIndex);
				$timeout(function() {
					OrderFactory.resetOrder(order);
					$scope.showOrderDiaglog(true);
				}, 500);
			}

			// 2. if today order not existed and carousel playing, random shop
			// and add a order on it
			function randomShopAndShowCreatedOrder() {
				// ignore current activing shop
				var activedShop = ShopFactory.getShops()[$scope.activedShopIndex];
				var shop = ShopFactory.randomShop(activedShop != null && $scope.carouselShops.length > 1 ? [ activedShop.shopKey ] : null);
				if (shop == null) {
					return;
				}
				$scope.pauseCarouselShop();
				$scope.gotoCarouselShop(ShopFactory.getShopIndex(shop.shopKey));
				confirmToAddTodayOrder(shop.shopKey, {
					'success': function() {
						$scope.showOrderDiaglog(true);
					}
				});
			}

			// 3. if today order not existed and carousel pausing, add a order
			// on it
			function showCreatedOrderToSpecifyShop() {
				var shop = ShopFactory.getShops()[$scope.activedShopIndex];
				if (shop == null) {
					return;
				}
				confirmToAddTodayOrder(shop.shopKey, {
					'success': function() {
						$scope.showOrderDiaglog(true);
					}
				});
			}

			function syncAll() {
				SyncFactory.syncAll({
					'success': function(response) {
						if (response.newlyOrderUsers != null && response.newlyOrderUsers.length > 0) {
							$scope.applyOrderUsersToOrderUserSelectChoice(response);
						}
						$timeout(function() {
							syncAll();
						}, 5000);
					},
					'error': function() {
						$timeout(function() {
							syncAll();
						}, 5000);
					}
				});
			}

			/**
			 * public functions
			 */
			$scope.toggleOrderDialog = function() {
				if ($scope.isOrderDialogVisible) {
					$scope.hideOrderDiaglog(true);
					return;
				} else if ($scope.carouselShops.length <= 0) {
					return;
				}
				OrderService.findTodayOrder({
					'success': function(response) {
						if (response != null && response.orderKey > 0 && response.shop != null && ShopFactory.getShopIndex(response.shop.shopKey) >= 0) {
							gotoSpecifyShopAndShowOrder(response);
						} else if ($scope.carouselPlayControl) {
							randomShopAndShowCreatedOrder();
						} else {
							showCreatedOrderToSpecifyShop();
						}
					}
				});
			};

			$scope.pauseCarouselShop = function($event) {
				if ($event != null) {
					$event.stopPropagation();
				}
				var $carouselShop = $('#carousel-shop');
				$carouselShop.data('bs.carousel').options.interval = false;
				$carouselShop.carousel('pause');

				$scope.applyScope(function() {
					$scope.carouselPlayControl = false;
				});
			};

			$scope.playCarouselShop = function($event) {
				if ($event != null) {
					$event.stopPropagation();
				}
				var $carouselShop = $('#carousel-shop');
				$carouselShop.data('bs.carousel').options.interval = 3000;
				$carouselShop.carousel('cycle');

				$scope.applyScope(function() {
					$scope.carouselPlayControl = true;
				});
			};

			$scope.gotoCarouselShop = function(shopIndex) {
				if (shopIndex == null || shopIndex < 0 || shopIndex >= $scope.carouselShops.length) {
					return;
				}
				$scope.hideOrderDiaglog(false);

				$scope.pauseCarouselShop();
				var $carouselShop = $('#carousel-shop');
				if ($carouselShop.data('bs.carousel').sliding) {
					return;
				}
				ShopFactory.reloadShop(shopIndex);
				$carouselShop.carousel(shopIndex);
			};

			$scope.addShop = function() {
				$scope.pauseCarouselShop();

				$scope.isCarouselSlideStoped = false;
				ShopFactory.createShop({
					'success': function(response) {
						$scope.isCarouselSlideStoped = true;
						$timeout(function() {
							$scope.gotoCarouselShop(ShopFactory.getShopIndex(response.shopKey));
						}, 500);
					}
				});
			};

			$scope.addOrderDetail = function() {
				if ($scope.order == null) {
					return;
				}
				OrderDetailFactory.createOrderDetail($scope.order.orderKey);
			};

			$scope.confirmToDeleteShop = function(shop) {
				var isCarouselShopPlaying = $scope.carouselPlayControl;
				$scope.pauseCarouselShop();

				bootbox.confirm($translate.instant('confirm_delete_shop'), function(result) {
					var shopIndex = ShopFactory.getShopIndex(shop.shopKey);
					if (!result || shopIndex < 0) {
						if (isCarouselShopPlaying) {
							$scope.playCarouselShop();
						}
						return;
					}
					$scope.hideOrderDiaglog(true);

					$scope.isCarouselSlideStoped = false;
					ShopFactory.deleteShop(shop.shopKey, {
						'success': function() {
							$scope.isCarouselSlideStoped = true;
							$timeout(function() {
								var gotoShopIndex = shopIndex;
								if (gotoShopIndex >= $scope.carouselShops.length) {
									gotoShopIndex = $scope.carouselShops.length - 1;
								}
								$scope.gotoCarouselShop(gotoShopIndex);
								$scope.playCarouselShop();
							}, 1000);
						}
					});
				});
			};

			$scope.confirmToDeleteOrder = function(order) {
				$scope.pauseCarouselShop();

				bootbox.confirm($translate.instant('confirm_delete_order'), function(result) {
					if (!result || order.orderKey == null) {
						return;
					}
					OrderFactory.deleteOrder(order.orderKey);
					$scope.hideOrderDiaglog(true);
					$scope.playCarouselShop();
				});
			};

			$scope.applyScope = function(callbackFunc) {
				if ($scope.$$phase != null) {
					callbackFunc();
				} else {
					$scope.$apply(callbackFunc);
				}
			};

			$scope.showOrderDiaglog = function(keepDialogState) {
				$('#orderDialog').modal('show');
				if (keepDialogState) {
					$cookies.isOrderDialogShown = 'true';
				}
			};

			$scope.hideOrderDiaglog = function(keepDialogState) {
				$('#orderDialog').modal('hide');
				if (keepDialogState) {
					$cookies.isOrderDialogShown = 'false';
				}
			};

			$scope.updateShop = function(shop, $event) {
				if ($event != null && $event.relatedTarget != null && $($event.relatedTarget).is('#orderDialog')) {
					return;
				}
				ShopFactory.updateShop(shop);
			};

			$scope.updateOrder = function(order, recalculateTotalPrice) {
				OrderFactory.updateOrder(order, recalculateTotalPrice);
			};

			$scope.updateOrderDetail = function(orderDetail) {
				OrderDetailFactory.updateOrderDetail(orderDetail);
			};

			$scope.confirmToDeleteOrderDetail = function(orderDetail) {
				bootbox.confirm($translate.instant('confirm_delete_order_detail'), function(result) {
					if (!result || orderDetail.orderDetailKey == null) {
						return;
					}
					OrderDetailFactory.deleteOrderDetail(orderDetail.orderDetailKey, {
						'success': function() {
							OrderFactory.updateOrder(OrderFactory.getOrder(), true);
						}
					});
				});
			};

			$scope.applyOrderUsersToOrderUserSelectChoice = function() {
				for (var i = 0; i < $scope.orderDetails.length; i++) {
					var orderDetail = $scope.orderDetails[i];
					var orderDetailUsers = OrderUserFactory.findOrderUsersByOrderDetailKey(orderDetail.orderDetailKey);
					var selectChoiceDataArray = [];
					for (var j = 0; j < orderDetailUsers.length; j++) {
						var orderDetailUser = orderDetailUsers[j];
						selectChoiceDataArray.push({
							id: orderDetailUser.orderUserKey,
							text: orderDetailUser.orderUserName,
							isPaid: orderDetailUser.isPaid
						});
					}
					var orderUserSelectChoiceContainer = $('#orderDetailKey_' + orderDetail.orderDetailKey + ' .orderUserChoice');
					// don't modify it if equals
					if (ObjectFactory.equals(orderUserSelectChoiceContainer.select2('data'), selectChoiceDataArray, true)) {
						return;
					}
					orderUserSelectChoiceContainer.select2('data', selectChoiceDataArray);
					// mark paid by juery data selector
					RestFactory.functionWrapper(function(selectChoiceDataArray, orderUserSelectChoiceContainer) {
						$timeout(function() {
							$('>.select2-choices>.select2-search-choice', orderUserSelectChoiceContainer).each(function(index) {
								var $orderUserSelectChoiceItem = $(this);
								if (selectChoiceDataArray[index].isPaid) {
									$orderUserSelectChoiceItem.addClass('orderUserPaid');
								} else {
									$orderUserSelectChoiceItem.removeClass('orderUserPaid');
								}
							});
						}, 500);
					})(selectChoiceDataArray, orderUserSelectChoiceContainer);
				}
			};

			/**
			 * lazy init
			 */
			$(document).ready(function() {
				initShopAndOrderOnLoad();
				syncAll();
			});
		} ]);