package com.hackathon.backend.dto;

public class StockUpdateRequest {

    private Integer quantityChanged;
    private String reason;

    public StockUpdateRequest() {
    }

    public StockUpdateRequest(Integer quantityChanged, String reason) {
        this.quantityChanged = quantityChanged;
        this.reason = reason;
    }

    public Integer getQuantityChanged() {
        return quantityChanged;
    }

    public void setQuantityChanged(Integer quantityChanged) {
        this.quantityChanged = quantityChanged;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}

