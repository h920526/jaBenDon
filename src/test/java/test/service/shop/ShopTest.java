package test.service.shop;

import java.util.List;

import model.Shop;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import service.ShopService;
import test.base.BaseTestCase;

@ContextConfiguration({ "shop.xml" })
public class ShopTest extends BaseTestCase {

	@Autowired
	private ShopService shopService;

	@Autowired
	private Shop shopToAdd;

	@Before
	public void setup() {
		shopToAdd = shopService.createShop(shopToAdd);
	}

	@After
	public void after() {
		shopService.archiveShop(shopToAdd.getShopKey());
	}

	@Test
	public void testCreateShop() {
		Assert.assertTrue(shopToAdd.getShopKey() > 0);
	}

	@Test
	public void testFindShop() {
		Shop shop = shopService.findShop(shopToAdd.getShopKey());
		Assert.assertNotNull(shop);
		Assert.assertTrue(shop.getShopKey() == shopToAdd.getShopKey());
	}

	@Test
	public void testFindShops() {
		List<Shop> shops = shopService.findAllShops();
		Assert.assertTrue(!shops.isEmpty());
	}

}
