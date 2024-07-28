import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtItems } from '../slices/artSlice';
import { addArtItem, updateArtItem, deleteArtItem } from '../slices/artSlice';
import './ArtistDashboard.css';

const ArtistDashboard = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.art);

  useEffect(() => {
    dispatch(fetchArtItems());
  }, [dispatch]);

  const handleAddArt = (newArt) => {
    dispatch(addArtItem(newArt));
  };

  const handleUpdateArt = (updatedArt) => {
    dispatch(updateArtItem(updatedArt));
  };

  const handleDeleteArt = (artId) => {
    dispatch(deleteArtItem(artId));
  };

  return (
    <div className="artist-dashboard">
      <h1>Manage Your Art</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="art-list">
        {items.map(item => (
          <div key={item._id} className="art-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button onClick={() => handleUpdateArt(item)}>Update</button>
            <button onClick={() => handleDeleteArt(item._id)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={() => handleAddArt({ title: '', description: '', price: 0, image: '' })}>Add New Art</button>
    </div>
  );
};

export default ArtistDashboard;
