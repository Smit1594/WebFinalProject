import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/product"  element={<Home/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
