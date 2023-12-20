package com.example.projectbase.service.impl;

import com.example.projectbase.constant.CommonConstant;
import com.example.projectbase.constant.ErrorMessage;
import com.example.projectbase.constant.SortByDataConstant;
import com.example.projectbase.constant.SuccessMessage;
import com.example.projectbase.domain.dto.CustomerDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationResponseDto;
import com.example.projectbase.domain.dto.pagination.PagingMeta;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.entity.Customer;
import com.example.projectbase.domain.mapper.CustomerMapper;
import com.example.projectbase.exception.NotFoundException;
import com.example.projectbase.repository.CustomerRepository;
import com.example.projectbase.service.CustomerService;
import com.example.projectbase.util.PaginationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    private final CustomerMapper customerMapper;

    private final SimpleDateFormat dateFormat = new SimpleDateFormat(CommonConstant.PATTERN_DATE);

    @Override
    public Customer createCustomer(CustomerDto customerDto) {
        Customer customer = customerMapper.toCustomer(customerDto);
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(int id, CustomerDto customerDto) {
        Optional<Customer> customer = customerRepository.findById(id);

        if(customer.isEmpty()) {
            throw new NotFoundException(ErrorMessage.Customer.ERR_NOT_FOUND_ID, new String[]{String.valueOf(id)});
        }

        try {
            customerRepository.updateCustomer(customerDto.getFullName(), dateFormat.parse(customerDto.getDob()), customerDto.getPhoneNumber(), id);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return customerRepository.save(customer.get());
    }

    @Override
    public Customer getCustomerById(int id) {
        return customerRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorMessage.Customer.ERR_NOT_FOUND_ID, new String[]{String.valueOf(id)}));
    }

    @Override
    public CommonResponseDto deleteCustomerById(int id) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorMessage.Customer.ERR_NOT_FOUND_ID, new String[]{String.valueOf(id)}));
        customerRepository.delete(customer);
        return new CommonResponseDto(true, SuccessMessage.DELETE_CUSTOMER);
    }

    @Override
    public PaginationResponseDto<Customer> getCustomers(PaginationFullRequestDto request) {
        Pageable pageable = PaginationUtil.buildPageable(request, SortByDataConstant.CUSTOMER);

        Page<Customer> page = customerRepository.findAll(pageable);

        PaginationResponseDto<Customer> responseDto = new PaginationResponseDto<>();
        responseDto.setItems(page.getContent());

        PagingMeta pagingMeta = new PagingMeta(page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getSize(), request.getSortBy(), request.getIsAscending().toString());
        responseDto.setMeta(pagingMeta);
        return responseDto;
    }
}
