package com.example.projectbase.repository;


import com.example.projectbase.domain.dto.response.FindProductResponseDto;
import com.example.projectbase.domain.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p WHERE p.id = ?1")
    Optional<Product> findById(int id);

    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.name = ?1, p.price = ?2, p.description = ?3, p.image = ?4, p.discount = ?5, p.stock = ?6, p.lastModifiedDate = CURRENT_TIMESTAMP where p.id = ?7")
    void updateProduct(String name, int price, String description, String image, float discount, int stock, int id);

    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.stock = ?2, p.lastModifiedDate = CURRENT_TIMESTAMP where p.id = ?1")
    void updateStock(int id, int stock);

    @Query(value = "SELECT new com.example.projectbase.domain.dto.response.FindProductResponseDto (p.id, p.name, p.image, p.price, p.stock,p.description,sp.shop.id,sp.shop.name) FROM Product p INNER JOIN p.shopProductDetail sp  WHERE sp.shop.id= ?1 ")
    Page<FindProductResponseDto> findProductByShop(int id, Pageable pageable);

    @Query(value = "SELECT new com.example.projectbase.domain.dto.response.FindProductResponseDto (p.id, p.name, p.image, p.price, p.stock,p.description,sp.shop.id,sp.shop.name) FROM Product p INNER JOIN p.categories sc  INNER  JOIN p.shopProductDetail sp WHERE sc.id= ?1 ")
    Page<FindProductResponseDto> findProductByCategory(int id, Pageable pageable);


    @Query("SELECT new com.example.projectbase.domain.dto.response.FindProductResponseDto (p.id, p.name, p.image, p.price, p.stock,p.description,s.id,s.name) FROM Product p INNER JOIN p.shopProductDetail sp INNER JOIN sp.shop s INNER JOIN p.categories c WHERE s.id=?1 AND c.id=?2")
    Page<FindProductResponseDto> findProductByCategoryShop(int shopId, int categoryId,Pageable pageable);

        //   @Query(value = "select * from products as p inner join shop_product as sp on p.product_id = sp.sp_product_id inner join shops as s on sp.sp_shop_id = s.shop_id inner join category_product as cp on cp.cp_product_id = p.product_id inner join categories as c on c.category_id = cp.cp_category_id ", nativeQuery = true)
    @Query("SELECT new com.example.projectbase.domain.dto.response.FindProductResponseDto(p.id, p.name, " +
            "p.image, p.price, p.stock, c.id, c.name, s.id, s.name, s.address.addressName, s.timeOpen, s.timeClose, s.hotline) " +
            "FROM Product p INNER JOIN p.shopProductDetail sp INNER JOIN sp.shop s INNER JOIN p.categories c WHERE (p.name LIKE %:keyword%) " +
            "OR (s.name LIKE %:keyword%) OR (c.name LIKE %:keyword%)")
    Page<FindProductResponseDto> find(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT new com.example.projectbase.domain.dto.response.FindProductResponseDto(p.id, p.name, p.image, p.price, p.stock, c.id, c.name, s.id, s.name, s.address.addressName, s.timeOpen, s.timeClose, s.hotline) FROM Product p INNER JOIN p.shopProductDetail sp INNER JOIN sp.shop s INNER JOIN p.categories c WHERE p.id = ?1 AND s.id = ?2")
    Optional<FindProductResponseDto> findProductDetail(int productId, int shopId);
}
