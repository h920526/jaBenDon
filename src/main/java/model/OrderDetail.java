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
@Table(name = "`order_detail`")
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderDetail implements Serializable {
	private static final long serialVersionUID = 1;

	@Id
	@GeneratedValue
	@Column(name = "`order_detail_key`")
	private Long orderDetailKey;

	@OneToOne
	@JoinColumn(name = "`order_key`")
	@Index(name = "order_key_idx")
	private Order order;

	@Column(name = "`meal_name`")
	private String mealName;

	@Column(name = "`meal_price`")
	private Integer mealPrice;

	@Column(name = "`created_at`")
	private Long createdAt;

	@Column(name = "`modified_at`")
	@Index(name = "modified_at_idx")
	private Long modifiedAt;

	@Column(name = "`is_archived`")
	@Index(name = "is_archived_idx")
	private boolean isArchived;

	public OrderDetail() {
		super();
	}

	public Long getOrderDetailKey() {
		return orderDetailKey;
	}

	public void setOrderDetailKey(Long orderDetailKey) {
		this.orderDetailKey = orderDetailKey;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public String getMealName() {
		return mealName;
	}

	public void setMealName(String mealName) {
		this.mealName = mealName;
	}

	public Integer getMealPrice() {
		return mealPrice;
	}

	public void setMealPrice(Integer mealPrice) {
		this.mealPrice = mealPrice;
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
