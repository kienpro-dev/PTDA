package com.example.projectbase.service.impl;

import com.example.projectbase.constant.CommonConstant;
import com.example.projectbase.constant.ErrorMessage;
import com.example.projectbase.constant.SortByDataConstant;
import com.example.projectbase.constant.SuccessMessage;
import com.example.projectbase.domain.dto.ShopDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationResponseDto;
import com.example.projectbase.domain.dto.pagination.PagingMeta;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.dto.response.ShopResponseDto;
import com.example.projectbase.domain.entity.Shop;
import com.example.projectbase.domain.mapper.ShopMapper;
import com.example.projectbase.exception.NotFoundException;
import com.example.projectbase.repository.ShopRepository;
import com.example.projectbase.service.ShopService;
import com.example.projectbase.util.PaginationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShopServiceImpl implements ShopService {
    private final ShopRepository shopRepository;

    private final ShopMapper shopMapper;

    private final SimpleDateFormat timeFormat = new SimpleDateFormat(CommonConstant.PATTERN_TIME);

    @Override
    public Shop createShop(ShopDto shopDto) {
        Shop shop = shopMapper.toShop(shopDto);
        return shopRepository.save(shop);
    }

    @Override
    public Shop updateShop(int id, ShopDto shopDto) {
        Optional<Shop> shop = shopRepository.findById(id);

        if(shop.isEmpty()) {
            throw new NotFoundException(ErrorMessage.Shop.ERR_NOT_FOUND_ID, new String[]{String.valueOf(id)});
        }

        try {
            shopRepository.updateShop(shopDto.getName(), shopDto.getHotline(), new Time(timeFormat.parse(shopDto.getTimeOpen()).getTime()), new Time(timeFormat.parse(shopDto.getTimeClose()).getTime()), id);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return shopRepository.save(shop.get());
    }

    @Override
    public ShopResponseDto getShopById(int id) {
        return shopRepository.findShopById(id).orElseThrow(() -> new NotFoundException(ErrorMessage.Shop.ERR_NOT_FOUND_ID, new String[]{String.valueOf(id)}));
    }

    @Override
    public CommonResponseDto deleteShopById(int id) {
        Shop shop = shopRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorMessage.Shop.ERR_NOT_FOUND_ID, new String[]{String.valueOf(id)}));
        shopRepository.delete(shop);
        return new CommonResponseDto(true, SuccessMessage.DELETE_SHOP);
    }

    @Override
    public PaginationResponseDto<ShopResponseDto> getShops(PaginationFullRequestDto request) {
        Pageable pageable = PaginationUtil.buildPageable(request, SortByDataConstant.SHOP);

        Page<ShopResponseDto> page = shopRepository.findAllShop(pageable);

        PaginationResponseDto<ShopResponseDto> responseDto = new PaginationResponseDto<>();
        responseDto.setItems(page.getContent());

        PagingMeta pagingMeta = new PagingMeta(page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getSize(), request.getSortBy(), request.getIsAscending().toString());
        responseDto.setMeta(pagingMeta);
        return responseDto;
    }
}
