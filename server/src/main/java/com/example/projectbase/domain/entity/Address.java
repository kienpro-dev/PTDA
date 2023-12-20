package com.example.projectbase.domain.entity;

import com.example.projectbase.domain.entity.common.DateAuditing;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Address extends DateAuditing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private int id;

    private double latitude;

    private double longitude;

    private String addressName;

    @JsonIgnore
    @OneToOne(mappedBy = "address",cascade = CascadeType.MERGE)
    private Shop shop;

    @JsonIgnore
    @OneToMany(mappedBy = "address",cascade = CascadeType.MERGE)
    private List<Customer> customers = new ArrayList<>();
}
