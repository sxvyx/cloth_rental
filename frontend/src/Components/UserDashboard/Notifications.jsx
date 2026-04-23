import React from 'react';

const Notifications = () => {
  const notifications = [
    { id: 1, message: 'Your order for T-Shirt has been shipped.' },
    { id: 2, message: 'New discounts available on your favorite items!' },
  ];

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
