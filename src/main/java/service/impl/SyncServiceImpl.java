package service.impl;

import model.SyncData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import service.OrderDetailService;
import service.OrderService;
import service.OrderUserService;
import service.ShopService;
import service.SyncService;
import factory.DateFactory;

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
	@Autowired
	private DateFactory dateFactory;

	public SyncServiceImpl() {
		super();
	}

	/*
	 * custom service
	 */

	@Override
	public SyncData syncAll(long oldSyncUTCTime) {
		SyncData syncData = new SyncData();
		if (oldSyncUTCTime > 0) {
			// max loop 50 times to terminal this thread
			for (int i = 0; i < 50; i++) {
				syncData.setNewlyShops(shopService
						.findShopsNewerThan(oldSyncUTCTime));
				syncData.setNewlyOrders(orderService
						.findOrdersNewerThan(oldSyncUTCTime));
				syncData.setNewlyOrderDetails(orderDetailService
						.findOrderDetailsNewerThan(oldSyncUTCTime));
				syncData.setNewlyOrderUsers(orderUserService
						.findOrderUsersNewerThan(oldSyncUTCTime));
				if (syncData.hasNewlyData()) {
					break;
				}
				// hang this thread to decrease request times
				try {
					Thread.sleep(5000);
				} catch (InterruptedException e) {
				}
			}
		}
		syncData.setLastSyncTime(dateFactory.nowUTCDate().getTime());
		return syncData;
	}

}
