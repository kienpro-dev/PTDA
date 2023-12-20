package com.example.projectbase.domain.mapper;

import com.example.projectbase.domain.dto.AddressDto;
import com.example.projectbase.domain.entity.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    Address toAddress(AddressDto addressDto);
}
