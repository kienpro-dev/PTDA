package com.example.projectbase.repository;

import com.example.projectbase.domain.dto.response.CategoryResponseDto;
import com.example.projectbase.domain.dto.response.FindProductResponseDto;
import com.example.projectbase.domain.entity.Category;
import com.example.projectbase.domain.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c FROM Category c WHERE c.id = ?1")
    Optional<Category> findById(int id);

    @Transactional
    @Modifying
    @Query("UPDATE Category c SET c.name = ?1, c.lastModifiedDate = CURRENT_TIMESTAMP where c.id = ?2")
    void updateCategory(String name, int id);


    @Query("SELECT new com.example.projectbase.domain.dto.response.CategoryResponseDto(c.id,c.name,c.image,s.id) FROM Category c INNER JOIN c.shops s WHERE s.id=?1")
    Page<CategoryResponseDto> findCategoryByShop(int id, Pageable pageable);

    @Query("SELECT new com.example.projectbase.domain.dto.response.CategoryResponseDto(c.id,c.name,c.products.size,c.image) FROM Category c")
    List<CategoryResponseDto> findAllCategory();

}
