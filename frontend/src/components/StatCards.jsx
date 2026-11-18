import React from 'react';
import { Package, Boxes, AlertTriangle, XCircle, IndianRupee } from 'lucide-react';

export default function StatCards({ stats, onFilterStatus }) {
  const {
    totalProducts = 0,
    totalStockUnits = 0,
    totalInventoryValue = 0,
    lowStockCount = 0,
    outOfStockCount = 0,
  } = stats || {};

  return (
    <div className="stat-grid">
      {/* Total Products */}
      <div className="stat-card" onClick={() => onFilterStatus('ALL')}>
        <div className="stat-icon-wrapper bg-blue">
          <Package size={22} color="#38bdf8" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Bakery Items</span>
          <span className="stat-value">{totalProducts}</span>
          <span className="stat-helper">Capacity: up to 50 items</span>
        </div>
      </div>

      {/* Total Stock Units */}
      <div className="stat-card">
        <div className="stat-icon-wrapper bg-indigo">
          <Boxes size={22} color="#818cf8" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Stock Units</span>
          <span className="stat-value">{totalStockUnits.toLocaleString()}</span>
          <span className="stat-helper">Units on shelves</span>
        </div>
      </div>

      {/* Total Inventory Value */}
      <div className="stat-card">
        <div className="stat-icon-wrapper bg-emerald">
          <IndianRupee size={22} color="#34d399" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Inventory Valuation</span>
          <span className="stat-value">₹{totalInventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <span className="stat-helper">Quantity × Price</span>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div 
        className={`stat-card cursor-pointer ${lowStockCount > 0 ? 'border-amber' : ''}`}
        onClick={() => onFilterStatus('LOW_STOCK')}
        title="Click to filter low stock items"
      >
        <div className="stat-icon-wrapper bg-amber">
          <AlertTriangle size={22} color="#fbbf24" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Low Stock Alerts</span>
          <span className="stat-value text-amber">{lowStockCount}</span>
          <span className="stat-helper">Below minimum level</span>
        </div>
      </div>

      {/* Out of Stock */}
      <div 
        className={`stat-card cursor-pointer ${outOfStockCount > 0 ? 'border-rose' : ''}`}
        onClick={() => onFilterStatus('OUT_OF_STOCK')}
        title="Click to filter out of stock items"
      >
        <div className="stat-icon-wrapper bg-rose">
          <XCircle size={22} color="#f87171" />
        </div>
        <div className="stat-content">
          <span className="stat-label">Out of Stock</span>
          <span className="stat-value text-rose">{outOfStockCount}</span>
          <span className="stat-helper">Needs fresh baking</span>
        </div>
      </div>
    </div>
  );
}
