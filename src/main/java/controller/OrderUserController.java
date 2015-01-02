package controller;

import java.util.List;

import model.OrderUser;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface OrderUserController {

	public OrderUser createOrderUser(@RequestBody OrderUser orderUser);

	public OrderUser findOrderUser(@PathVariable long orderUserKey);

	public List<OrderUser> findOrderUsers();

	public OrderUser updateOrderUser(@RequestBody OrderUser orderUser);

	public void deleteOrderUser(@PathVariable long orderUserKey);

	/*
	 * custom service
	 */

	public List<OrderUser> findOrderUsersByOrderKey(@PathVariable long orderKey);

	public List<String> findAllOrderUserNames();

}
