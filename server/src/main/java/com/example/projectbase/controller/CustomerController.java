package com.example.projectbase.controller;

import com.example.projectbase.base.RestApiV1;
import com.example.projectbase.base.VsResponseUtil;
import com.example.projectbase.constant.UrlConstant;
import com.example.projectbase.domain.dto.CustomerDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.service.BillDetailService;
import com.example.projectbase.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestApiV1
public class CustomerController {
    private final CustomerService customerService;

    private final BillDetailService billDetailService;

    @Operation(summary = "API get customer")
    @GetMapping(UrlConstant.Customer.GET_CUSTOMER)
    public ResponseEntity<?> getCustomerById(@PathVariable int customerId) {
        return VsResponseUtil.success(customerService.getCustomerById(customerId));
    }

    @Operation(summary = "API get all customer")
    @GetMapping(UrlConstant.Customer.GET_CUSTOMERS)
    public ResponseEntity<?> getCustomers(@Valid @ParameterObject PaginationFullRequestDto requestDTO) {
        return VsResponseUtil.success(customerService.getCustomers(requestDTO));
    }

    @Operation(summary = "API update customer")
    @PutMapping(UrlConstant.Customer.UPDATE_CUSTOMER)
    public ResponseEntity<?> updateCustomer(@PathVariable int customerId, @Valid @RequestBody CustomerDto customerDto) {
        return VsResponseUtil.success(customerService.updateCustomer(customerId, customerDto));
    }

    @Operation(summary = "API delete customer")
    @DeleteMapping(UrlConstant.Customer.DELETE_CUSTOMER)
    public ResponseEntity<?> deleteCustomer(@PathVariable int customerId) {
        return VsResponseUtil.success(customerService.deleteCustomerById(customerId));
    }

    @Operation(summary = "API place order")
    @GetMapping(UrlConstant.Customer.PLACE_ORDER)
    public ResponseEntity<?> getBillInfo(@Valid @PathVariable int customerId) {
        return VsResponseUtil.success(billDetailService.getBillInfo(customerId));
    }

    @Operation(summary = "API buy")
    @PostMapping(UrlConstant.Customer.BUY)
    public ResponseEntity<?> buy(@Valid @PathVariable int customerId, @PathVariable int billId) {
        return VsResponseUtil.success(billDetailService.buy(billId, customerId));
    }
}
