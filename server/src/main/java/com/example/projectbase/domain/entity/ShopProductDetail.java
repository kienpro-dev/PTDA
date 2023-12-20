package com.example.projectbase.domain.entity;


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
public class ShopProductDetail implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_product_detail_id", insertable = false, updatable = false, nullable = false)
    private int id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "FK_SHOP_PRODUCT1"), referencedColumnName = "product_id")
    private Product product;


    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "shop_id", foreignKey = @ForeignKey(name = "FK_SHOP_PRODUCT2"), referencedColumnName = "shop_id")
    private Shop shop;

//    @ManyToOne(cascade = CascadeType.MERGE)
//    @JoinColumn(name = "cart_detail_id", foreignKey = @ForeignKey(name = "FK_SHOP_PRODUCT_DETAIl_CART_DETAIL"), referencedColumnName = "cart_detail_id")
//    private CartDetail cartDetail;

    @OneToMany(cascade = CascadeType.MERGE, mappedBy = "shopProductDetail")
    List<CartDetail> cartDetails;

}
