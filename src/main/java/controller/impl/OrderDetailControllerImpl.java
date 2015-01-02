package controller.impl;

import java.util.List;

import model.OrderDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import service.OrderDetailService;
import controller.OrderDetailController;

@RestController
public class OrderDetailControllerImpl implements OrderDetailController {

	@Autowired
	private OrderDetailService orderDetailService;

	public OrderDetailControllerImpl() {
		super();
	}

	@RequestMapping(value = "/rest/orderDetail", method = RequestMethod.POST)
	public OrderDetail createOrderDetail(@RequestBody OrderDetail orderDetail) {
		return orderDetailService.createOrderDetail(orderDetail);
	}

	@RequestMapping(value = "/rest/orderDetail/{orderDetailKey}", method = RequestMethod.GET)
	public OrderDetail findOrderDetail(@PathVariable long orderDetailKey) {
		return orderDetailService.findOrderDetail(orderDetailKey);
	}

	@RequestMapping(value = "/rest/orderDetail", method = RequestMethod.GET)
	public List<OrderDetail> findOrderDetails() {
		return orderDetailService.findAllOrderDetails();
	}

	@RequestMapping(value = "/rest/orderDetail", method = RequestMethod.PUT)
	public OrderDetail updateOrderDetail(@RequestBody OrderDetail orderDetail) {
		return orderDetailService.updateOrderDetail(orderDetail);
	}

	@RequestMapping(value = "/rest/orderDetail/{orderDetailKey}", method = RequestMethod.DELETE)
	public void deleteOrderDetail(@PathVariable long orderDetailKey) {
		orderDetailService.archiveOrderDetail(orderDetailKey);
	}

	/*
	 * custom service
	 */

	@RequestMapping(value = "/rest/orderDetail/orderKey/{orderKey}", method = RequestMethod.GET)
	public List<OrderDetail> findOrderDetailsByOrderKey(
			@PathVariable long orderKey) {
		return orderDetailService.findOrderDetailsByOrderKey(orderKey);
	}

	@RequestMapping(value = "/rest/orderDetail/newestDate/shopKey/{shopKey}", method = RequestMethod.GET)
	public List<OrderDetail> findNewestDateOrderDetailsByShopKey(
			@PathVariable long shopKey) {
		return orderDetailService.findNewestDateOrderDetailsByShopKey(shopKey);
	}

	@RequestMapping(value = "/rest/orderDetail/bulk", method = RequestMethod.POST)
	public List<OrderDetail> bulkCreateOrderDetail(
			@RequestBody List<OrderDetail> orderDetails) {
		return orderDetailService.bulkCreateOrderDetail(orderDetails);
	}

}
