"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function profile() {
  const router = useRouter();
  const [data,setData] = useState("empty")
  
  const userDetail = async() => {
    const response = await axios.post("/api/users/me")
    console.log(response.data.data._id)
    setData(response.data.data._id)


  } 

  const logout = async() => {
    try{
      await axios.get("/api/users/logout")
      toast.success("logout success")
      router.push("/login")
    }catch(error:any){
      console.log(error.message);
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>{data === "empty" ? "No data" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-2 rounded" onClick={userDetail}>Get User Detail</button>
    </div>
  )
}

export default profile
