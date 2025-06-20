"use client"
import React, { useState, useEffect } from 'react';
import './style.css';

export default function POS() {
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        setLoading(true);
        const fetchedItems = [
            {id: 1, name: 'Coffee', price: 3.5},
            {id: 2, name: 'Tea', price: 2.5},
            {id: 3, name: 'Sandwich', price: 5.0},
            {id: 4, name: 'Cake', price: 4.0},
        ];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setItems(fetchedItems);
        setLoading(false);
    };

    useEffect(() => {
        handleFetch();
    }, []);

    const handleAddToCart = () => {
        if (selectedItem && quantity > 0) {
            const existingItem = cart.find(item => item.id === selectedItem.id);
            if (existingItem) {
                setCart(
                    cart.map(item =>
                        item.id === selectedItem.id
                            ? {...item, quantity: item.quantity + quantity}
                            : item
                    )
                );
            } else {
                setCart([...cart, {...selectedItem, quantity}]);
            }
            setSelectedItem(null);
            setQuantity(1);
        }
    };

    useEffect(() => {
        const newSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setSubtotal(newSubtotal);
        setTotal(newSubtotal);
    }, [cart]);

    const handleRemoveItem = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cart.length === 0) return;
        alert('Order submitted successfully!');
        setCart([]);
        setSubtotal(0);
        setTotal(0);
    };
    return(
        <></>
    )
}