import React,{useCallback,useEffect} from 'react'
import RTE from '../RTE/RTE'
import { useForm } from 'react-hook-form'
import Button from "../Button/Button"
import Input from "../Input/Input"
import LogoutBtn from "../Header/LogoutBtn"
import Select from "../Select/Select"
import dbService from "../../appwrite/dbservice"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PostForm = ({post}) => {
    const {register,handleSubmit,watch,setValue,getValues,control}=useForm({
        defaultValues:{
            title:post?.title ||"",
            slug:post?.slug ||"",
            content:post?.content || "",
            status:post?.status || "active"
        }
    });
    const navigate=useNavigate();
    const userData=useSelector((state)=>state.authSliceReducer.userData)

    const submit=async(data)=>{
        console.log(data);
        if(post){
            const fileurl=data.image?.[0]?dbService.uploadFile(data.image[0]) :null;
            if(fileurl){
                dbService.deleteFile(post.image)
            }
            const dbpost=await dbService.updatePost(
                post.$id,{
                    ...data,
                    featuredImage:(fileurl?fileurl.$id : undefined)
                    
                }
                
            )
            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }else{
            const fileurl=data.image?.[0]?dbService.uploadFile(data.image[0]) :null;
            console.log(fileurl);
            if(fileurl){
                const fileid=fileurl.$id
                data.featuredImage=fileid
                console.log(data.featuredImageF)
                const dbPost=await dbService.createPost({
                    ...data,
                    userId:userData.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform=useCallback((value)=>{
     if(value && typeof(value)==='string'){
        const slug=value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return slug;
     }
     return "";
    },[])
    useEffect(()=>{
       const subscription=watch((value,{name})=>{
        if(name==='title'){
            setValue('slug',slugTransform(value.title),{shouldValidate:true})

        }
       })
       return ()=>{
        subscription.unsubscribe()
       }
    },[watch,slugTransform,setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap"> 
    <div className="w-2/3 px-2">
      <Input
      label="Title: "
      placeholder="Title"
      className="mb-4"
      {...register("title",{required:true})}
      />
      <Input
       label="Slug: "
       placeholder="Slug"
       className="mb-4"
       {...register("slug",{required:true})}
       onInput={(e)=>{
        setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})
       }}
      />
      <RTE label="Content: " name="content" control={control} defaultValue={getValues("content")}/>
    </div>
    <div className='w-1/3 px-2'>
     <Input
      label="Featured Image: "
      type="file"
      className="mb-4"
      accept="image/png, image/jpg ,image/jpeg, image/gif"
      {...register("image",{required:!post})}
     />
     {post && <div className='w-full mb-4'>
          <img
          src={dbService.filePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-lg"
          />
        </div>}
        <Select
        options={["active","inactive"]}
        label="Status"
        className="mb-4"
        {...register("status",{required:true})}
        />

        <Button type="submit" bgColor={post ? "bg-green-500":undefined} className='w-full'>{post?"Update":"Submit"}</Button>
        
   
    
    </div>
    </form>
  )
}

export default PostForm