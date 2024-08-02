import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/Cart';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/product"  element={<Home/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
