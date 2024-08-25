import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/LoginPage/Login';
import Register from './components/RegisterPage/Register';
import SearchResults from './components/HomePage/SearchResults';
// import Header from './components/HomePage/Header';
// import Footer from './components/HomePage/Footer';
// import ArtworkForm from './components/Artwork/ArtworkList';
import Home from './components/HomePage/Home'
import ArtworkFilter from './components/HomePage/ArtworkFilter';
import PrivateRoute from './PrivateRoute';
import ArtistDashboard from './components/HomePage/ArtistDashboard/ArtistDashboard';
import CartPage from './components/Cart/Cart'
import OrderConfirmationPage from './components/OrderConfirmationPage ';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import './App.css';

const App = () => {

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} /> */}
        {/* <Route path="/" element={<HomePage />} /> */}
            {/* Add more routes as needed for your application */}
         <Route path="/home" element={<Home />} />
         <Route path="*" element={<Login />} />
         <Route path="/cart" element={<CartPage />} />
         <Route path="/register" element={<Register />} />
         <Route path="/artist-dashboard" element={<ArtistDashboard />} />
         <Route path="/checkout" element={<CheckoutPage />} />
         <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
         {/* <Route path="/artistdashboard" element={<ArtistDashboard />} /> */}
         {/* <Route path="/filter" element={<ArtworkFilter />} /> */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/add-artwork" element={<ArtworkForm />} />
        </Route> */}
        {/* <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} /> */}
        {/* <Route path="/artist" element={token && role === 'artist' ? <ArtistDashboard /> : <Navigate to="/" />} /> */}
        {/* Add more routes as needed */}
      </Routes>
      
    </div>
  );
};
export default App;
