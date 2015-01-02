package controller;

import java.util.List;

import model.Order;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface OrderController {

	public Order createOrder(@RequestBody Order order);

	public Order findOrder(@PathVariable long orderKey);

	public List<Order> findOrders();

	public Order updateOrder(@RequestBody Order order);

	public void deleteOrder(@PathVariable long orderKey);

	/*
	 * custom service
	 */

	public Order findOrderByOrderAt(@PathVariable long orderAtUtcTime);

}
