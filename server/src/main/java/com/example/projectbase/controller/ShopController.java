package com.example.projectbase.controller;

import com.example.projectbase.base.RestApiV1;
import com.example.projectbase.base.VsResponseUtil;
import com.example.projectbase.constant.UrlConstant;
import com.example.projectbase.domain.dto.ShopDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.service.ShopService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestApiV1
public class ShopController {
    private final ShopService shopService;

    @Operation(summary = "API get shop")
    @GetMapping(UrlConstant.Shop.GET_SHOP)
    public ResponseEntity<?> getShopById(@PathVariable int shopId) {
        return VsResponseUtil.success(shopService.getShopById(shopId));
    }

    @Operation(summary = "API get all shop")
    @GetMapping(UrlConstant.Shop.GET_SHOPS)
    public ResponseEntity<?> getShops(@Valid @ParameterObject PaginationFullRequestDto requestDTO) {
        return VsResponseUtil.success(shopService.getShops(requestDTO));
    }

    @Operation(summary = "API update shop")
    @PutMapping(UrlConstant.Shop.UPDATE_SHOP)
    public ResponseEntity<?> updateShop(@PathVariable int shopId, @Valid @RequestBody ShopDto shopDto) {
        return VsResponseUtil.success(shopService.updateShop(shopId, shopDto));
    }

    @Operation(summary = "API delete shop")
    @DeleteMapping(UrlConstant.Shop.DELETE_SHOP)
    public ResponseEntity<?> deleteShop(@PathVariable int shopId) {
        return VsResponseUtil.success(shopService.deleteShopById(shopId));
    }

}
