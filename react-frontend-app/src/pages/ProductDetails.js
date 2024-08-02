import { useParams } from 'react-router-dom';
import '../App.css';
import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            const product = await fetchProduct(id);
            setProduct(product);
        };

        getProduct();
    }, [id]);

    const fetchProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8080/product/${productId}`);
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    
    const addToCart = async (productId, qty) => {
        try {
            const response = await fetch('http://localhost:8080/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product_id: productId, quantity: qty }),
            });
            setShowAlert(true);
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    return (
        <>
            <br /><br />
            <div className="container">
                {showAlert && (
                    <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                        {product.name} added successfully to cart 
                    </Alert>
                )}
                <div className=" mb-4">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={product.imageUrl} className="card-img" alt={product.name} style={{ height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>Price: ${product.price}</strong></p>
                                <div className="d-flex align-items-center">
                                    <div className="form-group mr-3">
                                        <label>Quantity</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            className="form-control"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            min="1"
                                        />
                                    </div>
                                    <button className="btn btn-primary mt-4" style={{ marginLeft: 10 }} onClick={() => addToCart(product._id, quantity)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
