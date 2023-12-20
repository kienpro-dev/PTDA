package com.example.projectbase.repository;

import com.example.projectbase.domain.entity.Shop;
import com.example.projectbase.domain.entity.ShopProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShopProductDetailRepository extends JpaRepository<ShopProductDetail, Integer> {
    Optional<List<ShopProductDetail>> findByShop(Shop shop);

    @Query("SELECT spd FROM ShopProductDetail spd WHERE spd.product.id = ?1 AND spd.shop.id = ?2")
    Optional<ShopProductDetail> findByShopIdAndProductId(int productId, int shopId);

//    @Transactional
//    @Modifying
//    @Query("UPDATE ShopProductDetail spd SET spd.cartDetail.id = ?1 WHERE spd.product.id = ?2 and spd.shop.id = ?3")
//    void updateShopProductDetail(int cartDetailId, int productId, int shopId);
}