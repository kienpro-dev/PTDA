package com.example.projectbase.domain.mapper;

import com.example.projectbase.domain.dto.BillDetailDto;
import com.example.projectbase.domain.entity.BillDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface BillDetailMapper {
    @Mappings({
            @Mapping(source = "productId", target = "product.id"),
            @Mapping(source = "billId", target = "bill.id"),
            @Mapping(source = "quantity", target = "quantity")
    })
    BillDetail toBillDetail(BillDetailDto billDetailDto);
}
