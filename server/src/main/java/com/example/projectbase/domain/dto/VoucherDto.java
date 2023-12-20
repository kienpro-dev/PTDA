package com.example.projectbase.domain.dto;


import com.example.projectbase.constant.ErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import java.sql.Time;
import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VoucherDto {
    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    private String name;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    @Max(value = 100)
    @Min(value = 0)
    private String discount;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    private String timeStart;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    private String timeEnd;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    @Min(value = 0)
    private int quantity;

}
