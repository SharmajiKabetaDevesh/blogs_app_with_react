import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import Protected from "./components/AuthLayout/AuthLayout.jsx"
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import {   AddPost,
  Post,
  EditPost,
  AllPost,
  Home,
  Login,
  SignUp } from './pages/index.js'

const routes=createBrowserRouter([
  { path:"/",element:<App/>,children:[
    { path:"signup",element:<Protected authentication={false}><SignUp/> </Protected>},
    { path:"home",element:<Protected authentication={true}><Home/> </Protected>},
    { path:"login",element:<Protected authentication={false}><Login/> </Protected>},
    {path:"add-post",element:<Protected authentication={true}><AddPost/> </Protected>},
    {path:"post/:slug",element:<Protected authentication={true}><Post/> </Protected>},
    {path:"all-posts",element:<Protected authentication={true}><AllPost/> </Protected>},
    {path:"/edit-post/:slug",element:<Protected authentication={true}><EditPost/> </Protected>},

  ]},

 ])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
      <RouterProvider router={routes}>

      
    <App />
    </RouterProvider>
    </Provider>
    
  </StrictMode>,
)
