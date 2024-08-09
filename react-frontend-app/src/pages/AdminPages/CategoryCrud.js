import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryCrud = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: ''
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
            const getCategory = async () => {
                const response = await fetch(`http://localhost:8080/category/${id}`);
                if (!response.ok) {
                    alert('Error..!! \nSomething went wrong!!')
                    return;
                }
                const category = await response.json();
                setFormData({
                    name: category.name,
                    description: category.description
                });
            };
            getCategory();
        }
    }, [id]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (id) {
                const response = await fetch(`http://localhost:8080/category/${id}`, {
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
                alert(`Category updated successfully!`);
                navigate('/category');
            } else {
                const response = await fetch('http://localhost:8080/category', {
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
                alert(`Category added successfully!`);
                navigate('/category');
            }
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Failed to add category.');
        }
    };

    return (
        <div className="container">
            <br />
            <h2>{id ? 'Update' : 'Add'} Category</h2>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CategoryCrud;
