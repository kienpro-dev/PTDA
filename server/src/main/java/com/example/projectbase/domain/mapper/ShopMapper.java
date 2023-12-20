package com.example.projectbase.domain.mapper;

import com.example.projectbase.domain.dto.ShopDto;
import com.example.projectbase.domain.entity.Shop;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ShopMapper {
    @Mapping(target = "timeOpen", ignore = true)
    @Mapping(target = "timeClose", ignore = true)
    Shop toShop(ShopDto shopDto);
}
