import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/login?username=${formData.username}&password=${formData.password}`);
            const data = await response.json();

            if (!response.ok) {
                alert(`${data.message}`);
                return;
            }
            alert(`${data.message}`);
            localStorage.setItem('userRole', data.data.role);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error Login:', error);
        }
    };

    return (
        <div>
            <br /><br /><br /><br />
            <div className="container card card-body text-center" style={{ width: '40%' }}>
                <h2>Login</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" id="username" name="username" className="form-control" placeholder='Enter User Name' value={formData.username}
                            onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" id="password" name="password" className="form-control" placeholder='Enter Password' value={formData.password}
                            onChange={handleChange} required />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
