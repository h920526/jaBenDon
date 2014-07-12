package dao;

import java.util.List;

import model.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface OrderDao extends JpaRepository<Order, Long> {

	@Query("SELECT o FROM Order o LEFT JOIN o.shop s WHERE o.isArchived = false")
	public List<Order> findAllOrders();

	@Modifying
	@Transactional
	@Query("UPDATE Order o SET o.isArchived = true, o.modifiedAt = :modifiedAtUtcTime WHERE o.orderKey = :orderKey")
	public void archiveOrder(@Param("orderKey") long orderKey,
			@Param("modifiedAtUtcTime") long modifiedAtUtcTime);

	@Query("SELECT o FROM Order o LEFT JOIN o.shop s WHERE o.modifiedAt >= :utcTime")
	public List<Order> findOrdersNewerThan(@Param("utcTime") long utcTime);

	@Query("SELECT o FROM Order o LEFT JOIN o.shop s WHERE o.isArchived = false AND o.orderAt = :orderAtUtcTime")
	public Order findOrderByOrderAt(@Param("orderAtUtcTime") long orderAtUtcTime);

}
