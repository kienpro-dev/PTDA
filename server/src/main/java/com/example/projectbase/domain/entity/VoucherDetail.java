package com.example.projectbase.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoucherDetail implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voucher_detail_id",insertable = false, updatable = false, nullable = false)
    private int id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "voucher_id", foreignKey = @ForeignKey(name = "FK_VOUCHER_CUSTOMER1"))
    private Voucher voucher;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "customer_id", foreignKey = @ForeignKey(name = "FK_VOUCHER_CUSTOMER2"))
    private Customer customer;

   @OneToOne(mappedBy = "voucherDetail")
   private Bill bill;

    @Column(nullable = false)
    private String status;
}
