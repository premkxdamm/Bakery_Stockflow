package com.hackathon.backend.repository;

import com.hackathon.backend.model.InventoryTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {

    List<InventoryTransaction> findTop20ByOrderByCreatedAtDesc();

    List<InventoryTransaction> findByNameOrderByCreatedAtDesc(String name);
}