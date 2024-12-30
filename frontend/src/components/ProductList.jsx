import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/cart/add`,
        { productId },
        { headers: { Authorization: token } }
      );
      alert('Product added to cart!');
    } catch (error) {
      alert(error.response.data.message || 'Error adding to cart');
    }
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList; // This is a default export
