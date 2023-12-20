package com.example.projectbase.domain.dto.response;

import com.example.projectbase.constant.CommonConstant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FindProductResponseDto {
    private int productId;

    private String productName;

    private String productImageUrl;

    private String productDescription;

    private int productPrice;

    private int productStock;

    private int categoryId;

    private String categoryName;

    private int shopId;

    private String shopName;

    private String shopAddress;

    private String shopTimeClose;

    private String shopTimeOpen;

    private String shopHotline;

    public FindProductResponseDto(int productId, String productName, String productImageUrl, int productPrice, int productStock, int categoryId, String categoryName, int shopId, String shopName, String shopAddress, Date shopTimeClose, Date shopTimeOpen, String shopHotline) {
        this.productId = productId;
        this.productName = productName;
        this.productImageUrl = productImageUrl;
        this.productPrice = productPrice;
        this.productStock = productStock;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.shopId = shopId;
        this.shopName = shopName;
        this.shopAddress = shopAddress;

        SimpleDateFormat timeFormat = new SimpleDateFormat(CommonConstant.PATTERN_TIME);
        this.shopTimeClose = timeFormat.format(shopTimeClose);
        this.shopTimeOpen = timeFormat.format(shopTimeOpen);
        this.shopHotline = shopHotline;
    }

    public FindProductResponseDto(int productId, String productName, String productImageUrl, int productPrice, int productStock, String productDescription,int shopId,String shopName) {
        this.productId=productId;
        this.productName = productName;
        this.productImageUrl = productImageUrl;
        this.productPrice = productPrice;
        this.productStock = productStock;
        this.productDescription = productDescription;
        this.shopId=shopId;
        this.shopName=shopName;
    }
}
