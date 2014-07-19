'use strict';

angular.module('app').directive(
	'carouselDirective',
	[
		'ShopFactory',
		'OrderFactory',
		function(ShopFactory, OrderFactory) {
			/**
			 * carousel shop
			 */
			var activingShopIndex = 0;

			function initCarouselShop(scope, element, $scope) {
				var $carousel = element.carousel({
					'interval': false,
					'pause': null
				});
				bindCarouselPlayEvent($carousel, $scope);
				bindCarouselControlEvent($carousel);
				// callback
				$carousel.on('slide.bs.carousel', function(event) {
					scope.carouselDirectiveOnslide({
						'$event': event
					});
				}).on('slid.bs.carousel', function() {
					scope.carouselDirectiveOnslid();
				});
			}

			function bindCarouselPlayEvent($carousel, $scope) {
				$('.carousel-inner', $carousel).click(function(event) {
					event.stopPropagation();
					$scope.pauseCarouselShop();
					var $target = $(event.target);
					// only replace content to editor for activing carousel
					if ($target.not('.carousel-inner>item:has(.mce-tinymce)') && ($target.is('.carousel-inner:has(.item.active), .carousel-shop-content') || $target.parents('.carousel-shop-content').length > 0)) {
						replaceCarouselToEditor($scope);
					}
				});
				$(document).click(function(event) {
					var $target = $(event.target);
					if (!$target.is('a, #carousel-shop, #orderDialog, .clockpicker-popover, .mce-window') && $target.parents('#carousel-shop, #orderDialog, .clockpicker-popover, .mce-window').length <= 0) {
						$scope.playCarouselShop();
					}
				});
			}

			function bindCarouselControlEvent($carousel) {
				$('.carousel-control.left', $carousel).click(function() {
					$carousel.carousel('prev');
				});
				$('.carousel-control.right', $carousel).click(function() {
					$carousel.carousel('next');
				});
			}

			function replaceCarouselToEditor($scope) {
				tinymce.init({
					selector: '.carousel-inner>.active>.carousel-shop-content',
					plugins: [ "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker", "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
						"table contextmenu directionality emoticons template textcolor paste textcolor colorpicker textpattern" ],
					toolbar1: "newdocument | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
					toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
					toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",
					menubar: false,
					toolbar_items_size: 'small',
					height: 225,
					paste_data_images: true,
					setup: function(editor) {
						editor.on('init', function() {
							editor.focus();
						});
						editor.on('blur', function() {
							restoreEditorToCarousel(editor, $scope);
						});
					}
				});
			}

			function restoreEditorToCarousel(carouselEditor, $scope) {
				if (carouselEditor == null) {
					return;
				}
				var shopContent = carouselEditor.getContent();
				var shopIndex = $(carouselEditor.getElement()).parent().index();
				var activedShop = ShopFactory.getShops()[shopIndex];
				if (activedShop == null) {
					return;
				}
				$scope.applyScope(function() {
					activedShop.shopContent = shopContent;
				});
				carouselEditor.destroy();
				ShopFactory.updateShop(activedShop);
			}

			function onSlideCarouselShop(element, $scope, $event) {
				$scope.applyScope(function() {
					$scope.isCarouselSlideStoped = false;
				});
				activingShopIndex = $($event.relatedTarget).index();
				OrderFactory.clearTodayOrder();
				$scope.hideOrderDiaglog(false);
			}

			function onSlidCarouselShop(element, $scope) {
				$scope.applyScope(function() {
					$scope.activedShopIndex = activingShopIndex;
					$scope.isCarouselSlideStoped = true;
				});
			}

			/**
			 * directive
			 */
			function registerScopeFunctions(scope, element) {
				var $scope = scope.$parent;
				$scope.initCarouselShop = function() {
					initCarouselShop(scope, element, $scope);
				};
				$scope.onSlideCarouselShop = function($event) {
					onSlideCarouselShop(element, $scope, $event);
				};
				$scope.onSlidCarouselShop = function() {
					onSlidCarouselShop(element, $scope);
				};
			}

			return {
				restrict: 'A',
				scope: {
					carouselDirective: '&',
					carouselDirectiveOnslide: '&',
					carouselDirectiveOnslid: '&'
				},
				link: function(scope, element, attrs) {
					registerScopeFunctions(scope, element);
					scope.carouselDirective();
				}
			};
		} ]);