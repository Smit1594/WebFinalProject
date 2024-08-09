import React, { useEffect, useState } from 'react';
import '../App.css';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CartPage() {
    const navigate = useNavigate();
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        fetchCarts();
    }, []);

    const fetchCarts = async () => {
        try {
            const response = await fetch(`http://localhost:8080/cart`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCarts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
    const removeFromCart = async (id) => {
        const response = await fetch(`http://localhost:8080/cart/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            alert('Error..!! \nSomething went wrong!!');
            return;
        }
        alert('Product Remove From Cart Successfully!');
        fetchCarts();
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
                                        <td>{item.quantity}</td>
                                        <td>${(item.product_id.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => removeFromCart(item._id)}>Remove</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <button type="submit" className="btn btn-primary" onClick={() => {
                            navigate('/checkout')
                        }}>Checkout</button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartPage;
