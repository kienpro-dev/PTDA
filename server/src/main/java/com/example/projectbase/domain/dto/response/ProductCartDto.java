package com.example.projectbase.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCartDto {
    private int productId;

    private int shopId;

    private String shopName;

    private String shopAddress;

    private String productName;

    private String productImageUrl;

    private int quantity;

    private int price;

}
