import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import {login,logout} from "./feature/authSlice"
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
const App = () => {

  const [loading,setLoading]=useState(true);

  const dispatch=useDispatch();
  useEffect(()=>{
        authService.getCurrentUser().then((userData)=>{
          if(userData){
            dispatch(login({userData}))
          }else{
            dispatch(logout())
          }
        })
        .finally(()=> setLoading(false))
  },[])
 
return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
       <Outlet />
      </main>
      <Footer />
    </div>
  </div>
) : null
  
}

export default App