import React from 'react';

const OrderHistory = () => {
  const orders = [
    { id: 1, product: 'T-Shirt', status: 'Delivered', date: '2025-04-20', total: 25 },
    { id: 2, product: 'Jeans', status: 'Shipped', date: '2025-04-10', total: 40 },
  ];

  return (
    <div className="order-history">
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.product}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
              <td>${order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
