import React, { useEffect, useState } from 'react';
import '../../App.css';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const fetchProducts = async () => {
    try {
        const response = await fetch(`http://localhost:8080/product`);
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

function AdminHome() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts();
            setProducts(products);
        };

        getProducts();
    }, []);

    return (
        <>
            <br /><br />
            <div className="container">
                <button className="btn btn-outline-primary" onClick={() => { navigate('/product-add'); }}>
                    <FaPlus /> Add
                </button>
                <br /><br />
                <div className="row row-cols-1 g-2">
                    {products.map((product) => (
                        <div key={product.id} className="card d-flex shadow-sm">
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div className="">
                                    <h6 className="card-title">{product.name}</h6>
                                </div>
                                <div className="d-flex align-items-center ms-3">
                                    <button className="btn btn-outline-primary me-2" onClick={() => { navigate(`/product-update/${product._id}`); }}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={async () => {
                                        const response = await fetch(`http://localhost:8080/product/${product._id}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                        });
                                        if (!response.ok) {
                                            alert('Error..!! \nSomething went wrong!!');
                                            return;
                                        }
                                        alert('Product Remove Successfully!');
                                        const products = await fetchProducts();
                                        setProducts(products);
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

export default AdminHome;
