package com.example.projectbase.service;

import com.example.projectbase.domain.dto.ShopDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationResponseDto;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.dto.response.ShopResponseDto;
import com.example.projectbase.domain.entity.Shop;

public interface ShopService {
    Shop createShop(ShopDto shopDto);

    Shop updateShop(int id, ShopDto shopDto);

    ShopResponseDto getShopById(int id);

    CommonResponseDto deleteShopById(int id);

    PaginationResponseDto<ShopResponseDto> getShops(PaginationFullRequestDto request);
}
