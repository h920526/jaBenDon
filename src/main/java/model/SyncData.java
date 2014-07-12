package model;

import java.io.Serializable;
import java.util.List;

public class SyncData implements Serializable {
	private static final long serialVersionUID = 1L;

	private List<Shop> newlyShops;
	private List<Order> newlyOrders;
	private List<OrderDetail> newlyOrderDetails;
	private List<OrderUser> newlyOrderUsers;

	public SyncData() {
		super();
	}

	public List<Shop> getNewlyShops() {
		return newlyShops;
	}

	public void setNewlyShops(List<Shop> newlyShops) {
		this.newlyShops = newlyShops;
	}

	public List<Order> getNewlyOrders() {
		return newlyOrders;
	}

	public void setNewlyOrders(List<Order> newlyOrders) {
		this.newlyOrders = newlyOrders;
	}

	public List<OrderDetail> getNewlyOrderDetails() {
		return newlyOrderDetails;
	}

	public void setNewlyOrderDetails(List<OrderDetail> newlyOrderDetails) {
		this.newlyOrderDetails = newlyOrderDetails;
	}

	public List<OrderUser> getNewlyOrderUsers() {
		return newlyOrderUsers;
	}

	public void setNewlyOrderUsers(List<OrderUser> newlyOrderUsers) {
		this.newlyOrderUsers = newlyOrderUsers;
	}

}
