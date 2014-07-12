package service;

import java.util.List;

import model.OrderUser;

public interface OrderUserService {

	public OrderUser createOrderUser(OrderUser orderUser);

	public OrderUser findOrderUser(long orderUserKey);

	public List<OrderUser> findAllOrderUsers();

	public OrderUser updateOrderUser(OrderUser orderUser);

	public void deleteOrderUser(long orderUserKey);

	/*
	 * custom service
	 */

	public void archiveOrderUser(long orderUserKey);

	public List<OrderUser> findOrderUsersByOrderKey(long orderKey);

	public List<OrderUser> findOrderUsersByOrderDetailKey(long orderDetailKey);

	public List<OrderUser> findOrderUsersNewerThan(long utcTime);

	public List<String> findAllOrderUserNames();

}
