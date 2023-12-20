package com.example.projectbase.repository;

import com.example.projectbase.domain.dto.AddressDto;
import com.example.projectbase.domain.dto.response.ShopResponseDto;
import com.example.projectbase.domain.entity.Shop;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.util.Optional;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Integer> {
    @Query("SELECT new com.example.projectbase.domain.dto.response.ShopResponseDto(s.id,s.name,a.addressName,s.hotline,s.timeClose,s.timeOpen) FROM Shop s INNER JOIN s.address a WHERE s.id = ?1")
    Optional<ShopResponseDto> findShopById(int id);

    @Query("SELECT new com.example.projectbase.domain.dto.AddressDto(a.latitude, a.longitude, a.addressName) FROM Shop s INNER JOIN s.address a WHERE s.name = ?1")
    AddressDto findLocationShop(String name);

    @Transactional
    @Modifying
    @Query("UPDATE Shop s SET s.name = ?1, s.hotline = ?2, s.timeOpen = ?3, s.timeClose = ?4, s.lastModifiedDate = CURRENT_TIMESTAMP WHERE s.id = ?5")
    void updateShop(String name, String hotline, Time timeOpen, Time timeClose, int id);

    @Query("SELECT new com.example.projectbase.domain.dto.response.ShopResponseDto(s.id,s.name,s.address.addressName,s.hotline,s.timeClose,s.timeOpen,s.createdDate,s.lastModifiedDate) FROM Shop s")
    Page<ShopResponseDto> findAllShop(Pageable pageable);
}
