package com.example.projectbase.service.impl;

import com.example.projectbase.constant.CommonConstant;
import com.example.projectbase.constant.ErrorMessage;
import com.example.projectbase.constant.SuccessMessage;
import com.example.projectbase.domain.dto.AddressDto;
import com.example.projectbase.domain.dto.CustomerDto;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.entity.Address;
import com.example.projectbase.domain.entity.Customer;
import com.example.projectbase.domain.mapper.AddressMapper;
import com.example.projectbase.domain.mapper.CustomerMapper;
import com.example.projectbase.exception.NotFoundException;
import com.example.projectbase.repository.AddressRepository;
import com.example.projectbase.repository.CustomerRepository;
import com.example.projectbase.service.AddressService;
import com.example.projectbase.service.CustomerService;
import com.example.projectbase.util.AddressUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final CustomerRepository customerRepository;

    private final AddressRepository addressRepository;

    private final AddressMapper addressMapper;

    @Override
    public AddressDto saveLocationCustomer(int customerId, AddressDto addressDto) {
        Optional<Customer> customer = Optional.ofNullable(customerRepository.findById(customerId).orElseThrow(() -> new NotFoundException(ErrorMessage.Customer.ERR_NOT_FOUND_ID, new String[]{String.valueOf(customerId)})));

        String addressName = AddressUtil.getLocationName(addressDto);
        addressDto.setAddressName(addressName);
        Address address = addressMapper.toAddress(addressDto);

        Address addressFind = addressRepository.findByLatitudeAndLongitude(addressDto.getLatitude(), address.getLongitude());

        if(addressFind == null) {
            addressRepository.save(address);
        }
        customerRepository.saveLocation(addressRepository.findByLatitudeAndLongitude(addressDto.getLatitude(), address.getLongitude()).getId(), customerId);

        return addressDto;
    }
}
