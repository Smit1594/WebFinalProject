import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import CartPage from './Pages/Cart';
import AdminHome from './Pages/AdminPages/AdminHome';
import Category from './Pages/AdminPages/Category';
import CategoryCrud from './Pages/AdminPages/CategoryCrud';
import ProductCrud from './Pages/AdminPages/ProductCrud';
import React from 'react';
import LoginPage from './Pages/Authentication/login';
import CheckoutPage from './Pages/Checkout';

function App() {
  const userRole = localStorage.getItem('userRole');

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {userRole === 'admin' && (
          <React.Fragment>
            <Route path="/dashboard" element={<AdminHome />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category-add" element={<CategoryCrud />} />
            <Route path="/category-update/:id" element={<CategoryCrud />} />
            <Route path="/product-add" element={<ProductCrud />} />
            <Route path="/product-update/:id" element={<ProductCrud />} />
          </React.Fragment>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
