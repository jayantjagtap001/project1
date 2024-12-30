import React from 'react';
import axios from 'axios';

const Order = ({ token, cart, shippingAddress }) => {
  const placeOrder = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/orders`,
        { shippingAddress },
        { headers: { Authorization: token } }
      );
      alert('Order placed successfully!');
    } catch (error) {
      alert(error.response.data.message || 'Error placing order');
    }
  };

  return (
    <button onClick={placeOrder}>Place Order</button>
  );
};

export default Order;
