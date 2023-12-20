package com.example.projectbase.service.impl;

import com.example.projectbase.constant.ErrorMessage;
import com.example.projectbase.constant.StatusConstant;
import com.example.projectbase.constant.SuccessMessage;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.entity.Bill;
import com.example.projectbase.exception.NotFoundException;
import com.example.projectbase.repository.BillRepository;
import com.example.projectbase.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BillServiceImpl implements BillService {
    private final BillRepository billRepository;

    @Override
    public CommonResponseDto cancelOrder(int billId) {
        Optional<Bill> bill = Optional.ofNullable(billRepository.findById(billId).orElseThrow(() -> new NotFoundException(ErrorMessage.Category.ERR_NOT_FOUND_ID, new String[]{String.valueOf(billId)})));
        Date currentTime = new Date(System.currentTimeMillis());
        if (currentTime.compareTo(bill.get().getTimeShip()) < 0) {
            bill.get().setStatus(StatusConstant.CANCELLED);
            billRepository.save(bill.get());
            return new CommonResponseDto(true, SuccessMessage.CANCEL_BILL);
        } else {
            return new CommonResponseDto(false, ErrorMessage.Bill.ERR_NOT_ALLOW_CANCEL);
        }
    }
//    private final BillRepository billRepository;
//
//    private final CustomerRepository customerRepository;
//
//    private final BillMapper billMapper;
//
//    @Override
//    public void createBillForCustomer(int customerId) {
//        Optional<Customer> customer = customerRepository.findById(customerId);
//        Bill bill = new Bill();
//        bill.setCustomer(customer.get());
//        billRepository.save(bill);
//    }
}
