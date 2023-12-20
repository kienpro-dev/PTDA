package com.example.projectbase.service;

import com.example.projectbase.domain.dto.CategoryDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationResponseDto;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.dto.response.CategoryResponseDto;
import com.example.projectbase.domain.entity.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(int shopId, CategoryDto categoryDto);

    Category updateCategory(int id, CategoryDto categoryDto);

    Category getCategoryById(int id);

    CommonResponseDto deleteCategoryById(int id);

    PaginationResponseDto<Category> getCategories(PaginationFullRequestDto request);

    PaginationResponseDto<CategoryResponseDto> getCategoriesByShop(int shopId, PaginationFullRequestDto request);

    List<CategoryResponseDto>getCategories();

}
