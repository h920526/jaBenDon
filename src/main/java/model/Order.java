package model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.hibernate.annotations.Index;

@Entity
@Table(name = "`order`")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Order implements Serializable {
	private static final long serialVersionUID = 1;

	@Id
	@GeneratedValue
	@Column(name = "`order_key`")
	private Long orderKey;

	@Column(name = "`order_at`")
	@Index(name = "order_at_idx")
	private Long orderAt;

	@OneToOne
	@JoinColumn(name = "`shop_key`")
	@Index(name = "shop_key_idx")
	private Shop shop;

	@Column(name = "`total_price`")
	private Integer totalPrice;

	@Column(name = "`total_amount`")
	private Integer totalAmount;

	@Column(name = "`order_note`", length = 1024)
	private String orderNote;

	@Column(name = "`deadline`")
	private Long deadline;

	@Column(name = "`owner`")
	private String owner;

	@Column(name = "`created_at`")
	private Long createdAt;

	@Column(name = "`modified_at`")
	@Index(name = "modified_at_idx")
	private Long modifiedAt;

	@Column(name = "`is_archived`")
	@Index(name = "is_archived_idx")
	private boolean isArchived;

	public Order() {
		super();
	}

	public Long getOrderKey() {
		return orderKey;
	}

	public void setOrderKey(Long orderKey) {
		this.orderKey = orderKey;
	}

	public Long getOrderAt() {
		return orderAt;
	}

	public void setOrderAt(Long orderAt) {
		this.orderAt = orderAt;
	}

	public Integer getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Integer totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Integer getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Integer totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getOrderNote() {
		return orderNote;
	}

	public void setOrderNote(String orderNote) {
		this.orderNote = orderNote;
	}

	public Long getDeadline() {
		return deadline;
	}

	public void setDeadline(Long deadline) {
		this.deadline = deadline;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public Long getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Long createdAt) {
		this.createdAt = createdAt;
	}

	public Long getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(Long modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public boolean isArchived() {
		return isArchived;
	}

	public void setArchived(boolean isArchived) {
		this.isArchived = isArchived;
	}

	public Shop getShop() {
		return shop;
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}

}
