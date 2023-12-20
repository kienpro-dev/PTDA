package com.example.projectbase.domain.dto;

import com.example.projectbase.constant.ErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {
    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    @Size(min = -90, max = 90, message = ErrorMessage.INVALID_COORDINATES)
    private double latitude;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    @Size(min = -180, max = 180, message = ErrorMessage.INVALID_COORDINATES)
    private double longitude;

    private String addressName;
}
