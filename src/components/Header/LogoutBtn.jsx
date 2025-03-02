import React from 'react'
import authService from '../../appwrite/auth';
import { logout } from '../../feature/authSlice';
import { useDispatch } from 'react-redux';

export const LogoutBtn = () => {
  const dispatch=useDispatch();
 const handleLogout=()=>{
    
    authService.logout().then(()=>{
      dispatch(logout());
      console.log("Logged out successfully");
    })
 }
  return (
    <div>
      <button className='text-red-600 text-xl' onClick={()=>{handleLogout()}}>
       Logout

      </button>
      </div>
  )
}

export default LogoutBtn;