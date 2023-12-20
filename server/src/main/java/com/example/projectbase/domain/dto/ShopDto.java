package com.example.projectbase.domain.dto;

import com.example.projectbase.constant.ErrorMessage;
import com.example.projectbase.domain.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.sql.Time;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShopDto {

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    private String name;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    @Pattern(regexp = "^(?:\\+84|0)(?:1[2689]|9[0-9]|3[2-9]|5[6-9]|7[0-9])(?:\\d{7}|\\d{8})$",message = ErrorMessage.INVALID_FORMAT_PHONE)
    private String hotline;


    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    @Pattern(regexp = "^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$",message = ErrorMessage.INVALID_TIME)
    private String timeOpen;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    @Pattern(regexp = "^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$",message = ErrorMessage.INVALID_TIME)
    private String timeClose;

}
