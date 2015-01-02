package controller.impl;

import java.util.List;

import model.Shop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import service.ShopService;
import controller.ShopController;

@RestController
public class ShopControllerImpl implements ShopController {

	@Autowired
	private ShopService shopService;

	public ShopControllerImpl() {
		super();
	}

	@RequestMapping(value = "rest/shop", method = RequestMethod.POST)
	public Shop createShop(@RequestBody Shop shop) {
		return shopService.createShop(shop);
	}

	@RequestMapping(value = "rest/shop/{shopKey}", method = RequestMethod.GET)
	public Shop findShop(@PathVariable long shopKey) {
		return shopService.findShop(shopKey);
	}

	@RequestMapping(value = "rest/shop", method = RequestMethod.GET)
	public List<Shop> findShops() {
		return shopService.findAllShops();
	}

	@RequestMapping(value = "rest/shop", method = RequestMethod.PUT)
	public Shop updateShop(@RequestBody Shop shop) {
		return shopService.updateShop(shop);
	}

	@RequestMapping(value = "rest/shop/{shopKey}", method = RequestMethod.DELETE)
	public void deleteShop(@PathVariable long shopKey) {
		shopService.archiveShop(shopKey);
	}

	/*
	 * custom service
	 */

	@RequestMapping(value = "rest/shop/shopKey", method = RequestMethod.GET)
	public List<Long> findShopKeys() {
		return shopService.findAllShopKeys();
	}

}
