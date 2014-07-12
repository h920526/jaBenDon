package service.impl;

import java.util.List;

import model.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import service.OrderService;
import dao.OrderDao;
import factory.DateFactory;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderDao orderDao;
	@Autowired
	private DateFactory dateFactory;

	public OrderServiceImpl() {
		super();
	}

	@Override
	public Order createOrder(Order order) {
		if (order == null) {
			return null;
		}
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		order.setCreatedAt(nowUtcTime);
		order.setModifiedAt(nowUtcTime);
		return orderDao.save(order);
	}

	@Override
	public Order findOrder(long orderKey) {
		return orderDao.findOne(orderKey);
	}

	@Override
	public List<Order> findAllOrders() {
		return orderDao.findAllOrders();
	}

	@Override
	public Order updateOrder(Order order) {
		if (order == null) {
			return null;
		}
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		order.setModifiedAt(nowUtcTime);
		return orderDao.save(order);
	}

	@Override
	public void deleteOrder(long orderKey) {
		orderDao.delete(orderKey);
	}

	/*
	 * custom service
	 */

	@Override
	public void archiveOrder(long orderKey) {
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		orderDao.archiveOrder(orderKey, nowUtcTime);
	}

	@Override
	public List<Order> findOrdersNewerThan(long utcTime) {
		return orderDao.findOrdersNewerThan(utcTime);
	}

	@Override
	public Order findOrderByOrderAt(long orderAtUtcTime) {
		return orderDao.findOrderByOrderAt(orderAtUtcTime);
	}

}
