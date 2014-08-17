package service.impl;

import java.util.List;

import model.OrderUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import service.OrderUserService;
import dao.OrderUserDao;
import factory.DateFactory;

@Service
public class OrderUserServiceImpl implements OrderUserService {

	@Autowired
	private OrderUserDao orderUserDao;
	@Autowired
	private DateFactory dateFactory;

	public OrderUserServiceImpl() {
		super();
	}

	@Override
	public OrderUser createOrderUser(OrderUser orderUser) {
		if (orderUser == null) {
			return null;
		}
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		orderUser.setCreatedAt(nowUtcTime);
		orderUser.setModifiedAt(nowUtcTime);
		return orderUserDao.save(orderUser);
	}

	@Override
	public OrderUser findOrderUser(long orderUserKey) {
		return orderUserDao.findOne(orderUserKey);
	}

	@Override
	public List<OrderUser> findAllOrderUsers() {
		return orderUserDao.findAllOrderUsers();
	}

	@Override
	public OrderUser updateOrderUser(OrderUser orderUser) {
		if (orderUser == null) {
			return null;
		}
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		orderUser.setModifiedAt(nowUtcTime);
		return orderUserDao.save(orderUser);
	}

	@Override
	public void deleteOrderUser(long orderUserKey) {
		orderUserDao.delete(orderUserKey);
	}

	/*
	 * custom service
	 */

	@Override
	public void archiveOrderUser(long orderUserKey) {
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		orderUserDao.archiveOrderUser(orderUserKey, nowUtcTime);
	}

	@Override
	public List<OrderUser> findOrderUsersByOrderKey(long orderKey) {
		return orderUserDao.findOrderUsersByOrderKey(orderKey);
	}

	@Override
	public List<OrderUser> findOrderUsersNewerThan(long utcTime) {
		return orderUserDao.findOrderUsersNewerThan(utcTime);
	}

	@Override
	public List<String> findAllOrderUserNames() {
		return orderUserDao.findAllOrderUserNames();
	}

}
