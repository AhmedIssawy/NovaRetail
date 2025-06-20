// components/ProductTable.js
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {ChevronLeft} from 'lucide-react'
import style from "./style.css"


export default function ProductTable({products}) {
    const [selectedRows, setSelectedRows] = useState([]);
    const router = useRouter();


    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(products.map((prod) => prod.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    return (
        <>
            {/* Styles are imported from a CSS file */}
            <div className="container">
                <div className="row-header">
                 <div className="left-side">
                        <a>
                            <ChevronLeft onClick={() => router.back()} style={{ cursor: 'pointer' ,}} className="icon" />
                        </a>
                     <h1 className="title">Products</h1>
                 </div>
                    <button type="submit" className="submit-button" onClick={() => router.push('/products/new')}>Add Product</button>
                </div>

                <div className="table-wrapper">
                    <table className="styled-table">
                        <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={selectedRows.length === products.length}
                                />
                            </th>
                            <th>Product Name</th>
                            <th>Category Name</th>
                            <th>Status</th>
                            <th>Price ($)</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(product.id)}
                                        onChange={() => handleSelectRow(product.id)}
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>
                    <span
                        className={
                            product.status === 'In Stock'
                                ? 'status-badge in-stock'
                                : 'status-badge out-of-stock'
                        }
                    >
                      {product.status}
                    </span>
                                </td>
                                <td>{product.price.toFixed(2)}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    {/* Dropdown menu */}
                                    <div className="dropdown">
                                        <button className="dropbtn">⋮</button>
                                        <div className="dropdown-content">
                                            <a href="#">Edit</a>
                                            <a href="#">View Details</a>
                                            <a href="#">View Analytics</a>
                                            <a href="#">Remove</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}