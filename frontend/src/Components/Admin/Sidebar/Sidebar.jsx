import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import add_product_icon from '../../Assets/Product_Cart.svg'
import list_product_icon from '../../Assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <NavLink to={'/admin/addproduct'} className={({ isActive }) => isActive ? 'active-link' : ''} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </NavLink>

      <NavLink to={'/admin/listproduct'} className={({ isActive }) => isActive ? 'active-link' : ''} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Product list</p>
        </div>
      </NavLink>

      <NavLink to={'/admin/manageorders'} className={({ isActive }) => isActive ? 'active-link' : ''} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Manage Orders</p>
        </div>
      </NavLink>
    </div>
  )
}

export default Sidebar