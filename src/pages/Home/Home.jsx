import React,{useState,useEffect} from 'react'
import dbService from '../../appwrite/dbservice'
import Container from '../../components/Container/Container'
import PostCard from '../../components/PostCard/PostCard'

const Home = () => {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
       dbService.getAllPost([]).then((post)=>{
        if(post){
            setPosts(post.documents)
        }
       })
    },[])
    if(posts.length===0){
        return<div className='w-full py-9 mt-4 text-center'>
          <Container>
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                         No Post Found
                </h1>
              </div>

            </div>
          </Container>
            
        </div>
    }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post)=>(
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post}/>
              
               </div>
          ))}

        </div>
      </Container>


    </div>
  )
}

export default Home