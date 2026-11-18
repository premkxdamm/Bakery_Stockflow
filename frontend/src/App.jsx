import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatCards from './components/StatCards';
import ProductModal from './components/ProductModal';
import StockModal from './components/StockModal';
import { 
  getProducts, 
  getDashboardStats, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  adjustStock, 
  getCategories 
} from './api/api';
import { 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Layers, 
  AlertTriangle, 
  CheckCircle, 
  Plus, 
  ArrowUpDown
} from 'lucide-react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [stockProduct, setStockProduct] = useState(null);

  const [deleteId, setDeleteId] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [productsRes, statsRes, catRes] = await Promise.all([
        getProducts(search, selectedCategory, selectedStatus),
        getDashboardStats(),
        getCategories(),
      ]);
      setProducts(productsRes.data || []);
      setStats(statsRes.data || {});
      setCategories(catRes.data || []);
    } catch (err) {
      showToast(err.message || 'Failed to connect to backend', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory, selectedStatus]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSaveProduct = async (productData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
      showToast(`Updated "${productData.name}" successfully!`);
    } else {
      await createProduct(productData);
      showToast(`Added "${productData.name}" to inventory!`);
    }
    loadData();
  };

  const handleAdjustStock = async (id, quantityChanged) => {
    await adjustStock(id, quantityChanged);
    const action = quantityChanged > 0 ? `+${quantityChanged}` : `${quantityChanged}`;
    showToast(`Stock updated: ${action} units`);
    loadData();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct(deleteId);
      showToast('Product deleted from inventory.');
      setDeleteId(null);
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to delete product', 'error');
    }
  };

  return (
    <div className="app-layout">
      <Navbar
        onRefresh={loadData}
        onOpenAdd={() => {
          setEditingProduct(null);
          setIsProductModalOpen(true);
        }}
        loading={loading}
      />

      <main className="main-content">
        {toast && (
          <div className={`toast-notification toast-${toast.type}`}>
            {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            <span>{toast.message}</span>
          </div>
        )}

        <section className="hero-section">
          <div>
            <h2 className="hero-title">Bakery Items Inventory</h2>
            <p className="hero-subtitle">
              Monitor daily stock, adjust quantities, and manage bakery items with real-time alerts.
            </p>
          </div>
        </section>

        <StatCards
          stats={stats}
          onFilterStatus={(status) => setSelectedStatus(status)}
        />

        <section className="filter-card">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name (Bread, Pav, Cake...) or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch('')}>
                &times;
              </button>
            )}
          </div>

          <div className="filter-controls">
            <div className="select-wrapper">
              <Filter size={16} className="select-icon" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="ALL">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="status-pills">
              {['ALL', 'IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'].map((status) => (
                <button
                  key={status}
                  className={`status-pill-btn ${selectedStatus === status ? 'active' : ''}`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status === 'ALL'
                    ? 'All'
                    : status === 'IN_STOCK'
                    ? 'In Stock'
                    : status === 'LOW_STOCK'
                    ? 'Low Stock'
                    : 'Out of Stock'}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="table-card">
          <div className="table-header">
            <h3>
              Inventory Items{' '}
              <span className="count-tag">({products.length})</span>
            </h3>
            {(search || selectedCategory !== 'ALL' || selectedStatus !== 'ALL') && (
              <button
                className="btn-link"
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('ALL');
                  setSelectedStatus('ALL');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Category</th>
                  <th>Unit Price</th>
                  <th>Stock Quantity</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      Loading bakery items...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="empty-state">
                        <Layers size={36} color="#64748b" />
                        <p>No products found matching your filter criteria.</p>
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() => {
                            setEditingProduct(null);
                            setIsProductModalOpen(true);
                          }}
                        >
                          <Plus size={16} /> Add First Product
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((item) => (
                    <tr key={item.id} className={item.quantity === 0 ? 'row-out-of-stock' : ''}>
                      <td>
                        <div className="product-info">
                          <span className="product-name">{item.name}</span>
                          <span className="product-sku">{item.sku}</span>
                          {item.description && (
                            <span className="product-desc">{item.description}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="category-badge">{item.category}</span>
                      </td>
                      <td>
                        <strong className="price-tag">₹{Number(item.price).toFixed(2)}</strong>
                      </td>
                      <td>
                        <div className="stock-info">
                          <div className="stock-numbers">
                            <span className="current-qty">{item.quantity}</span>
                            <span className="min-qty">units</span>
                          </div>
                          <div className="stock-bar-bg">
                            <div
                              className={`stock-bar-fill ${
                                item.quantity === 0
                                  ? 'bar-danger'
                                  : item.quantity <= 5
                                  ? 'bar-warning'
                                  : 'bar-success'
                              }`}
                              style={{
                                width: `${Math.min(100, Math.max(10, (item.quantity / 15) * 100))}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge-status ${
                            item.status === 'IN_STOCK'
                              ? 'status-in-stock'
                              : item.status === 'LOW_STOCK'
                              ? 'status-low-stock'
                              : 'status-out-of-stock'
                          }`}
                        >
                          <span className="dot"></span>
                          {item.status === 'IN_STOCK'
                            ? 'In Stock'
                            : item.status === 'LOW_STOCK'
                            ? 'Low Stock Alert'
                            : 'Out of Stock'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn action-stock"
                            title="Quick Stock In / Stock Out"
                            onClick={() => {
                              setStockProduct(item);
                              setIsStockModalOpen(true);
                            }}
                          >
                            <ArrowUpDown size={15} />
                            <span>Stock</span>
                          </button>

                          <button
                            className="action-btn action-edit"
                            title="Edit Product Details"
                            onClick={() => {
                              setEditingProduct(item);
                              setIsProductModalOpen(true);
                            }}
                          >
                            <Edit2 size={15} />
                          </button>

                          <button
                            className="action-btn action-delete"
                            title="Delete Product"
                            onClick={() => setDeleteId(item.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        categories={categories}
      />

      <StockModal
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        onSave={handleAdjustStock}
        product={stockProduct}
      />

      {deleteId && (
        <div className="modal-backdrop">
          <div className="modal-content modal-sm">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <p style={{ margin: '1rem 0', color: '#374151', fontSize: '0.9rem' }}>
              Are you sure you want to remove this item from the bakery inventory? This action cannot be undone.
            </p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
