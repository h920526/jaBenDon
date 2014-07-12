package controller.rest;

import java.util.List;

import model.OrderUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import service.OrderUserService;

@RestController
public class OrderUserRest {

	@Autowired
	private OrderUserService orderUserService;

	public OrderUserRest() {
		super();
	}

	@RequestMapping(value = "/rest/orderUser", method = RequestMethod.POST)
	public OrderUser createOrderUser(@RequestBody OrderUser orderUser) {
		return orderUserService.createOrderUser(orderUser);
	}

	@RequestMapping(value = "/rest/orderUser/{orderUserKey}", method = RequestMethod.GET)
	public OrderUser findOrderUser(@PathVariable long orderUserKey) {
		return orderUserService.findOrderUser(orderUserKey);
	}

	@RequestMapping(value = "/rest/orderUser", method = RequestMethod.GET)
	public List<OrderUser> findOrderUsers() {
		return orderUserService.findAllOrderUsers();
	}

	@RequestMapping(value = "/rest/orderUser", method = RequestMethod.PUT)
	public OrderUser updateOrderUser(@RequestBody OrderUser orderUser) {
		return orderUserService.updateOrderUser(orderUser);
	}

	@RequestMapping(value = "/rest/orderUser/{orderUserKey}", method = RequestMethod.DELETE)
	public void deleteOrderUser(@PathVariable long orderUserKey) {
		orderUserService.archiveOrderUser(orderUserKey);
	}

	/*
	 * custom service
	 */

	@RequestMapping(value = "/rest/orderUser/orderKey/{orderKey}", method = RequestMethod.GET)
	public List<OrderUser> findOrderUsersByOrderKey(@PathVariable long orderKey) {
		return orderUserService.findOrderUsersByOrderKey(orderKey);
	}

	@RequestMapping(value = "/rest/orderUser/orderDetailKey/{orderDetailKey}", method = RequestMethod.GET)
	public List<OrderUser> findOrderUsersByOrderDetailKey(
			@PathVariable long orderDetailKey) {
		return orderUserService.findOrderUsersByOrderKey(orderDetailKey);
	}

	@RequestMapping(value = "/rest/orderUser/orderUserName", method = RequestMethod.GET)
	public List<String> findAllOrderUserNames() {
		return orderUserService.findAllOrderUserNames();
	}

}
