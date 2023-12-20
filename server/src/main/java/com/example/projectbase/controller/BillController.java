package com.example.projectbase.controller;

import com.example.projectbase.base.RestApiV1;
import com.example.projectbase.base.VsResponseUtil;
import com.example.projectbase.constant.UrlConstant;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.service.BillDetailService;
import com.example.projectbase.service.BillService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import javax.validation.Valid;


@RequiredArgsConstructor
@RestApiV1
public class BillController {
    private final BillDetailService billDetailService;
    private final BillService billService;

    @Operation(summary = "API get all bill")
    @GetMapping(UrlConstant.Bill.BILLS)
    public ResponseEntity<?> getBills(@Valid @ParameterObject PaginationFullRequestDto requestDTO) {
        return VsResponseUtil.success(billDetailService.getAllBill(requestDTO));
    }

    @Operation(summary = "API get customer bills")
    @GetMapping(UrlConstant.Bill.GET_CUSTOMER_BILLS)
    public ResponseEntity<?> getCustomerBills(@PathVariable int customerId) {
        return VsResponseUtil.success(billDetailService.getCustomerBills(customerId));
    }

    @Operation(summary = "API get history buy")
    @GetMapping(UrlConstant.Bill.GET_HISTORY_BUY)
    public ResponseEntity<?> getHistoryBuy(@PathVariable int customerId) {
        return VsResponseUtil.success(billDetailService.getHistoryBuy(customerId));
    }

    @Operation(summary = "API cancel order")
    @PutMapping(UrlConstant.Bill.CANCEL_ORDER)
    public ResponseEntity<?> cancelOrder(@PathVariable int billId){
        return VsResponseUtil.success(billService.cancelOrder(billId));
    }

    @Operation(summary = "API statistic shops")
    @GetMapping(UrlConstant.Bill.STATISTIC_SHOPS)
    public ResponseEntity<?> statisticShops(){
        return VsResponseUtil.success(billDetailService.statisticShops());
    }

    @Operation(summary = "API statistic shop")
    @GetMapping(UrlConstant.Bill.STATISTIC_SHOP)
    public ResponseEntity<?> statisticShop(@PathVariable int shopId){
        return VsResponseUtil.success(billDetailService.statisticShop(shopId));
    }
}
