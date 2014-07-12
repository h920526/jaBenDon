package dao;

import java.util.List;

import model.OrderUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OrderUserDao extends JpaRepository<OrderUser, Long> {

	@Query("SELECT ou FROM OrderUser ou WHERE ou.isArchived = false")
	public List<OrderUser> findAllOrderUsers();

	@Modifying
	@Transactional
	@Query("UPDATE OrderUser ou SET ou.isArchived = true, ou.modifiedAt = :modifiedAtUtcTime WHERE ou.orderUserKey = :orderUserKey")
	public void archiveOrderUser(@Param("orderUserKey") long orderUserKey,
			@Param("modifiedAtUtcTime") long modifiedAtUtcTime);

	@Query("SELECT ou FROM OrderUser ou WHERE ou.isArchived = false AND ou.orderDetail.isArchived = false AND ou.orderDetail.order.orderKey = :orderKey")
	public List<OrderUser> findOrderUsersByOrderKey(
			@Param("orderKey") long orderKey);

	@Query("SELECT ou FROM OrderUser ou WHERE ou.isArchived = false AND ou.orderDetail.orderDetailKey = :orderDetailKey")
	public List<OrderUser> findOrderUsersByOrderDetailKey(
			@Param("orderDetailKey") long orderDetailKey);

	@Query("SELECT ou FROM OrderUser ou WHERE ou.modifiedAt >= :utcTime")
	public List<OrderUser> findOrderUsersNewerThan(
			@Param("utcTime") long utcTime);

	@Query("SELECT DISTINCT ou.orderUserName FROM OrderUser ou WHERE ou.isArchived = false")
	public List<String> findAllOrderUserNames();

}
