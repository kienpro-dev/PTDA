package com.example.projectbase.domain.dto;

import com.example.projectbase.constant.ErrorMessage;
import com.example.projectbase.domain.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CustomerDto {
    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    private String fullName;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    @Pattern(regexp = "^(?!0000)(?!.*-00)(?!.*00-)[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[01])$", message = ErrorMessage.INVALID_DATE)
    private String dob;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    @Pattern(regexp = "^(?:\\+84|0)(?:1[2689]|9[0-9]|3[2-9]|5[6-9]|7[0-9])(?:\\d{7}|\\d{8})$",message = ErrorMessage.INVALID_FORMAT_PHONE)
    private String phoneNumber;
}
