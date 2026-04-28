import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../Components/Admin/AddProduct/AddProduct'
import ListProduct from '../../Components/Admin/ListProduct/ListProduct'
import ManageOrders from '../../Components/Admin/ManageOrders/ManageOrders'
import ManageUsers from '../../Components/Admin/ManageUsers/ManageUsers'
import Dashboard from '../../Components/Admin/Dashboard/Dashboard'

const Admin = () => {
  return (
    <div className='admin' style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <Routes>
          <Route path = '/' element={<Dashboard/>}/>
          <Route path = '/addproduct' element={<AddProduct/>}/>
          <Route path = '/listproduct' element={<ListProduct/>}/>
          <Route path = '/manageorders' element={<ManageOrders/>}/>
          <Route path = '/users' element={<ManageUsers/>}/>
        </Routes>
    </div>
  )
}

export default Admin
