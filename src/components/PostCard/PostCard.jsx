import React, { useEffect ,useState} from 'react'
import dbService from '../../appwrite/dbservice'
import { Link } from 'react-router-dom'
const PostCard = ({
    $id,
    title,
    imageurl
}) => {
  const [url,seturl]=useState(null);
  useEffect(()=>{
    dbService.filePreview(imageurl).then((data)=>seturl(data))
  },[])
  return (
    <Link to={`/post/${$id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4">
            <div className='w-full justify-center mb-4'>
                <img src={url} alt={title} className='rounded-xl'/>

            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard