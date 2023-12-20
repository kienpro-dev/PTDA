package com.example.projectbase.domain.dto.response;


import com.example.projectbase.constant.CommonConstant;
import com.example.projectbase.domain.dto.common.DateAuditingDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.text.SimpleDateFormat;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShopResponseDto extends DateAuditingDto {
    private int shopId;

    private String name;

    private String address;

    private String hotline;

    private String timeClose;

    private String timeOpen;


    public ShopResponseDto(int shopId, String name, String address, String hotline, Date timeClose, Date timeOpen) {
        this.shopId = shopId;
        this.name = name;
        this.address=address;
        this.hotline=hotline;
        SimpleDateFormat timeFormat = new SimpleDateFormat(CommonConstant.PATTERN_TIME);
        this.timeClose = timeFormat.format(timeClose);
        this.timeOpen = timeFormat.format(timeOpen);
    }

    public ShopResponseDto(int shopId, String name, String address, String hotline, Date timeClose, Date timeOpen, LocalDateTime createdDate, LocalDateTime lastModifiedDate) {
        this.shopId = shopId;
        this.name = name;
        this.address=address;
        this.hotline=hotline;
        SimpleDateFormat timeFormat = new SimpleDateFormat(CommonConstant.PATTERN_TIME);
        this.timeClose = timeFormat.format(timeClose);
        this.timeOpen = timeFormat.format(timeOpen);
        super.setCreatedDate(createdDate);
        super.setLastModifiedDate(lastModifiedDate);
    }




}
