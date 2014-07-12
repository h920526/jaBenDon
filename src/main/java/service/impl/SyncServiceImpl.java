package service.impl;

import model.SyncData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import service.OrderDetailService;
import service.OrderService;
import service.OrderUserService;
import service.ShopService;
import service.SyncService;

@Service
public class SyncServiceImpl implements SyncService {

	@Autowired
	private ShopService shopService;
	@Autowired
	private OrderService orderService;
	@Autowired
	private OrderDetailService orderDetailService;
	@Autowired
	private OrderUserService orderUserService;

	public SyncServiceImpl() {
		super();
	}

	/*
	 * custom service
	 */

	@Override
	public SyncData syncAll(long oldSyncUTCTime) {
		SyncData syncData = new SyncData();
		syncData.setNewlyShops(shopService.findShopsNewerThan(oldSyncUTCTime));
		syncData.setNewlyOrders(orderService
				.findOrdersNewerThan(oldSyncUTCTime));
		syncData.setNewlyOrderDetails(orderDetailService
				.findOrderDetailsNewerThan(oldSyncUTCTime));
		syncData.setNewlyOrderUsers(orderUserService
				.findOrderUsersNewerThan(oldSyncUTCTime));
		return syncData;
	}

}
