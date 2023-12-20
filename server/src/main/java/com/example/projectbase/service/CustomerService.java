package com.example.projectbase.service;

import com.example.projectbase.domain.dto.CustomerDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationResponseDto;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.entity.Customer;

import java.text.ParseException;

public interface CustomerService {
    Customer createCustomer(CustomerDto customerDto);

    Customer updateCustomer(int id, CustomerDto customerDto);

    Customer getCustomerById(int id);

    CommonResponseDto deleteCustomerById(int id);

    PaginationResponseDto<Customer> getCustomers(PaginationFullRequestDto request);
}
