import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Protected = ({children,authentication=true}) => {
    const [loading,setLoading]=useState(true);
    const authState=useSelector((state)=>state.authSliceReducer.status)
    const navigate=useNavigate();

    useEffect(()=>{
      if(authentication && authState != authentication){
        navigate("/login")

      }else if(authentication==false && authState!=authentication){
        navigate("/home")
      }
      setLoading(false)
    },[authState,navigate,authentication])

  return loading ? <div>....loading</div>: <>{children }</>
  
}

export default Protected