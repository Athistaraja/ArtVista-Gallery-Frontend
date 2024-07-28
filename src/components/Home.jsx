import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../api/axios';
import { addItemToCart } from '../slices/cartSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.art);

  useEffect(() => {
    const fetchArtItems = async () => {
      try {
        const response = await axios.get('/art');
        dispatch({ type: 'art/fetchSuccess', payload: response.data });
      } catch (error) {
        dispatch({ type: 'art/fetchError', payload: error.message });
      }
    };

    fetchArtItems();
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  return (
    <div className="home-container">
      <h1>All Art Items</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="art-grid">
        {items.map(item => (
          <div key={item._id} className="art-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
