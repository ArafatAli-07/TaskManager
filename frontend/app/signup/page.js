'use client'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
    const [input, setInput] = useState({
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    }

    const router = useRouter();

    const signupHandler = async(e)=>{
        e.preventDefault();
        // console.log(input);
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/register`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });

            if(res.data.success){
                router.push('/login'),
                toast.success(res.data.message)
                setInput({
                    email:"",
                    password:""
                })
            }
        } catch (error) {
        //   console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className='flex justify-center items-center bg-black w-screen h-screen text-white'>
      <div className='h-lg w-lg border-2 border-slate-400 py-7 rounded-lg mx-3 md:mx-0'>
        <div className='flex justify-center items-center'>
            <Image src='/logo.png' alt='logo_png' height={150} width={150}/>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-serif text-2xl font-bold mt-2'>SignUp</h1>
            <span className='italic font-serif text-slate-400'>Manage your task at one place.</span>
        </div>
        <form onSubmit={signupHandler} className='flex flex-col mx-5 '>
            <div className='flex flex-col justify-center gap-1'>
                <label htmlFor='email'>Email address :</label>
                <input type="email" name="email" value={input.email} onChange={handleChange} className='bg-white/95 text-black border-2 border-slate-400 rounded-sm p-2' id='email' placeholder='taskmanager@gmail.com'/>
            </div>
            <div className='flex flex-col justify-center gap-1 mt-2'>
                <label htmlFor='password'>Password :</label>
                <input type="password" name="password" value={input.password} onChange={handleChange} className='bg-white/95 text-black border-2 border-slate-400 rounded-sm p-2' id='password' placeholder='Enter your password' required/>
            </div>

            <button type="submit" className='bg-blue-500 flex item-center justify-center text-white mt-4 p-1 rounded-sm'>SignUp</button>

            <div className='text-[13px] flex justify-end items-center mr-2 mt-1'><span className='flex'>Already have an account?<Link href='/login' className='text-blue-500 underline underline-offset-2 font-semibold'>&nbsp;Login</Link></span></div>

        </form>
      </div>
    </div>
  )
}

export default SignUp
