package com.example.projectbase.domain.entity;

import com.example.projectbase.domain.entity.common.DateAuditing;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "bills")
public class Bill extends DateAuditing {
    @Id
    @Column(name = "bill_id",insertable = false, updatable = false, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(nullable = false)
    private double payment;

    //ten nguoi nhan
    @Column(nullable = false)
    private String nameCustomer;


    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private Date timeShip;

    @Column(nullable = false)
    private double distance;

    @Column(nullable = false)
    private double feeShip;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String status;

    @OneToMany(mappedBy = "bill",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<BillDetail> billDetail;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "customer_id",foreignKey = @ForeignKey(name = "FK_CUSTOMER_BILL"),referencedColumnName = "id")
    private Customer customer;

    @OneToOne
    @JoinColumn(name = "voucher_detail_id",foreignKey = @ForeignKey(name = "FK_VOUCHER_DETAIL_BILL"),referencedColumnName = "voucher_detail_id")
    private VoucherDetail voucherDetail;
}

