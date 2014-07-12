package dao;

import java.util.List;

import model.OrderDetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OrderDetailDao extends JpaRepository<OrderDetail, Long> {

	@Query("SELECT od FROM OrderDetail od WHERE od.isArchived = false")
	public List<OrderDetail> findAllOrderDetails();

	@Modifying
	@Transactional
	@Query("UPDATE OrderDetail od SET od.isArchived = true, od.modifiedAt = :modifiedAtUtcTime WHERE od.orderDetailKey = :orderDetailKey")
	public void archiveOrderDetail(
			@Param("orderDetailKey") long orderDetailKey,
			@Param("modifiedAtUtcTime") long modifiedAtUtcTime);

	@Query("SELECT od FROM OrderDetail od WHERE od.isArchived = false AND od.order.orderKey = :orderKey")
	public List<OrderDetail> findOrderDetailsByOrderKey(
			@Param("orderKey") long orderKey);

	@Query("SELECT od FROM OrderDetail od WHERE od.modifiedAt >= :utcTime")
	public List<OrderDetail> findOrderDetailsNewerThan(
			@Param("utcTime") long utcTime);

	@Query("SELECT od FROM OrderDetail od WHERE od.isArchived = false AND od.order.shop.shopKey = :shopKey AND od.order.orderAt = (SELECT MAX(o.orderAt) FROM Order o WHERE o.isArchived = false AND o.shop.shopKey = :shopKey)")
	public List<OrderDetail> findNewestDateOrderDetailsByShopKey(
			@Param("shopKey") long shopKey);

}
