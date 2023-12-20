package com.example.projectbase.domain.mapper;

import com.example.projectbase.domain.dto.CustomerDto;
import com.example.projectbase.domain.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    @Mapping(target = "dob", ignore = true)
    Customer toCustomer(CustomerDto customerDto);

//  @Mappings({
//      @Mapping(target = "roleName", source = "user.role.name"),
//  })
//  CustomerDto toUserDto(Customer customer);
}
