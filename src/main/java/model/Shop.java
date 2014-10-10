package model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@Entity
@Table(name = "`shop`")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Shop implements Serializable {
	private static final long serialVersionUID = 1;

	@Id
	@GeneratedValue
	@Column(name = "`shop_key`")
	private Long shopKey;

	@Column(name = "`shop_title`", length = 1024)
	private String shopTitle;

	@Column(name = "`shop_content`")
	@Lob
	@Transient
	private String shopContent;

	@Column(name = "`shop_phone`")
	private String shopPhone;

	@Column(name = "`shop_note`", length = 1024)
	private String shopNote;

	@Column(name = "`created_at`")
	private Long createdAt;

	@Column(name = "`modified_at`")
	private Long modifiedAt;

	@Column(name = "`is_archived`")
	@NotNull
	private boolean isArchived;

	public Shop() {
		super();
	}

	public Long getShopKey() {
		return shopKey;
	}

	public void setShopKey(Long shopKey) {
		this.shopKey = shopKey;
	}

	public String getShopTitle() {
		return shopTitle;
	}

	public void setShopTitle(String shopTitle) {
		this.shopTitle = shopTitle;
	}

	public String getShopContent() {
		return shopContent;
	}

	public void setShopContent(String shopContent) {
		this.shopContent = shopContent;
	}

	public String getShopPhone() {
		return shopPhone;
	}

	public void setShopPhone(String shopPhone) {
		this.shopPhone = shopPhone;
	}

	public String getShopNote() {
		return shopNote;
	}

	public void setShopNote(String shopNote) {
		this.shopNote = shopNote;
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
