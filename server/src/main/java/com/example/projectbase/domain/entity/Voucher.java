package com.example.projectbase.domain.entity;

import com.example.projectbase.domain.entity.common.DateAuditing;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "vouchers")
public class Voucher extends DateAuditing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voucher_id", insertable = false, updatable = false, nullable = false)
    private int id;

    private String name;
    @Column(nullable = false)
    private String discount;

    @Column(nullable = false)
    private Date timeStart;

    @Column(nullable = false)
    private Date timeEnd;

    @Column(nullable = false)
    private int quantity;

    @OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL)
    List<VoucherDetail> voucherDetails = new ArrayList<>();


}