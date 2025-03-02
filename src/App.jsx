import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Login from "./components/Login/Login"
import Home from './components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import Layout from './components/Layout/Layout'
import PostForm from './components/PostForm/PostForm'
const App = () => {
   const routes=createBrowserRouter([
    { path:"/",element:<Layout/>,children:[
      { path:"signup",element:<SignUp/>},
      { path:"home",element:<Home/>},
      { path:"login",element:<Login/>},
      {path:"postform",element:<PostForm/>}
  
    ]},

   ])
  const [loading,setLoading]=useState(true);
  const user=useSelector((state=>state.authSliceReducer.status));
 
  console.log(user);
  const dispatch=useDispatch();
  // useEffect(() => {
  //   authService.getCurrentUser().then((data)=>{
  //     console.log(data);
  //     if(data){
  //       dispatch(login(data));
  //        navigate("/home")
  //     }else{
  //       dispatch(logout());
  //     }
  //     setLoading(false);
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
   
  // }, [])
  

  return(
    <RouterProvider router={routes}>

    

    </RouterProvider>
   
  )
}

export default App