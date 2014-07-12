package test.service.orderdetail;

import java.util.List;

import model.Order;
import model.OrderDetail;
import model.Shop;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import service.OrderDetailService;
import service.OrderService;
import service.ShopService;
import test.base.BaseTestCase;

@ContextConfiguration({ "../shop/shop.xml", "../order/order.xml",
		"order-detail.xml" })
public class OrderDetailTest extends BaseTestCase {

	@Autowired
	private ShopService shopService;
	@Autowired
	private OrderService orderService;
	@Autowired
	private OrderDetailService orderDetailService;

	@Autowired
	private Shop shopToAdd;
	@Autowired
	private Order orderToAdd;
	@Autowired
	private OrderDetail orderDetailToAdd;

	@Before
	public void setup() {
		shopToAdd = shopService.createShop(shopToAdd);
		orderToAdd.setShop(shopToAdd);
		orderToAdd = orderService.createOrder(orderToAdd);
		orderDetailToAdd.setOrder(orderToAdd);
		orderDetailToAdd = orderDetailService
				.createOrderDetail(orderDetailToAdd);
	}

	@After
	public void after() {
		shopService.archiveShop(shopToAdd.getShopKey());
		orderService.archiveOrder(orderToAdd.getOrderKey());
		orderDetailService.archiveOrderDetail(orderDetailToAdd
				.getOrderDetailKey());
	}

	@Test
	public void testCreateOrderDetail() {
		Assert.assertTrue(orderDetailToAdd.getOrderDetailKey() > 0);
		Assert.assertNotNull(orderDetailToAdd.getOrder());
		Assert.assertNotNull(orderDetailToAdd.getOrder().getShop());
		Assert.assertTrue(orderDetailToAdd.getOrder().getOrderKey() == orderToAdd
				.getOrderKey());
		Assert.assertTrue(orderDetailToAdd.getOrder().getShop().getShopKey() == shopToAdd
				.getShopKey());
	}

	@Test
	public void testFindOrder() {
		OrderDetail orderDetail = orderDetailService
				.findOrderDetail(orderDetailToAdd.getOrderDetailKey());
		Assert.assertNotNull(orderDetail.getOrder());
		Assert.assertNotNull(orderDetail.getOrder().getShop());
		Assert.assertTrue(orderDetailToAdd.getOrder().getOrderKey() == orderToAdd
				.getOrderKey());
		Assert.assertTrue(orderDetailToAdd.getOrder().getShop().getShopKey() == shopToAdd
				.getShopKey());
	}

	@Test
	public void testFindOrders() {
		List<OrderDetail> orderDetails = orderDetailService
				.findAllOrderDetails();
		Assert.assertTrue(!orderDetails.isEmpty());
	}

	@Test
	public void testFindNewestDateOrderDetailsByShopKey() {
		Order newOrder = new Order();
		newOrder.setShop(shopToAdd);
		newOrder.setOrderAt(orderToAdd.getOrderAt() + 24 * 60 * 60 * 1000);
		newOrder = orderService.createOrder(newOrder);

		OrderDetail newOrderDetail = new OrderDetail();
		newOrderDetail.setOrder(newOrder);
		newOrderDetail = orderDetailService.createOrderDetail(newOrderDetail);

		System.out.println(orderDetailToAdd.getOrder().getOrderKey());
		System.out.println(orderDetailToAdd.getOrder().getOrderAt());
		System.out.println(orderDetailToAdd.getOrder().getShop().getShopKey());
		System.out.println("=-------------------------------");
		System.out.println(newOrderDetail.getOrder().getOrderKey());
		System.out.println(newOrderDetail.getOrder().getOrderAt());
		System.out.println(newOrderDetail.getOrder().getShop().getShopKey());

		List<OrderDetail> orderDetails = orderDetailService
				.findNewestDateOrderDetailsByShopKey(shopToAdd.getShopKey());
		Assert.assertEquals(1, orderDetails.size());
	}

}
