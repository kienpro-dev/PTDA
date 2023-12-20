package com.example.projectbase.domain.entity;

import com.example.projectbase.domain.entity.common.DateAuditing;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "products")
public class Product extends DateAuditing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id",insertable = false, updatable = false, nullable = false)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int price;

    private String description;

    @Column(nullable = false)
    private String image;

    private float discount;

    private int stock;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<BillDetail> billDetail=new ArrayList<>();


    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CartDetail> cartDetail=new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL,mappedBy = "products")
    @JsonIgnore
    private List<Category> categories;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product")
    @JsonIgnore
    private List<ShopProductDetail> shopProductDetail;


}