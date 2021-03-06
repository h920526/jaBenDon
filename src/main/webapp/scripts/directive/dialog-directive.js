'use strict';

angular.module('app').directive('dialogDirective', [ '$interval', '$timeout', '$translate', 'DateFactory', 'OrderDetailFactory', 'OrderUserFactory', function($interval, $timeout, $translate, DateFactory, OrderDetailFactory, OrderUserFactory) {
	/**
	 * carousel shop
	 */
	function initOrderDialog(scope, element) {
		element.modal({
			'backdrop': false,
			'show': false
		});
		$('.modal-dialog', element).resizable({
			'alsoResize': ".modal-body, #orderDialog"
		});
		element.draggable({
			'handle': ".modal-header",
			'start': scope.dialogDirectiveOndrag
		});
		// event
		element.on('show.bs.modal', scope.dialogDirectiveOnshow);
		element.on('hide.bs.modal', scope.dialogDirectiveOnhide);
	}

	function stopCountDownTimer(element) {
		var countDownTimer = element.data('countDownTimer');
		if (countDownTimer != null) {
			$interval.cancel(countDownTimer);
		}
		element.removeData('countDownTimer');
	}

	function calculateCountDown(deadline) {
		if (deadline == null || deadline === '' || isNaN(deadline)) {
			return 0;
		}
		var nowUtcTime = DateFactory.nowUTCDate().getTime();
		var countDown = Math.round((deadline - nowUtcTime) / 1000);
		return (countDown > 0 ? countDown : 0);
	}

	function startCountDownTimer(element, $scope) {
		stopCountDownTimer(element);
		if ($scope.order == null || $scope.order.orderKey == null) {
			$scope.order.countDown = null;
			return;
		}
		var previousCountDown = 0;
		var countDownTimer = $interval(function() {
			var countDown = $scope.order.countDown = calculateCountDown($scope.order.deadline);
			if (countDown === previousCountDown) {
				return;
			}
			var $modelContent = $('>.modal-dialog>.modal-content', element).removeClass('countDownAlert');
			if (countDown <= 0) {
				$modelContent.addClass('countDownAlert');
				alert($translate.instant('order_time_up'));
			}
			previousCountDown = countDown;
		}, 1000);
		element.data('countDownTimer', countDownTimer);
	}

	function onShowOrderDialog(element, $scope, order) {
		$scope.isOrderDialogVisible = true;
		OrderDetailFactory.reloadOrderDetailsByOrderKey(order.orderKey);
		OrderUserFactory.reloadOrderUsersByOrderKey(order.orderKey, {
			'success': function() {
				$timeout(function() {
					$scope.applyOrderUsersToOrderUserSelectChoice();
				}, 1000);
			}
		});
		startCountDownTimer(element, $scope);
	}

	function onHideOrderDialog(element, $scope) {
		$scope.isOrderDialogVisible = false;
		stopCountDownTimer(element);
	}

	function hideClockPicker() {
		$('.clockpicker').clockpicker('hide');
	}

	/**
	 * directive
	 */
	function registerScopeFunctions(scope, element) {
		var $scope = scope.$parent;
		$scope.initOrderDialog = function() {
			initOrderDialog(scope, element, $scope);
		};
		$scope.onShowOrderDialog = function(order) {
			onShowOrderDialog(element, $scope, order);
		};
		$scope.onHideOrderDialog = function() {
			onHideOrderDialog(element, $scope);
		};
		$scope.hideClockPicker = hideClockPicker;
	}

	return {
		restrict: 'A',
		scope: {
			dialogDirectiveOninit: '&',
			dialogDirectiveOnshow: '&',
			dialogDirectiveOnhide: '&',
			dialogDirectiveOndrag: '&'
		},
		link: function(scope, element) {
			registerScopeFunctions(scope, element);
			scope.dialogDirectiveOninit();
		}
	};
} ]);
