import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Clock } from 'lucide-react';
import { getRecentTransactions } from '../api/api';

export default function TransactionModal({ isOpen, onClose }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await getRecentTransactions();
      setTransactions(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load transaction history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadTransactions();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content modal-lg">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={20} color="#818cf8" />
            <h3>Stock Movement History</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && <div className="alert-box alert-danger">{error}</div>}

        <div className="modal-body">
          {loading ? (
            <div className="empty-state">
              <RefreshCw size={24} className="spin" />
              <p>Loading transactions...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="empty-state">
              <p>No stock changes recorded yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity Changed</th>
                    <th>Previous Stock</th>
                    <th>New Stock</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>
                        <strong>{tx.name}</strong>
                      </td>
                      <td>
                        <strong style={{ color: tx.quantityChanged > 0 ? '#10b981' : '#f87171' }}>
                          {tx.quantityChanged > 0 ? `+${tx.quantityChanged}` : tx.quantityChanged}
                        </strong>
                      </td>
                      <td>{tx.previousQuantity}</td>
                      <td>
                        <strong>{tx.newQuantity}</strong>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                        {tx.createdAt ? new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={loadTransactions} disabled={loading}>
            <RefreshCw size={14} className={loading ? "spin" : ""} /> Refresh Log
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
