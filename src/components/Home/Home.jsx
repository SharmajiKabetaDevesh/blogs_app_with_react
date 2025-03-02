import React from 'react'
import { NavLink } from 'react-router-dom'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
const Home = () => {
 const navigate=useNavigate();
 const handleLogout=()=>{
    console.log("Yes")
       authService.logout().then(()=>{
        navigate("/login");
          console.log("Logged out successfully");
       })
       .catch((error)=>{console.log(error)})
 }
  return (
    <div>
  Home
</div>
  )
}

export default Home