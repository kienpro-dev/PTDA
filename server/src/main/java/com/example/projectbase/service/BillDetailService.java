package com.example.projectbase.service;

import com.example.projectbase.domain.dto.CartDetailDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationResponseDto;
import com.example.projectbase.domain.dto.response.BillResponseDto;
import com.example.projectbase.domain.dto.response.CartResponseDto;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.dto.response.StatisticResponseDto;
import com.example.projectbase.domain.entity.BillDetail;

import java.util.List;

public interface BillDetailService {
    List<BillResponseDto> getBillInfo(int customerId);

    CommonResponseDto buy(int billId, int customerId);

    PaginationResponseDto<BillDetail> getAllBill(PaginationFullRequestDto requestDto);

    List<BillDetail> getCustomerBills(int customerId);

    List<BillDetail> getHistoryBuy(int customerId);

    List<StatisticResponseDto> statisticShops();

    StatisticResponseDto statisticShop(int shopId);
}
