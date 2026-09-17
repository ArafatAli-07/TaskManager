'use client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const Navbar = () => {

const router = useRouter()

const logoutHandler = async()=>{
  try {
    const res = await axios.post(`https://taskmanager-et0d.onrender.com/api/v1/user/logout`, {withCredentials:true});

    if(res.data.success){
      localStorage.removeItem("token"),
      toast.success(res.data.message),
      router.replace("/login")
    }
  }catch (error) {
    toast.error(error.response.data.message)
  }
}

  return (
    
    <div className='flex bg-black text-white px-3 py-1 justify-between items-center'>
      <div className='flex justify-center items-center gap-1'>
        <Image className='' src='/logo2.png' alt='logo_png' height={40} width={40}/>
        <div className='mt-2 text-xl font-black font-serif'>TaskManager</div>
      </div>
      <button onClick={logoutHandler} className='border-2 border-white px-2 py-1.5 rounded-lg bg-red-900' >LogOut</button> 

    </div>
    
  ) 
}

export default Navbar
