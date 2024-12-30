// frontend/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from '../components/Cart';  // Ensure this points to your Cart component

const ProfilePage = ({ token }) => {
  return (
    <div>
      <h1>Your Profile</h1>
      <Cart token={token} />
    </div>
  );
};

export default ProfilePage;
