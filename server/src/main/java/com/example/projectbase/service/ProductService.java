package com.example.projectbase.service;

import com.example.projectbase.domain.dto.ProductDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationResponseDto;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.dto.pagination.PaginationSortRequestDto;
import com.example.projectbase.domain.dto.response.FindProductResponseDto;
import com.example.projectbase.domain.entity.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(int shopId,int categoryId,ProductDto productDto);

    Product updateProduct(int id, ProductDto productDto);

    Product getProductById(int id);

    CommonResponseDto deleteProductById(int id);

    PaginationResponseDto<Product> getProducts(PaginationFullRequestDto request);

    PaginationResponseDto<FindProductResponseDto> findProductsByShop(int id, PaginationSortRequestDto request);

    PaginationResponseDto<FindProductResponseDto> findProductsByCategory(int id, PaginationSortRequestDto request);

    PaginationResponseDto<FindProductResponseDto> findProductsByCategoryShop(int shopId,int categoryId, PaginationRequestDto request);

    PaginationResponseDto<FindProductResponseDto> getInfo(PaginationFullRequestDto request);

    FindProductResponseDto getProductDetail(int productId, int shopId);
}
