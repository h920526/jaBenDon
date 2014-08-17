package dao;

import java.util.List;

import model.Shop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ShopDao extends JpaRepository<Shop, Long> {

	@Query("SELECT s FROM Shop s WHERE s.isArchived = false")
	public List<Shop> findAllShops();

	@Query("SELECT s.shopKey FROM Shop s WHERE s.isArchived = false")
	public List<Long> findAllShopKeys();

	@Modifying
	@Transactional
	@Query("UPDATE Shop s SET s.isArchived = true, s.modifiedAt = :modifiedAtUtcTime WHERE s.shopKey = :shopKey")
	public void archiveShop(@Param("shopKey") long shopKey,
			@Param("modifiedAtUtcTime") long modifiedAtUtcTime);

	@Query("SELECT s FROM Shop s WHERE s.modifiedAt >= :utcTime")
	public List<Shop> findShopsNewerThan(@Param("utcTime") long utcTime);

}
