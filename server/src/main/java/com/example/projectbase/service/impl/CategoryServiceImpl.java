package com.example.projectbase.service.impl;

import com.example.projectbase.constant.ErrorMessage;
import com.example.projectbase.constant.SortByDataConstant;
import com.example.projectbase.constant.SuccessMessage;
import com.example.projectbase.domain.dto.CategoryDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationResponseDto;
import com.example.projectbase.domain.dto.pagination.PagingMeta;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.dto.response.CategoryResponseDto;
import com.example.projectbase.domain.entity.Category;
import com.example.projectbase.domain.entity.Shop;
import com.example.projectbase.domain.mapper.CategoryMapper;
import com.example.projectbase.exception.NotFoundException;
import com.example.projectbase.repository.CategoryRepository;
import com.example.projectbase.repository.ShopRepository;
import com.example.projectbase.service.CategoryService;
import com.example.projectbase.util.PaginationUtil;
import com.example.projectbase.util.UploadFileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    private final CategoryMapper categoryMapper;

    private final ShopRepository shopRepository;

    private final UploadFileUtil uploadFileUtil;

    @Override
    public Category createCategory(int shopId, CategoryDto categoryDto) {
        List<Shop> shops = new ArrayList<>();
        Category category = categoryMapper.toCategory(categoryDto);
        String url = uploadFileUtil.uploadFile(categoryDto.getImage());
        category.setImage(url);

        Optional<Shop> shop = Optional.ofNullable(shopRepository.findById(shopId).orElseThrow(() -> new NotFoundException(ErrorMessage.Shop.ERR_NOT_FOUND_ID, new String[]{String.valueOf(shopId)})));
        shops.add(shop.get());
        category.setShops(shops);
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(int id, CategoryDto categoryDto) {
        Optional<Category> category = categoryRepository.findById(id);

        if (category.isEmpty()) {
            throw new NotFoundException(ErrorMessage.Category.ERR_NOT_FOUND_ID, new String[]{String.valueOf(id)});
        }

        categoryRepository.updateCategory(categoryDto.getName(), id);

        return categoryRepository.save(category.get());
    }

    @Override
    public Category getCategoryById(int id) {
        return categoryRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorMessage.Category.ERR_NOT_FOUND_ID, new String[]{String.valueOf(id)}));
    }

    @Override
    public CommonResponseDto deleteCategoryById(int id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorMessage.Category.ERR_NOT_FOUND_ID, new String[]{String.valueOf(id)}));
        categoryRepository.delete(category);
        return new CommonResponseDto(true, SuccessMessage.DELETE_CATEGORY);
    }

    @Override
    public PaginationResponseDto<Category> getCategories(PaginationFullRequestDto request) {
        Pageable pageable = PaginationUtil.buildPageable(request, SortByDataConstant.CATEGORY);

        Page<Category> page = categoryRepository.findAll(pageable);

        PaginationResponseDto<Category> responseDto = new PaginationResponseDto<>();
        responseDto.setItems(page.getContent());

        PagingMeta pagingMeta = new PagingMeta(page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getSize(), request.getSortBy(), request.getIsAscending().toString());
        responseDto.setMeta(pagingMeta);
        return responseDto;
    }

    @Override
    public PaginationResponseDto<CategoryResponseDto> getCategoriesByShop(int shopId, PaginationFullRequestDto request) {
        Optional<Shop> shop = Optional.ofNullable(shopRepository.findById(shopId).orElseThrow(() -> new NotFoundException(ErrorMessage.Shop.ERR_NOT_FOUND_ID, new String[]{String.valueOf(shopId)})));
        Pageable pageable = PaginationUtil.buildPageable(request, SortByDataConstant.CATEGORY);

        Page<CategoryResponseDto> page = categoryRepository.findCategoryByShop(shopId, pageable);

        PaginationResponseDto<CategoryResponseDto> responseDto = new PaginationResponseDto<>();
        responseDto.setItems(page.getContent());

        PagingMeta pagingMeta = new PagingMeta(page.getTotalElements(), page.getTotalPages(), page.getNumber(), page.getSize(), request.getSortBy(), request.getIsAscending().toString());
        responseDto.setMeta(pagingMeta);
        return responseDto;
    }

    @Override
    public List<CategoryResponseDto> getCategories() {
        return categoryRepository.findAllCategory();
    }
}
