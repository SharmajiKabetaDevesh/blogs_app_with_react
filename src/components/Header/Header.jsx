import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import authService from '../../appwrite/auth'
import logout from '../../feature/authSlice'
import Container from '../Container/Container'
import LogoutBtn from './LogoutBtn'
import { Link ,useNavigate} from 'react-router-dom'

const Header = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const authStatus=useSelector((state)=>state.authSliceReducer.status)
    
    console.log("Logged in status "+authStatus)
   

     const navItems=[
        {
            name:"Home",
            path:"/home",
            active:true
        },{
            name:"Login",
            path:"/login",
            active:!authStatus
        },{
            name: "Signup",
            path: "/signup",
            active: !authStatus,
        },{
            name: "All Posts",
            path: "/all-posts",
            active:authStatus
        },{
            name: "Add Post",
            path: "/add-post",
            active:authStatus
        }
     ]
  return (
   <header className="py-3 shadow-md bg-white flex justify-between items-center">
   <Container>
    <nav className="flex">
      <div className="mr-4">
          <Link to='/home'> Home</Link>
      </div>
      <ul className="flex ml-auto justify-center">
        {navItems.map((item)=>{
             if(item.active){

            return <li key={item.name}> 
            <button className="text-blue-500 text-xl px-8" onClick={()=>{navigate(item.path) }}>
                {item.name}
            </button>
            </li>
             }else{null}
        })}
        {authStatus && <li><LogoutBtn /></li> }
      </ul>
      
    </nav>
   </Container>
   </header>
  )
}

export default Header