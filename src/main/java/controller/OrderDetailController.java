package controller;

import java.util.List;

import model.OrderDetail;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface OrderDetailController {

	public OrderDetail createOrderDetail(@RequestBody OrderDetail orderDetail);

	public OrderDetail findOrderDetail(@PathVariable long orderDetailKey);

	public List<OrderDetail> findOrderDetails();

	public OrderDetail updateOrderDetail(@RequestBody OrderDetail orderDetail);

	public void deleteOrderDetail(@PathVariable long orderDetailKey);

	/*
	 * custom service
	 */

	public List<OrderDetail> findOrderDetailsByOrderKey(
			@PathVariable long orderKey);

	public List<OrderDetail> findNewestDateOrderDetailsByShopKey(
			@PathVariable long shopKey);

	public List<OrderDetail> bulkCreateOrderDetail(
			@RequestBody List<OrderDetail> orderDetails);

}
