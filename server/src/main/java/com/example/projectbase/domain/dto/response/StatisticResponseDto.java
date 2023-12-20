package com.example.projectbase.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StatisticResponseDto {
    private int shopId;

    private String shopName;

    private long sold;

    private double revenue;

    private long toReceive;

    private long completed;

    private long canceled;
}
