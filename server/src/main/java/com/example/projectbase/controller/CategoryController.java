package com.example.projectbase.controller;

import com.example.projectbase.base.RestApiV1;
import com.example.projectbase.base.VsResponseUtil;
import com.example.projectbase.constant.UrlConstant;
import com.example.projectbase.domain.dto.CategoryDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestApiV1
public class CategoryController {
    private final CategoryService categoryService;

    @Operation(summary = "API create category")
    @PostMapping(value=UrlConstant.Category.CREATE_CATEGORY, consumes = "multipart/form-data")
    public ResponseEntity<?>createCategory(@PathVariable int shopId,@Valid @ModelAttribute CategoryDto categoryDto){
        return VsResponseUtil.success(categoryService.createCategory(shopId,categoryDto));
    }

    @Operation(summary = "API get category")
    @GetMapping(UrlConstant.Category.GET_CATEGORY)
    public ResponseEntity<?> getCategoryById(@PathVariable int categoryId) {
        return VsResponseUtil.success(categoryService.getCategoryById(categoryId));
    }

    @Operation(summary = "API get all category")
    @GetMapping(UrlConstant.Category.GET_CATEGORIES)
    public ResponseEntity<?> getCategorys() {
        return VsResponseUtil.success(categoryService.getCategories());
    }

    @Operation(summary = "API update category")
    @PutMapping(value=UrlConstant.Category.UPDATE_CATEGORY,consumes = "multipart/form-data")
    public ResponseEntity<?> updateCategory(@PathVariable int categoryId, @Valid @ModelAttribute CategoryDto categoryDto) {
        return VsResponseUtil.success(categoryService.updateCategory(categoryId, categoryDto));
    }

    @Operation(summary = "API delete category")
    @DeleteMapping(UrlConstant.Category.DELETE_CATEGORY)
    public ResponseEntity<?> deleteCategory(@PathVariable int categoryId) {
        return VsResponseUtil.success(categoryService.deleteCategoryById(categoryId));
    }

    @Operation(summary = "API get categories by shop")
    @GetMapping(UrlConstant.Category.GET_CATEGORIES_BY_SHOP)
    public ResponseEntity<?>getCategoriesByShop(@PathVariable int shopId,@Valid @ParameterObject PaginationFullRequestDto requestDto){
        return VsResponseUtil.success(categoryService.getCategoriesByShop(shopId,requestDto));
    }


}
