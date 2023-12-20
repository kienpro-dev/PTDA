package com.example.projectbase.domain.mapper;

import com.example.projectbase.domain.dto.CartDetailDto;
import com.example.projectbase.domain.entity.CartDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface CartDetailMapper {
    @Mappings({
            @Mapping(source = "productId", target = "product.id"),
            @Mapping(source = "cartId", target = "cart.id"),
            @Mapping(source = "quantity", target = "quantity"),
            @Mapping(source = "shopProductId", target = "shopProductDetail.id")
    })
    CartDetail toCartDetail(CartDetailDto cartDetailDto);
}
