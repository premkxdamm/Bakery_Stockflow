package com.hackathon.backend.controller;

import com.hackathon.backend.model.InventoryTransaction;
import com.hackathon.backend.repository.InventoryTransactionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final InventoryTransactionRepository transactionRepository;

    public TransactionController(InventoryTransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @GetMapping
    public ResponseEntity<List<InventoryTransaction>> getRecentTransactions() {
        return ResponseEntity.ok(transactionRepository.findTop20ByOrderByCreatedAtDesc());
    }
}
