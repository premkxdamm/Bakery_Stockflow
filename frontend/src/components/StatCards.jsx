import React from 'react';
import { Package, Boxes, AlertTriangle, XCircle, IndianRupee } from 'lucide-react';

export default function StatCards({ stats, onFilterStatus }) {
  const safeStats = stats || {};
  const totalProducts = Number(safeStats.totalProducts) || 0;
  const totalStockUnits = Number(safeStats.totalStockUnits) || 0;
  const totalInventoryValue = Number(safeStats.totalInventoryValue) || 0;
  const lowStockCount = Number(safeStats.lowStockCount) || 0;
  const outOfStockCount = Number(safeStats.outOfStockCount) || 0;

  return (
    <div className="stat-grid">
      <div className="stat-card" onClick={() => onFilterStatus('ALL')}>
        <div className="stat-icon-wrapper bg-blue">
          <Package size={22} color="#0284c7" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Bakery Items</span>
          <span className="stat-value">{totalProducts}</span>
          <span className="stat-helper">Active items</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper bg-indigo">
          <Boxes size={22} color="#0d9488" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Stock Units</span>
          <span className="stat-value">{totalStockUnits.toLocaleString()}</span>
          <span className="stat-helper">Units on shelves</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper bg-emerald">
          <IndianRupee size={22} color="#16a34a" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Inventory Valuation</span>
          <span className="stat-value">₹{totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span className="stat-helper">Quantity × Price</span>
        </div>
      </div>

      <div 
        className={`stat-card cursor-pointer ${lowStockCount > 0 ? 'border-amber' : ''}`}
        onClick={() => onFilterStatus('LOW_STOCK')}
        title="Click to filter low stock items"
      >
        <div className="stat-icon-wrapper bg-amber">
          <AlertTriangle size={22} color="#d97706" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Low Stock Alerts</span>
          <span className="stat-value text-amber">{lowStockCount}</span>
          <span className="stat-helper">Stock &le; 5 units</span>
        </div>
      </div>

      <div 
        className={`stat-card cursor-pointer ${outOfStockCount > 0 ? 'border-rose' : ''}`}
        onClick={() => onFilterStatus('OUT_OF_STOCK')}
        title="Click to filter out of stock items"
      >
        <div className="stat-icon-wrapper bg-rose">
          <XCircle size={22} color="#dc2626" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Out of Stock</span>
          <span className="stat-value text-rose">{outOfStockCount}</span>
          <span className="stat-helper">0 units left</span>
        </div>
      </div>
    </div>
  );
}
