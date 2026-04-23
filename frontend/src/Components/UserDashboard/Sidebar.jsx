import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Dashboard</h3>
      <ul>
        <li><Link to="/dashboard/profile">Profile</Link></li>
        <li><Link to="/dashboard/orders">Order History</Link></li>
        <li><Link to="/dashboard/wishlist">Wishlist</Link></li>
        <li><Link to="/dashboard/settings">Account Settings</Link></li>
        <li><Link to="/dashboard/notifications">Notifications</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
