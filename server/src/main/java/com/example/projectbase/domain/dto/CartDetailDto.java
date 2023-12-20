package com.example.projectbase.domain.dto;

import com.example.projectbase.constant.ErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDetailDto {

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    private int productId;

    private int shopProductId;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    private int cartId;

    @NotBlank(message = ErrorMessage.NOT_BLANK_FIELD)
    @Min(value = 1)
    private int quantity;
}
