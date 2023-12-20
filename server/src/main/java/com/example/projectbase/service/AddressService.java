package com.example.projectbase.service;

import com.example.projectbase.domain.dto.AddressDto;

public interface AddressService {
    AddressDto saveLocationCustomer(int customerId, AddressDto addressDto);
}
