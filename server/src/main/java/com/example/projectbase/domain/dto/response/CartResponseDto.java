package com.example.projectbase.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartResponseDto extends ProductCartDto {
    private int cartId;

    public CartResponseDto(int cartId, int productId, int shopId, String shopName, String shopAddress, String productName, String productImageUrl, int quantity, int price) {
        super(productId, shopId, shopName, shopAddress, productName, productImageUrl, quantity, price);
        this.cartId = cartId;
    }
}
