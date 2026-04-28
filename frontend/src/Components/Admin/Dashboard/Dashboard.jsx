import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import API_URL from '../../../config';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch products count
                const prodRes = await fetch(`${API_URL}/products/allproducts`);
                const products = await prodRes.json();
                
                // Fetch orders count
                const orderRes = await fetch(`${API_URL}/orders/allorders`, {
                    headers: { 'auth-token': localStorage.getItem('auth-token') }
                });
                const orderData = await orderRes.json();
                const orders = orderData.success ? (orderData.orders || []) : [];
                
                // Fetch users count
                const userRes = await fetch(`${API_URL}/users/allusers`, {
                    headers: { 'auth-token': localStorage.getItem('auth-token') }
                });
                const userData = await userRes.json();
                const users = userData.success ? (userData.users || []) : [];

                // Calculate total revenue from orders
                const revenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

                setStats({
                    totalProducts: products.length,
                    totalOrders: orders.length,
                    totalUsers: users.length,
                    totalRevenue: revenue
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Admin Overview</h1>
                <p>Welcome back! Here's what's happening with Rentie today.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                        <h3>Total Products</h3>
                        <p className="stat-value">{stats.totalProducts}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🛍️</div>
                    <div className="stat-info">
                        <h3>Total Orders</h3>
                        <p className="stat-value">{stats.totalOrders}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                        <h3>Total Users</h3>
                        <p className="stat-value">{stats.totalUsers}</p>
                    </div>
                </div>
                <div className="stat-card revenue">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                        <h3>Total Revenue</h3>
                        <p className="stat-value">Rs. {stats.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                    <Link to="/admin/addproduct" className="action-btn">
                        <span>+</span> Add New Product
                    </Link>
                    <Link to="/admin/manageorders" className="action-btn">
                        <span>📋</span> Manage Pending Orders
                    </Link>
                    <Link to="/admin/listproduct" className="action-btn">
                        <span>🔍</span> Check Inventory
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
