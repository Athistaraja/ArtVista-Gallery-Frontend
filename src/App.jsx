import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import ArtistDashboard from './components/ArtistDashboard';
import { selectAuthToken, selectAuthRole } from './selectors/authSelectors';
import './App.css';

const App = () => {
  const token = useSelector(selectAuthToken);
  const role = useSelector(selectAuthRole);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/artist" element={token && role === 'artist' ? <ArtistDashboard /> : <Navigate to="/" />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
      
    </div>
  );
};

export default App;
