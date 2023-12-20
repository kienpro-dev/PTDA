package com.example.projectbase.domain.dto.response;


import com.example.projectbase.domain.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponseDto {
    private int categoryId;

    private String name;

    private String image;

    private int shopId;

    private int quantity;

    public CategoryResponseDto(int categoryId, String name,String image, int shopId) {
        this.categoryId = categoryId;
        this.name = name;
        this.image=image;
        this.shopId = shopId;
    }

    public CategoryResponseDto(int categoryId, String name,int quantity,String image) {
        this.categoryId = categoryId;
        this.name = name;
        this.quantity=quantity;
        this.image=image;
    }



}
