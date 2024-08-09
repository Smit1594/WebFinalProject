import React, { useEffect, useState } from 'react';
import '../../App.css';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const fetchCategories = async () => {
    try {
        const response = await fetch(`http://localhost:8080/category`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

function Category() {
    const [categories, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            const categories = await fetchCategories();
            setProducts(categories);
        };

        fetchCategory();
    }, []);

    return (
        <>
            <br />
            <div className="container">
                <button className="btn btn-outline-primary" onClick={() => { navigate('/category-add'); }}>
                    <FaPlus /> Add
                </button>
                <br /><br />
                <div className="row row-cols-1 g-2">
                    {categories.map((category) => (
                        <div key={category.id} className="card d-flex shadow-sm">
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div className="">
                                    <h6 className="card-title">{category.name}</h6>
                                </div>
                                <div className="d-flex align-items-center ms-3">
                                    <button className="btn btn-outline-primary me-2" onClick={() => { navigate(`/category-update/${category._id}`); }}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={async () => {
                                        const response = await fetch(`http://localhost:8080/category/${category._id}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                        });
                                        if (!response.ok) {
                                            alert('Error..!! \nSomething went wrong!!');
                                            return;
                                        }
                                        alert('Category Remove Successfully!');
                                        const categories = await fetchCategories();
                                        setProducts(categories);
                                    }}>
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <br /><br />
        </>
    );
}

export default Category;
