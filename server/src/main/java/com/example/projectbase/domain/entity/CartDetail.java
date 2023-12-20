package com.example.projectbase.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CartDetail implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_detail_id", insertable = false, updatable = false, nullable = false)
    private int id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "FK_CART_PRODUCT1"), referencedColumnName = "product_id")
    private Product product;


    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "cart_id", foreignKey = @ForeignKey(name = "FK_CART_PRODUCT2"), referencedColumnName = "cart_id")
    private Cart cart;

    @Column(nullable = false)
    private int quantity;

//    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "cartDetail")
//    List<ShopProductDetail> shopProductDetail;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "shop_product_detail_id", foreignKey = @ForeignKey(name = "FK_SHOP_PRODUCT_DETAIl_CART_DETAIL"), referencedColumnName = "shop_product_detail_id")
    private ShopProductDetail shopProductDetail;
}