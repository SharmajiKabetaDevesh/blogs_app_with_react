import React,{useState,useEffect} from 'react'
import dbService from '../../appwrite/dbservice'
import PostCard from "../../components/PostCard/PostCard"
import Container from "../../components/Container/Container"
const AllPosts = () => {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
      const fetchPosts = async () => {
        try {
          const postData = await dbService.getAllPost(); // Remove `[]` if not required
          if (postData) {
            setPosts(postData.documents);
            console.log("Updated posts:", postData.documents); // Logs the correct value
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
  
      fetchPosts();
    },[])
  return (
    <div className="w-ful py-8">
      <Container>
        <div className="flex flex-wrap">
        {posts.map((post)=>{
        return <div key={post.$id} className="p-2 w-1/4">
           <PostCard {...post}/>

        </div>
    })}
        </div>
    
      </Container>

    </div>
  )
}

export default AllPosts