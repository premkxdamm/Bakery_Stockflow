import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export default function ProductModal({ isOpen, onClose, onSave, product, categories }) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        category: product.category || '',
        price: product.price || '',
        quantity: product.quantity ?? '',
        description: product.description || '',
      });
    } else {
      setFormData({
        name: '',
        sku: '',
        category: categories && categories.length > 0 ? categories[0] : 'Breads',
        price: '',
        quantity: 10,
        description: '',
      });
    }
    setError('');
  }, [product, categories, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.name.trim()) return setError('Product name is required.');
    if (!formData.sku.trim()) return setError('SKU code is required.');
    if (!formData.category.trim()) return setError('Category is required.');
    if (formData.price === '' || Number(formData.price) < 0) return setError('Please enter a valid price (≥ 0).');
    if (formData.quantity === '' || Number(formData.quantity) < 0) return setError('Please enter a valid quantity (≥ 0).');

    try {
      setSubmitting(true);
      await onSave({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{product ? 'Edit Bakery Item' : 'Add New Bakery Item'}</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && <div className="alert-box alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group flex-1">
              <label>Bakery Item Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Milk Bread, Ladi Pav, Cream Roll..."
                required
              />
            </div>
            <div className="form-group flex-1">
              <label>SKU Code *</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. BAKE-BRD-001"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Category *</label>
              <input
                type="text"
                name="category"
                list="category-suggestions"
                value={formData.category}
                onChange={handleChange}
                placeholder="Select or enter category"
                required
              />
              <datalist id="category-suggestions">
                <option value="Breads" />
                <option value="Cakes" />
                <option value="Biscuits" />
                <option value="Confectionery" />
                <option value="Pastries" />
                {categories && categories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>

            <div className="form-group flex-1">
              <label>Price (₹) *</label>
              <input
                type="number"
                name="price"
                step="0.50"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Stock Quantity (Units) *</label>
            <input
              type="number"
              name="quantity"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="10"
              required
            />
          </div>

          <div className="form-group">
            <label>Description / Notes</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Freshly baked white bread 400g pack..."
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Check size={16} />
              <span>{submitting ? 'Saving...' : product ? 'Update Item' : 'Add Item'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
