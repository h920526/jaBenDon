package service;

import java.util.List;

import model.OrderDetail;

public interface OrderDetailService {

	public OrderDetail createOrderDetail(OrderDetail orderDetail);

	public OrderDetail findOrderDetail(long orderDetailKey);

	public List<OrderDetail> findAllOrderDetails();

	public OrderDetail updateOrderDetail(OrderDetail orderDetail);

	public void deleteOrderDetail(long orderDetailKey);

	/*
	 * custom service
	 */

	public void archiveOrderDetail(long orderDetailKey);

	public List<OrderDetail> findOrderDetailsByOrderKey(long orderKey);

	public List<OrderDetail> findOrderDetailsNewerThan(long utcTime);

	public List<OrderDetail> findNewestDateOrderDetailsByShopKey(long shopKey);

	public List<OrderDetail> bulkCreateOrderDetail(List<OrderDetail> orderDetail);

}
