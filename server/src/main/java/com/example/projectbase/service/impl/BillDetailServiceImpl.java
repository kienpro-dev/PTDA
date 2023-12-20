package com.example.projectbase.service.impl;

import com.example.projectbase.constant.ErrorMessage;
import com.example.projectbase.constant.SortByDataConstant;
import com.example.projectbase.constant.StatusConstant;
import com.example.projectbase.constant.SuccessMessage;
import com.example.projectbase.domain.dto.AddressDto;
import com.example.projectbase.domain.dto.BillDetailDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationResponseDto;
import com.example.projectbase.domain.dto.pagination.PagingMeta;
import com.example.projectbase.domain.dto.response.BillResponseDto;
import com.example.projectbase.domain.dto.response.CartResponseDto;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.dto.response.StatisticResponseDto;
import com.example.projectbase.domain.entity.*;
import com.example.projectbase.domain.mapper.BillDetailMapper;
import com.example.projectbase.exception.NotFoundException;
import com.example.projectbase.repository.*;
import com.example.projectbase.service.BillDetailService;
import com.example.projectbase.util.AddressUtil;
import com.example.projectbase.util.PaginationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BillDetailServiceImpl implements BillDetailService {
    private final CustomerRepository customerRepository;

    private final CartDetailRepository cartDetailRepository;

    private final BillRepository billRepository;

    private final BillDetailRepository billDetailRepository;

    private final ProductRepository productRepository;

    private final ShopRepository shopRepository;

    private final BillDetailMapper billDetailMapper;

    @Override
    public List<BillResponseDto> getBillInfo(int customerId) {
        Optional<Customer> customer = Optional.ofNullable(customerRepository.findById(customerId).orElseThrow(() -> new NotFoundException(ErrorMessage.Customer.ERR_NOT_FOUND_ID, new String[]{String.valueOf(customerId)})));

        Address addressCustomer = customer.get().getAddress();

        Cart cart = customer.get().getCart();
        List<CartResponseDto> cartResponseDto = cartDetailRepository.findCartDetail(cart.getId());

        Bill bill = new Bill();
        bill.setNameCustomer(customer.get().getFullName());
        bill.setPhoneNumber(customer.get().getPhoneNumber());
        bill.setCustomer(customer.get());
        bill.setAddress(addressCustomer.getAddressName());

        List<AddressDto> locations = new ArrayList<>();

        double totalPrice = 0;

        for (CartResponseDto c : cartResponseDto) {
            totalPrice += c.getPrice() * c.getQuantity();

            locations.add(shopRepository.findLocationShop(c.getShopName()));
        }

        double distance = 0;
        AddressDto addressCustomerDto = new AddressDto(addressCustomer.getLatitude(), addressCustomer.getLongitude(), "");
        for (AddressDto a : locations) {
            distance += AddressUtil.calculateDistance(addressCustomerDto, a);
        }

        double feeShip = (distance < 2 ? 25000 : (distance < 5 ? 30000 : (distance < 10 ? 30000 : distance * 4000)));

        Date timeShip = new Date(System.currentTimeMillis() + (long) (distance / 30 * 60 * 60 * 1000) + 900000);

        bill.setDistance(distance);
        bill.setFeeShip(feeShip);
        bill.setTimeShip(timeShip);
        bill.setPayment(feeShip + totalPrice);
        bill.setStatus(StatusConstant.TO_PAY);

        billRepository.save(bill);

        return billDetailRepository.findBillDetail(bill.getId());
    }

    @Override
    public CommonResponseDto buy(int billId, int customerId) {
        Optional<Customer> customer = Optional.ofNullable(customerRepository.findById(customerId).orElseThrow(() -> new NotFoundException(ErrorMessage.Customer.ERR_NOT_FOUND_ID, new String[]{String.valueOf(customerId)})));

        Optional<Bill> bill = billRepository.findByCustomerIdAndBillId(customerId, billId);

        bill.get().setStatus(StatusConstant.TO_RECEIVE);

        Cart cart = customer.get().getCart();

        List<CartResponseDto> cartResponseDto = cartDetailRepository.findCartDetail(cart.getId());

        for (CartResponseDto c : cartResponseDto) {
            billDetailRepository.save(billDetailMapper.toBillDetail(new BillDetailDto(c.getProductId(), billId, c.getQuantity())));

            Optional<Product> product = productRepository.findById(c.getProductId());

            productRepository.updateStock(product.get().getId(), product.get().getStock() - c.getQuantity());
        }

        cartDetailRepository.deleteAllByCartId(cart.getId());

        return new CommonResponseDto(true, SuccessMessage.BUY_PRODUCT);
    }

    @Override
     public PaginationResponseDto<BillDetail> getAllBill(PaginationFullRequestDto requestDto) {
        Pageable pageable = PaginationUtil.buildPageable(requestDto, SortByDataConstant.BILL);

        Page<BillDetail> bills= billDetailRepository.findAll(pageable);

        Date currentTime = new Date(System.currentTimeMillis());
        for(BillDetail bd : bills.getContent()){
            if(bd.getBill().getTimeShip().compareTo(currentTime)<=0 && bd.getBill().getStatus().compareTo(StatusConstant.TO_RECEIVE)==0){
                bd.getBill().setStatus(StatusConstant.COMPLETED);
                billRepository.save(bd.getBill());
            }
        }
        PaginationResponseDto<BillDetail> responseDto = new PaginationResponseDto<>();
        responseDto.setItems(bills.getContent());

        PagingMeta pagingMeta = new PagingMeta(bills.getTotalElements(), bills.getTotalPages(), bills.getNumber(), bills.getSize(), requestDto.getSortBy(), requestDto.getIsAscending().toString());
        responseDto.setMeta(pagingMeta);
        return responseDto;
    }

    @Override
    public List<BillDetail> getCustomerBills(int customerId) {
        Optional<Customer> customer = Optional.ofNullable(customerRepository.findById(customerId).orElseThrow(() -> new NotFoundException(ErrorMessage.Customer.ERR_NOT_FOUND_ID, new String[]{String.valueOf(customerId)})));
        return billDetailRepository.getCustomerBills(customerId);
    }

    @Override
    public List<BillDetail> getHistoryBuy(int customerId) {
        Optional<Customer> customer = Optional.ofNullable(customerRepository.findById(customerId).orElseThrow(() -> new NotFoundException(ErrorMessage.Customer.ERR_NOT_FOUND_ID, new String[]{String.valueOf(customerId)})));
        return billDetailRepository.getHistoryBuy(customerId);
    }

    @Override
    public List<StatisticResponseDto> statisticShops() {
        return billDetailRepository.statisticShops();
    }

    @Override
    public StatisticResponseDto statisticShop(int shopId) {
        return billDetailRepository.statisticShop(shopId);
    }
}
