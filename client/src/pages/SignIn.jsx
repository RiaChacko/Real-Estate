import React, { useState } from 'react'
import {Link, json} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function SignIn() {
  const navigate = useNavigate();
  const [formState,setFormState] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange=(e)=>{
    setFormState({
      ...formState,
      [e.target.id]:e.target.value,
    });
    
  };


  const handleSubmit= async (e)=>{

    try {

      e.preventDefault();
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/signin',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formState),
      }
      
      );
      const data = await res.json();
      if(data.success ===false){
        setError(data.message);
        setLoading(false);
        return;
      
        
     
      }
      setLoading(false);
      setError(null);
      console.log(data);
      navigate("/");
      
    } catch (error) {
      setLoading(false);
      setError(error.message);
      
    }
   
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}></input>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}></input>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>{loading?'Loading...' : 'Sign In'}</button>
        <button className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' disabled={loading}>{loading?'Loading...' : 'Continue with Google'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={("/sign-up")}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
