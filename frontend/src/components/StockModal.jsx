import React, { useState } from 'react';
import { X, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function StockModal({ isOpen, onClose, onSave, product }) {
  const [type, setType] = useState('IN');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !product) return null;

  const currentQty = product.quantity || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const qtyNumber = parseInt(quantity, 10);
    if (!qtyNumber || qtyNumber <= 0) {
      return setError('Please enter a positive quantity.');
    }

    if (type === 'OUT' && qtyNumber > currentQty) {
      return setError(`Cannot remove ${qtyNumber} units. Only ${currentQty} in stock!`);
    }

    const change = type === 'IN' ? qtyNumber : -qtyNumber;

    try {
      setSubmitting(true);
      await onSave(product.id, change);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update stock');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content modal-sm">
        <div className="modal-header">
          <div>
            <h3>Adjust Stock Level</h3>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              {product.name} ({product.sku})
            </span>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && <div className="alert-box alert-danger">{error}</div>}

        <div className="current-stock-banner">
          <span>Current Shelf Stock:</span>
          <strong>{currentQty} units</strong>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="stock-toggle">
            <button
              type="button"
              className={`toggle-btn ${type === 'IN' ? 'active in' : ''}`}
              onClick={() => setType('IN')}
            >
              <ArrowUpCircle size={18} />
              <span>Stock In (+)</span>
            </button>
            <button
              type="button"
              className={`toggle-btn ${type === 'OUT' ? 'active out' : ''}`}
              onClick={() => setType('OUT')}
            >
              <ArrowDownCircle size={18} />
              <span>Stock Out (-)</span>
            </button>
          </div>

          <div className="form-group">
            <label>Units to {type === 'IN' ? 'Add' : 'Remove'} *</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 5"
              autoFocus
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className={`btn ${type === 'IN' ? 'btn-success' : 'btn-danger'}`} disabled={submitting}>
              <span>{submitting ? 'Updating...' : `Confirm ${type === 'IN' ? 'Stock In (+)' : 'Stock Out (-)'}`}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
