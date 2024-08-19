import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { API } from '../API';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Get userId from Redux state or localStorage
  const userId = useSelector(state => state.auth.userId) || localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      // Fetch cart items when component mounts
      axios.get(`${API}/cart/${userId}`, {
        headers: {
          'x-auth-token': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => setCartItems(response.data))
      .catch(error => console.error('Error fetching cart items:', error));
    } else {
      console.error('User ID is undefined. Cannot fetch cart items.');
    }
  }, [userId]);

  const handleRemove = (id) => {
    axios.delete(`${API}/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => setCartItems(cartItems.filter(item => item._id !== id)))
    .catch(error => console.error('Error removing cart item:', error));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    axios.put(`${API}/cart/${id}`, { quantity: newQuantity }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => setCartItems(cartItems.map(item => item._id === id ? response.data : item)))
    .catch(error => console.error('Error updating cart item:', error));
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Artwork</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item._id}>
              <td>{item.artworkId.title}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item._id, parseInt(e.target.value, 10))}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(item._id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CartPage;
