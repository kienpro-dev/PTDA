package com.example.projectbase.repository;

import com.example.projectbase.domain.dto.CustomerDto;
import com.example.projectbase.domain.entity.Address;
import com.example.projectbase.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM Customer c WHERE c.id = ?1")
    Optional<Customer> findById(int id);

    @Transactional
    @Modifying
    @Query("UPDATE Customer c SET c.fullName = ?1, c.dob = ?2, c.phoneNumber = ?3, c.lastModifiedDate = CURRENT_TIMESTAMP where c.id = ?4")
    void updateCustomer(String fullName, Date date, String phoneNumber, int id);

    @Transactional
    @Modifying
    @Query("UPDATE Customer c SET c.address.id = ?1, c.lastModifiedDate = CURRENT_TIMESTAMP where c.id = ?2")
    void saveLocation(int addressId, int id);
}
