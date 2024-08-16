import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductCrud = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrl: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                const response = await fetch(`http://localhost:8080/product/${id}`);
                if (!response.ok) {
                    alert('Error..!! \nSomething went wrong!!')
                    return;
                }
                const product = await response.json();
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    stock: product.stock,
                    imageUrl: product.imageUrl
                });
            };
            getProduct();
        }
    }, [id]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (id) {
                const response = await fetch(`http://localhost:8080/product/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    alert('Error..!! \nSomething went wrong!!')
                    return;
                }
                alert(`Product updated successfully!`);
                navigate('/product');
            } else {
                const response = await fetch('http://localhost:8080/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    alert('Error..!! \nSomething went wrong!!')
                    return;
                }
                alert(`Product added successfully!`);
                navigate('/product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product.');
        }
    };

    return (
        <div className="container">
            <br />
            <h2>{id ? 'Update' : 'Add'} Product</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name="name" className="form-control" value={formData.name}
                        onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" name="description" className="form-control" rows="3" value={formData.description}
                        onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" id="price" name="price" className="form-control" value={formData.price}
                        onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" id="category" name="category" className="form-control" value={formData.category}
                        onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image Url</label>
                    <input type="text" id="imageUrl" name="imageUrl" className="form-control" value={formData.imageUrl}
                        onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock Quantity</label>
                    <input type="text" id="stock" name="stock" className="form-control" value={formData.stock}
                        onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default ProductCrud;
