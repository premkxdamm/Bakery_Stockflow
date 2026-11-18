import React from 'react';
import { Package, RefreshCw, Plus } from 'lucide-react';

export default function Navbar({ onRefresh, onOpenAdd, loading }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">
          <Package size={22} color="#ffffff" />
        </div>
        <div>
          <h1 className="brand-title">Bakery StockFlow</h1>
          <span className="brand-subtitle">Bakery Items Inventory System</span>
        </div>
      </div>

      <div className="nav-actions">
        <button 
          className="btn btn-secondary" 
          onClick={onRefresh}
          disabled={loading}
          title="Refresh dashboard data"
        >
          <RefreshCw size={16} className={loading ? "spin" : ""} />
          <span>Refresh</span>
        </button>

        <button 
          className="btn btn-primary" 
          onClick={onOpenAdd}
        >
          <Plus size={16} />
          <span>Add Item</span>
        </button>
      </div>
    </nav>
  );
}
