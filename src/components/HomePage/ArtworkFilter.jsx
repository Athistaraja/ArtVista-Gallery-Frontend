// src/components/ArtworkFilter.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../API';
import'./ArtworkFilter.css';

const ArtworkFilter = () => {
  const [category, setCategory] = useState('');
  const [artworks, setArtworks] = useState([]);

  const fetchArtworks = async () => {
    try {
      const response = await axios.get(`${API}/artwork/filter?category=${category}`);
      setArtworks(response.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, [category]);

  return (
    <div>
      <h2>Filter Artworks by Category</h2>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All Categories</option>
        <option value="painting">Painting</option>
        <option value="sculpture">Sculpture</option>
        <option value="digital">Digital Art</option>
        <option value="digital">animation</option>
        {/* Add more categories as needed */}
      </select>
      <div className="artwork-list">
        {artworks.map((artwork) => (
          <div key={artwork._id} className="artwork-item">
            <h3>{artwork.title}</h3>
            <p>Artist: {artwork.artist.name}</p>
            <p>Category: {artwork.category}</p>
            <p>Price: ${artwork.price}</p>
            {artwork.imageUrl && <img src={artwork.imageUrl} alt={artwork.title} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworkFilter;
