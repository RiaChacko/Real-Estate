import React, { useState,useEffect } from 'react'
import {useSelector} from "react-redux";
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
 // rules for firebase upload pic:
// allow read;
//       allow write : if
//       request.resource.size < 2*1024*1024 &&
//       request.resource.contentType.matches('/image.*')
//     }
export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef = useRef(null);
  const [formData,setFormData] = useState({});
  console.log(formData);

 
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress));
      console.log(progress)

    },
    
    (error)=>{
      setFileUploadError(true);

    },

    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
        setFormData({...formData, avatar:downloadUrl});
      })
    }
    );
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
      <input type='file'onChange={(e)=>setFile(e.target.files[0])}  ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar||currentUser.avatar} className='w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2'></img>
        <p className='text-sm self-center'>
        {fileUploadError ?
        ( <span className='text-red-700'>Error Image Upload</span>)
        : filePerc > 0 && filePerc <100 ? (
          <span className='text-slate-700'>
        {`Uploading ${filePerc}%`}
        </span>): 
        filePerc === 100 ? (
          <span className='text-green-700'>Successfully Upload</span>
        ):""}</p>
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
