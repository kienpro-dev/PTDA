package com.example.projectbase.service.impl;

import com.example.projectbase.constant.ErrorMessage;
import com.example.projectbase.constant.SuccessMessage;
import com.example.projectbase.domain.dto.CartDetailDto;
import com.example.projectbase.domain.dto.response.CartResponseDto;
import com.example.projectbase.domain.dto.response.CommonResponseDto;
import com.example.projectbase.domain.entity.*;
import com.example.projectbase.domain.mapper.CartDetailMapper;
import com.example.projectbase.exception.InternalServerException;
import com.example.projectbase.exception.NotFoundException;
import com.example.projectbase.repository.*;
import com.example.projectbase.service.CartDetailService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartDetailServiceImpl implements CartDetailService {
    private final CartDetailRepository cartDetailRepository;

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    private final ShopRepository shopRepository;

    private final ShopProductDetailRepository shopProductDetailRepository;

    private final CartDetailMapper cartDetailMapper;

    @Override
    public CommonResponseDto addProductToCart(CartDetailDto cartDetailDto, int shopId) {
        Optional<CartDetail> cartDetail = getCartDetail(cartDetailDto.getCartId(), cartDetailDto.getProductId(), shopId);
        Optional<ShopProductDetail> shopProductDetail = Optional.ofNullable(shopProductDetailRepository.findByShopIdAndProductId(cartDetailDto.getProductId(), shopId).orElseThrow(() -> new NotFoundException(ErrorMessage.ShopProduct.ERR_NOT_FOUND)));

        if(cartDetail.isPresent()) {
            checkProductStock(cartDetailDto.getProductId(), cartDetailDto.getQuantity(), cartDetail.get());
            cartDetail.get().setQuantity(cartDetail.get().getQuantity() + cartDetailDto.getQuantity());

            cartDetailRepository.updateCartDetail(cartDetail.get().getQuantity(), cartDetailDto.getCartId(), cartDetailDto.getProductId(), shopProductDetail.get().getId());
        } else {
            checkProductStock(cartDetailDto.getProductId(), cartDetailDto.getQuantity(), null);
            cartDetailDto.setShopProductId(shopProductDetail.get().getId());
            cartDetailRepository.save(cartDetailMapper.toCartDetail(cartDetailDto));

        }

        return new CommonResponseDto(true, SuccessMessage.ADD_PRODUCT_TO_CART);
    }

    @Override
    public List<CartResponseDto> getCartInfo(int cartId) {
        Optional<Cart> cart = Optional.ofNullable(cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException(ErrorMessage.Cart.ERR_NOT_FOUND_ID, new String[]{String.valueOf(cartId)})));

        return cartDetailRepository.findCartDetail(cartId);
    }

    @Override
    public CommonResponseDto updateCartInfo(CartDetailDto cartDetailDto, int shopId) {
        Optional<CartDetail> cartDetail = getCartDetail(cartDetailDto.getCartId(), cartDetailDto.getProductId(), shopId);

        if(cartDetail.isPresent()) {
            checkProductStock(cartDetailDto.getProductId(), cartDetailDto.getQuantity(), null);
            if(cartDetailDto.getQuantity() <= 0) {
                cartDetailRepository.delete(cartDetail.get());

                return new CommonResponseDto(true, SuccessMessage.DELETE_PRODUCT_TO_CART);
            }
        } else {
            throw new NotFoundException(ErrorMessage.Cart.ERR_NOT_FOUND_ID, new String[]{String.valueOf(cartDetailDto.getCartId())});
        }

        Optional<ShopProductDetail> shopProductDetail = shopProductDetailRepository.findByShopIdAndProductId(cartDetailDto.getProductId(), shopId);
        cartDetailRepository.updateCartDetail(cartDetailDto.getQuantity(), cartDetailDto.getCartId(), cartDetailDto.getProductId(), shopProductDetail.get().getId());

        return new CommonResponseDto(true, SuccessMessage.UPDATE_PRODUCT_TO_CART);
    }

    @Override
    public CommonResponseDto deleteCartInfo(int cartId) {
        cartDetailRepository.deleteAllByCartId(cartId);
        return new CommonResponseDto(true, SuccessMessage.DELETE_PRODUCT_TO_CART);
    }

    private Optional<CartDetail> getCartDetail(int cartId, int productId, int shopId) {
        Optional<Cart> cart = Optional.ofNullable(cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException(ErrorMessage.Cart.ERR_NOT_FOUND_ID, new String[]{String.valueOf(cartId)})));

        Optional<Product> product = Optional.ofNullable(productRepository.findById(productId).orElseThrow(() -> new NotFoundException(ErrorMessage.Product.ERR_NOT_FOUND_ID, new String[]{String.valueOf(productId)})));

        Optional<Shop> shop = Optional.ofNullable(shopRepository.findById(shopId).orElseThrow(() -> new NotFoundException(ErrorMessage.Shop.ERR_NOT_FOUND_ID, new String[]{String.valueOf(shopId)})));

//        Optional<List<ShopProductDetail>> shopProductDetails = shopProductDetailRepository.findByShop(shop.get());

        return cartDetailRepository.findByCartIdAndProductIdAndShopId(cartId, productId, shopId);
    }

    private void checkProductStock(int productId, int quantity, CartDetail cartDetail) {
        Optional<Product> product = Optional.ofNullable(productRepository.findById(productId).orElseThrow(() -> new NotFoundException(ErrorMessage.Product.ERR_NOT_FOUND_ID, new String[]{String.valueOf(productId)})));

        if(cartDetail != null) {
            quantity += cartDetail.getQuantity();
        }

        if(product.get().getStock() < quantity) {
            throw new InternalServerException(ErrorMessage.CartProduct.ERR_NOT_IN_STOCK);
        }
    }
}
