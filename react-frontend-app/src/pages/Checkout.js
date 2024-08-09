import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
    const [carts, setCarts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/cart`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCarts(data);
                const subtotal = carts.reduce((accumulator, product) => {
                    if (product && product.product_id) {
                        return accumulator + product.product_id.price * product.quantity;
                    }
                    return accumulator;
                }, 0);

                const tax = subtotal * 0.13;
                const total = subtotal + tax;

                setSubtotal(subtotal);
                setTotal(total);
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            }
        };

        fetchCarts();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        alert('Order Placed Successfully.');
        navigate('/');
    };

    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center mb-4">Checkout Process</h1>  
                {carts.length === 0 ? (
                    <p>Please Select Item First.</p>
                ) : (
                    <div>
                        <h4>Order Summary</h4>
                        <div className="container card card-body">
                             {carts.map((item, index) => (
                                <div><b>{item.product_id.name}</b> : <span>{item.product_id.price}</span> * <span>{item.quantity}</span> = <span>${item.product_id.price * item.quantity}</span></div>
                             ))}
                            <br />
                            <div>Subtotal  : <span>${subtotal.toFixed(2)}</span></div>
                            <div>Tax (13%) : <span>${subtotal * 0.13.toFixed(2)}</span></div>
                            <div>Total     : <span>${total.toFixed(2)}</span></div>
                        </div>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <h4>Enter Contact Detail</h4>
                            <div className="container card card-body">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" id="name" name="name" className="form-control" value={formData.name}
                                        onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" id="email" name="email" className="form-control" value={formData.email}
                                        onChange={handleChange} required />
                                </div>
                            </div>
                            <br />
                            <h4 className='mb-2'>Enter Shipping Address</h4>
                            <div className="container card card-body">
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" id="address" name="address" className="form-control" value={formData.address}
                                        onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" id="city" name="city" className="form-control" value={formData.city}
                                        onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="province" className="form-label">Province</label>
                                    <input type="text" id="province" name="province" className="form-control" value={formData.province}
                                        onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="postalCode" className="form-label">Postal Code</label>
                                    <input type="text" id="postalCode" name="postalCode" className="form-control" value={formData.postalCode}
                                        onChange={handleChange} required />
                                </div>
                            </div>
                            <br />
                            <h4>Enter Payment Details</h4>
                            <div className="container card card-body">
                                <div className="mb-3">
                                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                    <input type="text" id="cardNumber" name="cardNumber" className="form-control" value={formData.cardNumber}
                                        onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                    <input type="text" id="expiryDate" name="expiryDate" className="form-control" value={formData.expiryDate}
                                        onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cvv" className="form-label">CVV</label>
                                    <input type="number" id="cvv" name="cvv" className="form-control" value={formData.cvv}
                                        onChange={handleChange} required />
                                </div>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">Place Your Order</button>
                            <br /><br /><br />
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default CheckoutPage;
