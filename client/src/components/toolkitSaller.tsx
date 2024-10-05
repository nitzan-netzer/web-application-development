'use client';

import React, { useState } from 'react';
import { createProduct } from '@/srcapi/nitApi';

import '../styles/ToolkitSaller.css'; 

const ToolkitSaller = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleCreateProduct = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Call the createProduct function with the input values

            const product = { name, image, category, description, price, quantity,status: 'available' };
            await createProduct(product);
            setSuccess(true);
        } catch (error) {
            setError('Error creating product: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="toolkitSaller">
            <h1>Create Product</h1>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Product created successfully!</p>}

            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>

            <div>
                <label>Image URL:</label>
                <input 
                    type="text" 
                    value={image} 
                    onChange={(e) => setImage(e.target.value)} 
                />
            </div>

            <div>
                <label>Category:</label>
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="clothes">clothes</option>
                    <option value="electrical">electrical</option>
                    <option value="jewelry">jewelry</option>
                    <option value="musical">musical</option>
                    <option value="sport">sport</option>
                    <option value="toys">toys</option>
                </select>
            </div>

            <div>
                <label>Description:</label>
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>

            <div>
                <label>Price:</label>
                <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(parseFloat(e.target.value))} 
                />
            </div>

            <div>
                <label>Quantity:</label>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(parseInt(e.target.value))} 
                />
            </div>

            <button onClick={handleCreateProduct} disabled={loading}>
                Create Product
            </button>
        </div>
    );
};

export default ToolkitSaller;
