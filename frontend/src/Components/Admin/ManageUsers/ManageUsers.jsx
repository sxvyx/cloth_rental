import React, { useEffect, useState } from 'react';
import './ManageUsers.css';
import API_URL from '../../../config';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        await fetch(`${API_URL}/users/allusers`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setUsers(data.users);
                }
            });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='manage-users'>
            <h1>User Activity Monitoring</h1>
            <div className="manage-users-format-main">
                <p>Name</p>
                <p>Email</p>
                <p>Role</p>
                <p>Cart Items</p>
            </div>
            <div className="manage-users-allusers">
                {users.map((user, index) => {
                    return (
                        <div key={index} className="manage-users-format-main manage-users-format">
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p style={{ fontWeight: '700', color: user.role === 'admin' ? '#9e1b20' : '#666' }}>
                                {user.role.toUpperCase()}
                            </p>
                            <p>{user.cartData ? Object.keys(user.cartData).length : 0} items</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ManageUsers;
