package com.example.projectbase.repository;

import com.example.projectbase.domain.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill,Integer> {
    @Transactional
    @Modifying
    @Query("UPDATE Bill b SET b.customer.id = ?2 WHERE b.id = ?1")
    void addBillForCustomer(int id, int customerId);

    @Query("SELECT b FROM Bill b WHERE b.id = ?2 AND b.customer.id = ?1")
    Optional<Bill> findByCustomerIdAndBillId(int customerId, int billId);

    @Transactional
    @Modifying
    @Query("UPDATE Bill b SET b.status = ?2 WHERE b.id = ?1")
    void cancelledBill(int id,String status);
}
