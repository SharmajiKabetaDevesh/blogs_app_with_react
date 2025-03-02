import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Button from "../Button/Button"
import Input from '../Input/Input'

import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {useForm} from 'react-hook-form'
const SignUp = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [error,setError]=useState("");
  const {register,handleSubmit}=useForm();

  const signup=async(data)=>{
    console.log(data)
    setError("");
    try{
        const userData=await authService.createAccount(data)
        if(userData){
          navigate("/login")
        }
      }catch(error){
        setError(error.message)

      }
  }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up yourself!!</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
        </p>
        
        <form onSubmit={handleSubmit(signup)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your name"
              {...register("name",{
                required:true
              })}
            ></Input>
            <Input 
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email",{
                required:true,
                validate:{
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                }
              })}
            ></Input>

            <Input
             label="Password"
             type="password"
             placeholder="Enter your password"
             {...register("password",{
              required:true
             })}
            ></Input>
          <Button type="submit" className='w-full'>Sign Up</Button>
          </div>
          
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        </form>
        </div>
    </div>
  )
}

export default SignUp