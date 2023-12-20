package com.example.projectbase.repository;

import com.example.projectbase.domain.dto.CartDetailDto;
import com.example.projectbase.domain.dto.response.CartResponseDto;
import com.example.projectbase.domain.entity.Cart;
import com.example.projectbase.domain.entity.CartDetail;
import com.example.projectbase.domain.entity.Product;
import com.example.projectbase.domain.entity.ShopProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    //CartDetail findByCartAndProductAndShopProductDetail(Cart cart, Product product, List<ShopProductDetail> shopProductDetail);

    @Query("SELECT cd FROM CartDetail cd INNER JOIN cd.shopProductDetail spd WHERE cd.cart.id = ?1 AND cd.product.id = ?2 AND spd.shop.id = ?3")
    Optional<CartDetail> findByCartIdAndProductIdAndShopId(int cartId, int productId, int shopId);

    @Query("SELECT cd FROM CartDetail cd WHERE cd.cart.id = ?1 AND cd.product.id = ?2")
    Optional<CartDetail> findByCartIdAndProductId(int cartId, int productId);

    @Query("SELECT new com.example.projectbase.domain.dto.response" +
            ".CartResponseDto(c.id, p.id, s.id, s.name, a.addressName ,p.name, p.image, cd.quantity, p.price) " +
            "FROM CartDetail cd INNER JOIN cd.product p INNER JOIN cd.cart c INNER JOIN cd.shopProductDetail spd INNER JOIN spd.shop s INNER JOIN s.address a WHERE c.id = ?1")
    List<CartResponseDto> findCartDetail(int cartId);

    @Transactional
    @Modifying
    @Query("UPDATE CartDetail cp SET cp.quantity = ?1 WHERE cp.cart.id = ?2 and cp.product.id = ?3 and cp.shopProductDetail.id = ?4")
    void updateCartDetail(int quantity, int cartId, int productId, int shopProductId);

    @Transactional
    @Modifying
    @Query("DELETE FROM CartDetail cp WHERE cp.cart.id = ?1")
    void deleteAllByCartId(int cartId);
}
