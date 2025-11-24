import { useContext, useState, useEffect, useRef } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { RiShoppingBasketFill } from "react-icons/ri";


const Navbar = ({setShowLogin}) => {
    
    const [menu,setMenu]=useState("home");
    const [showDropdown, setShowDropdown] = useState(false);
    const {getTotalCartAmount,token,setToken}=useContext(StoreContext);
    const location = useLocation();
    const isCartPage = location.pathname === '/cart';
    const isMyOrdersPage = location.pathname === '/myorders';
    const isLightPage = isCartPage || isMyOrdersPage;
    const dropdownRef = useRef(null);
    
    const navigate = useNavigate();
    const logout =()=>{
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        setShowDropdown(false);
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);
  
    return (

        <div className={`navbar ${isLightPage ? 'navbar-cart' : ''}`}>
        <Link to='/'><img src={assets.logo} alt='' className='logo'/></Link>
        <ul className='navbar-menu'>
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            {!isLightPage && <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>}
            {!isLightPage && <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</a>}
            <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
        </ul>
        
        <div className="navbar-right">
            <div className="navbar-search-icon">
                {token ? (
                    <Link to='/cart'> <RiShoppingBasketFill className='react-icon' /> </Link>
                ) : (
                    <div onClick={() => setShowLogin(true)} style={{ cursor: 'pointer' }}>
                        <RiShoppingBasketFill className='react-icon' />
                    </div>
                )}
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {
            !token?
            <button onClick={()=>setShowLogin(true)} >Sign in</button>
            : <div className="navbar-profile" ref={dropdownRef}>
                <img 
                    className='profile-icon' 
                    src={assets.profile_icon} 
                    alt=''
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{ cursor: 'pointer' }}
                />
                <ul className={`nav-profile-dropdown ${showDropdown ? 'show' : ''}`}>
                    <li onClick={() => { navigate('/myorders'); setShowDropdown(false); }}>
                        <img src={assets.bag_icon} alt="" /><p>Orders</p>
                    </li>
                    <hr />
                    <li onClick={logout}>
                        <img src={assets.logout_icon} alt="" /><p>Logout</p>
                    </li>
                </ul>
            </div>
            }
        </div>
    </div>
  )
}

export default Navbar