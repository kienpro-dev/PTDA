package com.example.projectbase.controller;

import com.example.projectbase.base.RestApiV1;
import com.example.projectbase.base.VsResponseUtil;
import com.example.projectbase.constant.UrlConstant;
import com.example.projectbase.domain.dto.ProductDto;
import com.example.projectbase.domain.dto.pagination.PaginationFullRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationRequestDto;
import com.example.projectbase.domain.dto.pagination.PaginationSortRequestDto;
import com.example.projectbase.repository.CategoryRepository;
import com.example.projectbase.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestApiV1
public class ProductController {
    private final ProductService productService;

    private final CategoryRepository categoryRepository;

    @Operation(summary = "API create product")
    @PostMapping(value=UrlConstant.Product.CREATE_PRODUCT, consumes = "multipart/form-data")
    public ResponseEntity<?> createProduct(@PathVariable int shopId,@PathVariable int categoryId,@Valid @ModelAttribute ProductDto productDto){
        return VsResponseUtil.success(productService.createProduct(shopId,categoryId,productDto));
    }

    @Operation(summary = "API get product")
    @GetMapping(UrlConstant.Product.GET_PRODUCT)
    public ResponseEntity<?> getProductById(@PathVariable int productId) {
        return VsResponseUtil.success(productService.getProductById(productId));
    }

    @Operation(summary = "API get all product")
    @GetMapping(UrlConstant.Product.GET_PRODUCTS)
    public ResponseEntity<?> getProducts(@Valid @ParameterObject PaginationFullRequestDto requestDTO) {
        return VsResponseUtil.success(productService.getProducts(requestDTO));
    }

    @Operation(summary = "API update product")
    @PutMapping(value = UrlConstant.Product.UPDATE_PRODUCT, consumes = "multipart/form-data")
    public ResponseEntity<?> updateProduct(@PathVariable int productId, @Valid @ModelAttribute ProductDto productDto) {
        return VsResponseUtil.success(productService.updateProduct(productId, productDto));
    }

    @Operation(summary = "API delete product")
    @DeleteMapping(UrlConstant.Product.DELETE_PRODUCT)
    public ResponseEntity<?> deleteProduct(@PathVariable int productId) {
        return VsResponseUtil.success(productService.deleteProductById(productId));
    }

    @Operation(summary = "API get products by shop")
    @GetMapping(UrlConstant.Product.GET_PRODUCTS_BY_SHOP)
    public ResponseEntity<?> getProductByShop(@PathVariable int shopId,@Valid @ParameterObject PaginationSortRequestDto requestDTO) {
        return VsResponseUtil.success(productService.findProductsByShop(shopId,requestDTO));
    }

    @Operation(summary = "API get products by category and shop")
    @GetMapping(UrlConstant.Product.GET_PRODUCTS_BY_CATEGORY_SHOP)
    public ResponseEntity<?> getProductByCategoryShop(@PathVariable int shopId,@PathVariable int categoryId,@Valid @ParameterObject PaginationRequestDto requestDTO) {
        return VsResponseUtil.success(productService.findProductsByCategoryShop(shopId,categoryId,requestDTO));
    }

    @Operation(summary = "API get products by category")
    @GetMapping(UrlConstant.Product.GET_PRODUCTS_BY_CATEGORY)
    public ResponseEntity<?> getProductByCategory(@PathVariable int categoryId,@Valid @ParameterObject PaginationSortRequestDto requestDTO) {
        return VsResponseUtil.success(productService.findProductsByCategory(categoryId,requestDTO));
    }

    @Operation(summary = "API find product info")
    @GetMapping(UrlConstant.User.FIND_PRODUCT_INFO)
    public ResponseEntity<?> getInformation(@Valid @ParameterObject PaginationFullRequestDto requestDTO) {
        return VsResponseUtil.success(productService.getInfo(requestDTO));
    }

    @Operation(summary = "API get product detail")
    @GetMapping(UrlConstant.User.GET_PRODUCT_DETAIL)
    public ResponseEntity<?> getInformation(@Valid @PathVariable int productId, @PathVariable int shopId) {
        return VsResponseUtil.success(productService.getProductDetail(productId, shopId));
    }

}
