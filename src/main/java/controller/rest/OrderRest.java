package controller.rest;

import java.util.List;

import model.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import service.OrderService;

@RestController
public class OrderRest {

	@Autowired
	private OrderService orderService;

	public OrderRest() {
		super();
	}

	@RequestMapping(value = "/rest/order", method = RequestMethod.POST)
	public Order createOrder(@RequestBody Order order) {
		return orderService.createOrder(order);
	}

	@RequestMapping(value = "/rest/order/{orderKey}", method = RequestMethod.GET)
	public Order findOrder(@PathVariable long orderKey) {
		return orderService.findOrder(orderKey);
	}

	@RequestMapping(value = "/rest/order", method = RequestMethod.GET)
	public List<Order> findOrders() {
		return orderService.findAllOrders();
	}

	@RequestMapping(value = "/rest/order", method = RequestMethod.PUT)
	public Order updateOrder(@RequestBody Order order) {
		return orderService.updateOrder(order);
	}

	@RequestMapping(value = "/rest/order/{orderKey}", method = RequestMethod.DELETE)
	public void deleteOrder(@PathVariable long orderKey) {
		orderService.archiveOrder(orderKey);
	}

	/*
	 * custom service
	 */

	@RequestMapping(value = "/rest/order/orderAt/{orderAtUtcTime}", method = RequestMethod.GET)
	public Order findOrderByOrderAt(@PathVariable long orderAtUtcTime) {
		return orderService.findOrderByOrderAt(orderAtUtcTime);
	}

}
