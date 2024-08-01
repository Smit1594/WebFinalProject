import '../App.css';
import { useEffect, useState } from 'react';

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


function ProductDetails() {
    // const { id } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts();
            setProduct(products[0]);
        };

        getProducts(); 
    }, []);
    const [quantity, setQuantity] = useState(product.quantity);

    return (
        <>
            <div className="container">
                <div className=" mb-4">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={product.image} className="card-img" alt={product.name} style={{ height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>Price: ${product.price}</strong></p>
                                <div className="d-flex align-items-center">
                                    <div className="form-group mr-3">
                                        <label htmlFor="quantity">Quantity</label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            className="form-control"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            min="1"
                                        />
                                    </div>
                                    <button className="btn btn-primary mt-4" style={{ marginLeft: 10 }} onClick={{}}>
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
