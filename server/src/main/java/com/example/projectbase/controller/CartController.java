package com.example.projectbase.controller;

import com.example.projectbase.base.RestApiV1;
import com.example.projectbase.base.VsResponseUtil;
import com.example.projectbase.constant.UrlConstant;
import com.example.projectbase.domain.dto.CartDetailDto;
import com.example.projectbase.service.CartDetailService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestApiV1
public class CartController {
    private final CartDetailService cartDetailService;

    @Operation(summary = "API add product to cart")
    @PostMapping(UrlConstant.Cart.ADD_PRODUCT_TO_CART)
    public ResponseEntity<?> addProductToCart(@Valid @PathVariable int cartId, @RequestParam int productId, @RequestParam int quality, @RequestParam int shopId) {
        return VsResponseUtil.success(cartDetailService.addProductToCart(new CartDetailDto(productId, 0, cartId, quality), shopId));
    }

    @Operation(summary = "API get cart info")
    @GetMapping(UrlConstant.Cart.GET_CART_INFO)
    public ResponseEntity<?> getCartInfo(@Valid @PathVariable int cartId) {
        return VsResponseUtil.success(cartDetailService.getCartInfo(cartId));
    }

    @Operation(summary = "API update cart info")
    @PutMapping(UrlConstant.Cart.UPDATE_CART_INFO)
    public ResponseEntity<?> updateCartInfo(@Valid @PathVariable int cartId, @PathVariable int productId, @RequestParam int quantity, @RequestParam int shopId) {
        return VsResponseUtil.success(cartDetailService.updateCartInfo(new CartDetailDto(productId, 0, cartId, quantity), shopId));
    }

    @Operation(summary = "API delete cart info")
    @DeleteMapping(UrlConstant.Cart.DELETE_CART_INFO)
    public ResponseEntity<?> deleteCartInfo(@Valid @PathVariable int cartId) {
        return VsResponseUtil.success(cartDetailService.deleteCartInfo(cartId));
    }
}
