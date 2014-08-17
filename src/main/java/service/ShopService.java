package service;

import java.util.List;

import model.Shop;

public interface ShopService {

	public Shop createShop(Shop shop);

	public Shop findShop(long shopKey);

	public List<Shop> findAllShops();

	public Shop updateShop(Shop shop);

	public void deleteShop(long shopKey);

	/*
	 * custom service
	 */

	public List<Long> findAllShopKeys();

	public void archiveShop(long shopKey);

	public List<Shop> findShopsNewerThan(long utcTime);

}
