package controller;

import java.util.List;

import model.Shop;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface ShopController {

	public Shop createShop(@RequestBody Shop shop);

	public Shop findShop(@PathVariable long shopKey);

	public List<Shop> findShops();

	public Shop updateShop(@RequestBody Shop shop);

	public void deleteShop(@PathVariable long shopKey);

	/*
	 * custom service
	 */

	public List<Long> findShopKeys();

}
