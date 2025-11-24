import  { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext.jsx';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './MyOrders.css'



const MyOrders = () => {
    const [data,setData] = useState([]);
    const {url,token} = useContext(StoreContext);
    
    
    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])

    return (
        <div className='my-orders'>
        <h2 >My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div key={index} className='my-orders-order'>
                        <div className="order-images">
                            {order.items.slice(0, 3).map((item, idx) => (
                                <img 
                                    key={idx}
                                    src={`${url}/images/${item.image}`} 
                                    alt={item.name}
                                    className="order-item-image"
                                />
                            ))}
                            {order.items.length > 3 && (
                                <div className="more-items">+{order.items.length - 3}</div>
                            )}
                        </div>
                        <div className="order-details">
                            <p className="order-items-list">{order.items.map((item,index)=>{
                                if (index === order.items.length-1) {
                                    return item.name+" x "+item.quantity
                                }
                                else{
                                    return item.name+" x "+item.quantity+", "
                                }
                            })}</p>
                        </div>
                        <p className="order-amount">₹{order.amount}.00</p>
                        <p className="order-item-count">Items: {order.items.length}</p>
                        <p className="order-status"><span>&#x25cf;</span> <b>{order.status}</b></p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders