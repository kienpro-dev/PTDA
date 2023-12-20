package com.example.projectbase.service;

import com.example.projectbase.domain.dto.BillDto;
import com.example.projectbase.domain.dto.response.CommonResponseDto;

public interface BillService {
//    void createBillForCustomer(int customerId);

    CommonResponseDto cancelOrder(int billId);
}
