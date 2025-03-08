import React,{useState,useEffect} from 'react'
import Container from "../../components/Container/Container"
import dbService from '../../appwrite/dbservice'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import PostForm from "../../components/PostForm/PostForm"
const EditPost = () => {
    const [post,setPost]=useState(null)
    const {slug}=useParams()
    console.log("EditPost :: slug :",slug)
    const navigate=useNavigate()

    useEffect(()=>{
       if(slug){
         dbService.getPost({slug}).then((data)=>{
           if(data){
            setPost(data)
           }
        })
       }else{
        navigate("/")
       }
    },[slug,navigate])
  return post?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null
}

export default EditPost