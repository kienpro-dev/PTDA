package com.example.projectbase.repository;

import com.example.projectbase.domain.dto.response.BillResponseDto;
import com.example.projectbase.domain.dto.response.StatisticResponseDto;
import com.example.projectbase.domain.entity.BillDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillDetailRepository extends JpaRepository<BillDetail,Integer> {
    @Query("SELECT new com.example.projectbase.domain.dto.response." +
            "BillResponseDto(b.id, b.nameCustomer, b.address, b.phoneNumber, b.timeShip, b.distance, b.feeShip, b.payment, spd.product.id, spd.shop.id, s.name, a.addressName , " +
            "p.name, p.image, cd.quantity, p.price,b.status) FROM Bill b INNER JOIN b.customer c INNER JOIN c.cart ct INNER JOIN ct.cartDetails cd INNER JOIN " +
            "cd.shopProductDetail spd INNER JOIN spd.product p INNER JOIN spd.shop s INNER JOIN s.address a WHERE b.id = ?1")
    List<BillResponseDto> findBillDetail(int billId);

    @Query("SELECT new com.example.projectbase.domain.dto.response.StatisticResponseDto(s.id, s.name, SUM(bd.quantity), SUM(b.payment), " +
            "SUM(CASE WHEN b.status = 'Đang giao hàng' THEN 1 ELSE 0 END), SUM(CASE WHEN b.status = 'Đã giao' THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN b.status = 'Đã hủy' THEN 1 ELSE 0 END)) FROM BillDetail bd INNER JOIN bd.bill b INNER JOIN b.customer " +
            "c INNER JOIN c.cart ct INNER JOIN ct.cartDetails cd ON cd.cart.id = ct.id AND cd.product.id = bd.product.id " +
            "INNER JOIN cd.shopProductDetail spd INNER JOIN spd.shop s GROUP BY s.id, s.name")
    List<StatisticResponseDto> statisticShops();

    @Query("SELECT new com.example.projectbase.domain.dto.response.StatisticResponseDto(s.id, s.name, SUM(bd.quantity), SUM(b.payment), " +
            "SUM(CASE WHEN b.status = 'Đang giao hàng' THEN 1 ELSE 0 END), SUM(CASE WHEN b.status = 'Đã giao' THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN b.status = 'Đã hủy' THEN 1 ELSE 0 END)) FROM BillDetail bd INNER JOIN bd.bill b INNER JOIN b.customer " +
            "c INNER JOIN c.cart ct INNER JOIN ct.cartDetails cd ON cd.cart.id = ct.id AND cd.product.id = bd.product.id " +
            "INNER JOIN cd.shopProductDetail spd INNER JOIN spd.shop s WHERE s.id = ?1 GROUP BY s.id, s.name")
    StatisticResponseDto statisticShop(int shopId);

    @Query("SELECT bd FROM BillDetail bd WHERE bd.bill.timeShip > CURRENT_TIMESTAMP AND bd.bill.customer.id = ?1")
    List<BillDetail> getCustomerBills(int customerId);

    @Query("SELECT bd FROM BillDetail bd WHERE bd.bill.timeShip <= CURRENT_TIMESTAMP AND bd.bill.customer.id = ?1")
    List<BillDetail> getHistoryBuy(int customerId);
}
