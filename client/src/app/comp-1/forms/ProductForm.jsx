"use client"
import React, { useState } from "react";

export default function ProductForm() {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        status: "In Stock",
        price: "",
        quantity: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Product added: ${JSON.stringify(formData, null, 2)}`);
        // Add your logic here for form submission
    };

    return (
        <div className="form-wrapper">
            <h2 className="form-title">Add New Product</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Category Name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Price ($)</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Add Product</button>
            </form>

            <style jsx>{`
        .form-wrapper {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin-top: 20px;
          margin-left: auto;
          margin-right: auto;
        }

        .form-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 20px;
          margin-bottom: 20px;
          color: #111827;
        }

        .product-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          margin-bottom: 6px;
          color: #374151;
        }

        input,
        select {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        input:focus,
        select:focus {
          border-color: #3b82f6;
        }

        .submit-button {
          margin-top: 20px;
          padding: 12px;
          background-color: #3b82f6;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .submit-button:hover {
          background-color: #2563eb;
        }
      `}</style>
        </div>
    );
};