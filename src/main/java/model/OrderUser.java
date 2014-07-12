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
@Table(name = "`order_user`")
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderUser implements Serializable {
	private static final long serialVersionUID = 1;

	@Id
	@GeneratedValue
	@Column(name = "`order_user_key`")
	private Long orderUserKey;

	@OneToOne
	@JoinColumn(name = "`order_detail_key`")
	private OrderDetail orderDetail;

	@Column(name = "`order_user_name`")
	@Index(name = "order_user_name_idx")
	private String orderUserName;

	@Column(name = "`is_paid`")
	private Boolean isPaid;

	@Column(name = "`created_at`")
	private Long createdAt;

	@Column(name = "`modified_at`")
	@Index(name = "modified_at_idx")
	private Long modifiedAt;

	@Column(name = "`is_archived`")
	@Index(name = "is_archived_idx")
	private boolean isArchived;

	public OrderUser() {
		super();
	}

	public Long getOrderUserKey() {
		return orderUserKey;
	}

	public void setOrderUserKey(Long orderUserKey) {
		this.orderUserKey = orderUserKey;
	}

	public OrderDetail getOrderDetail() {
		return orderDetail;
	}

	public void setOrderDetail(OrderDetail orderDetail) {
		this.orderDetail = orderDetail;
	}

	public String getOrderUserName() {
		return orderUserName;
	}

	public void setOrderUserName(String orderUserName) {
		this.orderUserName = orderUserName;
	}

	public Boolean getIsPaid() {
		return isPaid;
	}

	public void setIsPaid(Boolean isPaid) {
		this.isPaid = isPaid;
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

}
