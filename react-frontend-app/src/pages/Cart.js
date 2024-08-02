import React, { useEffect, useState } from 'react';
import '../App.css';
import { Button, Table } from 'react-bootstrap';


const fetchCarts = async () => {
    try {
        const response = await fetch(`http://localhost:8080/cart`);
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

function CartPage() {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        const getCarts = async () => {
            const carts = await fetchCarts();
            setCarts(carts);
        };

        getCarts();
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = carts.filter(item => item._id !== id);
        setCarts(updatedCart);
    };

    return (
        <>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Your Cart</h2>
                {carts.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{item.product_id.name}</td>
                                        <td>${item.product_id.price.toFixed(2)}</td>
                                        <td>
                                            <input
                                                type="number"
                                                id={`quantity-${item.id}`}
                                                className="form-control"
                                                value={item.quantity}
                                                onChange={(e) => {}}
                                                min="1"
                                            />
                                        </td>
                                        <td>${(item.product_id.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => removeFromCart(item._id)}>Remove</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartPage;
