import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { FaPlus, FaList, FaShoppingBag } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <FaPlus className="sidebar-icon" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <FaList className="sidebar-icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <FaShoppingBag className="sidebar-icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar