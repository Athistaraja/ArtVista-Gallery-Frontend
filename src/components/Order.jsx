import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Order.css';

const Order = () => {
  const [order, setOrder] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const placeOrder = async () => {
      const response = await axios.post('/api/orders', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(response.data);
    };
    placeOrder();
  }, [token]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order">
      <h2>Order Placed Successfully</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        {order.items.map((item) => (
          <div key={item.artId._id} className="order-item">
            <img src={`/${item.artId.image}`} alt={item.artId.title} />
            <div>
              <h3>{item.artId.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="order-total">
          <h3>Total Amount: ${order.totalAmount}</h3>
        </div>
      </div>
    </div>
  );
};

export default Order;
