import React from 'react'
import dbService from '../../appwrite/dbservice'
import PostCard from "../../components/PostCard/PostCard"
import Container from "../../components/Container/Container"
const AllPosts = () => {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
    dbService.getAllPost([].then((post)=>{
        if(post){
            setPosts(post.documents)
        }
    }))
    },[])
  return (
    <div className="w-ful py-8">
      <Container>
        <div className="flex flex-wrap">
        {posts.map((post)=>{
        return <div key={post.$id} className="p-2 w-1/4">
           <PostCard post={post}/>

        </div>
    })}
        </div>
    
      </Container>

    </div>
  )
}

export default AllPosts