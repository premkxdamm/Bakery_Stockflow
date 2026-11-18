package com.hackathon.backend.dto;

public class StockUpdateRequest {

    private Integer quantityChanged;

    public StockUpdateRequest() {
    }

    public StockUpdateRequest(Integer quantityChanged) {
        this.quantityChanged = quantityChanged;
    }

    public Integer getQuantityChanged() {
        return quantityChanged;
    }

    public void setQuantityChanged(Integer quantityChanged) {
        this.quantityChanged = quantityChanged;
    }
}
