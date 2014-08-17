package service.impl;

import java.util.List;

import model.Shop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import service.ShopService;
import dao.ShopDao;
import factory.DateFactory;

@Service
public class ShopServiceImpl implements ShopService {

	@Autowired
	private ShopDao shopDao;
	@Autowired
	private DateFactory dateFactory;

	public ShopServiceImpl() {
		super();
	}

	@Override
	public Shop createShop(Shop shop) {
		if (shop == null) {
			return null;
		}
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		shop.setCreatedAt(nowUtcTime);
		shop.setModifiedAt(nowUtcTime);
		return shopDao.save(shop);
	}

	@Override
	public Shop findShop(long shopKey) {
		return shopDao.findOne(shopKey);
	}

	@Override
	public List<Shop> findAllShops() {
		return shopDao.findAllShops();
	}

	@Override
	public Shop updateShop(Shop shop) {
		if (shop == null) {
			return null;
		}
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		shop.setModifiedAt(nowUtcTime);
		return shopDao.save(shop);
	}

	public void deleteShop(long shopKey) {
		shopDao.delete(shopKey);
	}

	/*
	 * custom service
	 */

	@Override
	public List<Long> findAllShopKeys() {
		return shopDao.findAllShopKeys();
	}

	@Override
	public void archiveShop(long shopKey) {
		long nowUtcTime = dateFactory.nowUTCDate().getTime();
		shopDao.archiveShop(shopKey, nowUtcTime);
	}

	@Override
	public List<Shop> findShopsNewerThan(long utcTime) {
		return shopDao.findShopsNewerThan(utcTime);
	}

}
