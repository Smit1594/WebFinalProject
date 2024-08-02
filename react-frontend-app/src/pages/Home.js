import React, { useEffect, useState } from 'react';
import '../App.css';
import image from '../Assets/cover.jpg';
import { Link } from 'react-router-dom';

const fetchProducts = async (endpoint) => {
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

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts();
            setProducts(products);
        };

        getProducts();
    }, []);

    return (
        <>
            <img src={image} alt={image} className="card-img-top" style={{ height: 400, objectFit: 'cover' }} />
            <br /><br /><br /><br />
            <div className="container">
                <h2 className="mb-4">Today's Collection</h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-2">
                    {products.map((product) => (
                        <div key={product.id} className="col d-flex">
                            <Link to={`/product/${product._id}`} className="text-decoration-none">
                                <div className="card shadow-sm h-100 w-100">
                                    <img src={product.imageUrl} alt={product.name} className="card-img-top" style={{ height: 150, width:"100%",objectFit: 'cover' }} />
                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title">{product.name}</h6>
                                        <p className="card-text">{product.description}</p>
                                        <small className="text-muted mt-auto">${product.price}</small>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div >
            <br /><br />
        </>
    );
}

export default Home;
