import React from 'react';
import Sidebar from './Sidebar';
import Profile from './Profile';
import OrderHistory from './OrderHistory';
import Wishlist from './Wishlist';
import AccountSettings from './AccountSettings';
import Notifications from './Notifications';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Profile />
        <OrderHistory />
        <Wishlist />
        <AccountSettings />
        <Notifications />
      </div>
    </div>
  );
};

export default UserDashboard;
