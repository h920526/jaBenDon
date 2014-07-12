package service;

import java.util.List;

import model.Order;

public interface OrderService {

	public Order createOrder(Order order);

	public Order findOrder(long orderKey);

	public List<Order> findAllOrders();

	public Order updateOrder(Order order);

	public void deleteOrder(long orderKey);

	/*
	 * custom service
	 */

	public void archiveOrder(long orderKey);

	public List<Order> findOrdersNewerThan(long utcTime);

	public Order findOrderByOrderAt(long orderAtUtcTime);

}
