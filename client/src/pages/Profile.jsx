import React from 'react'
import {useSelector} from "react-redux";
export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} className='w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2'></img>
        <input type='text'  placeholder='username' id='username' className='border p-3 rounded-lg'/>
        <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg'/>
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
        <button className='bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
