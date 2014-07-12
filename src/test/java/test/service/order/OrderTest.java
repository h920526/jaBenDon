package test.service.order;

import java.util.List;

import model.Order;
import model.Shop;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import service.OrderService;
import service.ShopService;
import test.base.BaseTestCase;

@ContextConfiguration({ "../shop/shop.xml", "order.xml" })
public class OrderTest extends BaseTestCase {

	@Autowired
	private ShopService shopService;
	@Autowired
	private OrderService orderService;

	@Autowired
	private Shop shopToAdd;
	@Autowired
	private Order orderToAdd;

	@Before
	public void setup() {
		shopToAdd = shopService.createShop(shopToAdd);
		orderToAdd.setShop(shopToAdd);
		orderToAdd = orderService.createOrder(orderToAdd);
	}

	@After
	public void after() {
		shopService.archiveShop(shopToAdd.getShopKey());
		orderService.archiveOrder(orderToAdd.getOrderKey());
	}

	@Test
	public void testCreateOrder() {
		Assert.assertTrue(orderToAdd.getOrderKey() > 0);
		Assert.assertNotNull(orderToAdd.getShop());
		Assert.assertTrue(orderToAdd.getShop().getShopKey() == shopToAdd
				.getShopKey());
	}

	@Test
	public void testFindOrder() {
		Order order = orderService.findOrder(orderToAdd.getOrderKey());
		Assert.assertNotNull(order.getShop());
		Assert.assertTrue(order.getShop().getShopKey() == shopToAdd
				.getShopKey());
	}

	@Test
	public void testFindOrders() {
		List<Order> orders = orderService.findAllOrders();
		Assert.assertTrue(!orders.isEmpty());
	}

}
