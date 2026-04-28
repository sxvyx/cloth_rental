import React, { useEffect, useState } from 'react'
import './ManageOrders.css'
import API_URL from '../../../config';

const ManageOrders = () => {
    const [allOrders, setAllOrders] = useState([]);

    const fetchOrders = async () => {
        await fetch(`${API_URL}/orders/allorders`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setAllOrders(data.orders);
            });
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    const updateStatus = async (orderId, status) => {
        await fetch(`${API_URL}/orders/updateorderstatus`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId, status }),
        }).then((res) => res.json())
        .then((data) => {
            if (data.success) {
                alert("Status Updated");
                fetchOrders();
            }
        });
    }

    return (
        <div className='manage-orders'>
            <h1>All Rental Bookings</h1>
            <div className="orders-container">
                <div className="orders-format-main">
                    <p>Order ID</p>
                    <p>User</p>
                    <p>Products</p>
                    <p>Total</p>
                    <p>Status</p>
                    <p>Action</p>
                </div>
                <hr />
                {allOrders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>
                        <p>No rental bookings found.</p>
                    </div>
                ) : allOrders.map((order, index) => {
                    return (
                        <div key={index} className="orders-format-main orders-format">
                            <p>#{order._id.slice(-6).toUpperCase()}</p>
                            <p>{order.userId?.name || 'Guest'}<br/><span style={{fontSize: '11px', color: '#888'}}>{order.userId?.email}</span></p>
                            <div className="order-products-list">
                                {order.products.map((p, i) => (
                                    <p key={i} style={{fontSize: '12px'}}>{p.name} x{p.quantity}</p>
                                ))}
                            </div>
                            <p>Rs. {order.totalAmount}</p>
                            <p>
                                <span className={`status-badge status-${order.orderStatus.toLowerCase().replace(/ /g, '-')}`}>
                                    {order.orderStatus}
                                </span>
                            </p>
                            <div className="order-actions">
                                <select 
                                    value={order.orderStatus} 
                                    onChange={(e) => updateStatus(order._id, e.target.value)}
                                >
                                    <option value="Booked">Booked</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Rented">Rented</option>
                                    <option value="Returned">Returned</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ManageOrders;
