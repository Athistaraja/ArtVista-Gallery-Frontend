import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from './API';

const ArtistDashboard = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const token = localStorage.getItem('x-auth-token');
        const response = await axios.get(`${API}/artwork/`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div>
      <h1>Artist Dashboard</h1>
      {artworks.map((artwork) => (
        <div key={artwork._id}>
          <h3>{artwork.title}</h3>
          <p>Artist: {artwork.artist.username}</p> {/* Display the artist's name */}
          <p>{artwork.description}</p>
          <p>Rs.{artwork.price}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default ArtistDashboard;
