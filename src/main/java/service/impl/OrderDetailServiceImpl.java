package service.impl;

import java.util.List;

import model.OrderDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import service.OrderDetailService;
import dao.OrderDetailDao;
import factory.DateFactory;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

	@Autowired
	private OrderDetailDao orderDetailDao;
	@Autowired
	private DateFactory dateFactory;

	public OrderDetailServiceImpl() {
		super();
	}

	@Override
	public OrderDetail createOrderDetail(OrderDetail orderDetail) {
		if (orderDetail == null) {
			return null;
		}
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		orderDetail.setCreatedAt(nowUtcTime);
		orderDetail.setModifiedAt(nowUtcTime);
		return orderDetailDao.save(orderDetail);
	}

	@Override
	public OrderDetail findOrderDetail(long orderDetailKey) {
		return orderDetailDao.findOne(orderDetailKey);
	}

	@Override
	public List<OrderDetail> findAllOrderDetails() {
		return orderDetailDao.findAllOrderDetails();
	}

	@Override
	public OrderDetail updateOrderDetail(OrderDetail orderDetail) {
		if (orderDetail == null) {
			return null;
		}
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		orderDetail.setModifiedAt(nowUtcTime);
		return orderDetailDao.save(orderDetail);
	}

	@Override
	public void deleteOrderDetail(long orderDetailKey) {
		orderDetailDao.delete(orderDetailKey);
	}

	/*
	 * custom service
	 */

	@Override
	public void archiveOrderDetail(long orderDetailKey) {
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		orderDetailDao.archiveOrderDetail(orderDetailKey, nowUtcTime);
	}

	@Override
	public List<OrderDetail> findOrderDetailsByOrderKey(long orderKey) {
		return orderDetailDao.findOrderDetailsByOrderKey(orderKey);
	}

	@Override
	public List<OrderDetail> findOrderDetailsNewerThan(long utcTime) {
		return orderDetailDao.findOrderDetailsNewerThan(utcTime);
	}

	@Override
	public List<OrderDetail> findNewestDateOrderDetailsByShopKey(long shopKey) {
		return orderDetailDao.findNewestDateOrderDetailsByShopKey(shopKey);
	}

	@Override
	public List<OrderDetail> bulkCreateOrderDetail(
			List<OrderDetail> orderDetails) {
		if (orderDetails == null || orderDetails.isEmpty()) {
			return orderDetails;
		}
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		for (int i = 0; i < orderDetails.size(); i++) {
			OrderDetail orderDetail = orderDetails.get(i);
			orderDetail.setCreatedAt(nowUtcTime);
			orderDetail.setModifiedAt(nowUtcTime);
			orderDetails.set(i, orderDetailDao.save(orderDetail));
		}
		return orderDetails;
	}

}
