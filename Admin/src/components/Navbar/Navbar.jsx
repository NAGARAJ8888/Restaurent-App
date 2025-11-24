import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { FaUser } from 'react-icons/fa'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <FaUser className='profile' />
    </div>
  )
}

export default Navbar