import React,{useState,useEffect} from 'react'
import dbService from '../../appwrite/dbservice'
import Container from '../../components/Container/Container'
import PostCard from '../../components/PostCard/PostCard'

const Home = () => {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
       dbService.getAllPost([].then((post)=>{
        if(post){
            setPosts(post.documents)
        }
       }))
    },[])
    if(posts.length===0){
        return<div>
            
        </div>
    }
  return (
    <div>Home</div>
  )
}

export default Home