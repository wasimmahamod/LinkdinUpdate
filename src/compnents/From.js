import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getDatabase, ref, set ,push} from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from  'react-loader-spinner'
import { getAuth } from 'firebase/auth';

const From = () => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate=useNavigate()
  console.log(auth.currentUser)
  let [phoneNumber,setPhoneNumber]=useState('')
  let [title,setTitle]=useState('')
  let [addres,setAddres]=useState('')
  let [about,setAbout]=useState('')
  let [experience,setExperience]=useState('')
  let [experienceTitle,setExperienceTitle]=useState('')
  let [degree,setDegree]=useState('')
  let [schoolName,setSchollName]=useState('')
  let [loader,setLoader]=useState(false)

  let handleTitle=(e)=>{
    setTitle(e.target.value)
  }
  let handleAddres=(e)=>{
    setAddres(e.target.value)
  }
  let handleSubmit=(e)=>{
    e.preventDefault()
    set(push(ref(db, 'userInfo/')), {
      admin:auth.currentUser.displayName,
      adminid:auth.currentUser.uid,
      email: auth.currentUser.email,
      title : title,
      addres:addres,
      about:about,
      experience:experience,
      experienceTitle:experienceTitle,
      degree:degree,
      schoolName:schoolName,
      phone:phoneNumber,
    }).then(()=>{
      setLoader(true)
      setTitle('')
      setAddres('')
      setTimeout(() => {
        navigate('/login')
        
    }, 2000);

    })
  }
  return (
    <div>
        <form class="px-4 rounded mx-auto max-w-3xl w-full my-32 inputs space-y-6">
      <div>
        <h1 class="text-4xl font-bold">Profile Setup </h1>
        <p class="text-gray-600">
          Changes you make will be visible to other users
        </p>
      </div>
      <div>
        <div class="w-full mt-5">
          <label for="firstname">Phone Number</label>
          <input onChange={(e)=>setPhoneNumber(e.target.value)} class="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"/>
        </div>
        <div class="w-full mt-5">
          <label for="firstname">Profile Title</label>
          <input onChange={handleTitle} class="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"/>
        </div>
        <div class="w-full mt-5">
          <label >Addres</label>
          <input onChange={handleAddres} class="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"/>
        </div>
        <div class="w-full mt-5">
          <label >About </label>
          <input onChange={(e)=>setAbout(e.target.value)} class="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"/>
        </div>
        <div className='flex'>
        <div class="w-2/4 mt-5">
          <label >Experience </label>
          <input onChange={(e)=>setExperience(e.target.value)} class="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"/>
        </div>
        <div class="w-2/4 mt-5">
          <label >Experience Title </label>
          <input onChange={(e)=>setExperienceTitle(e.target.value)} class="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"/>
        </div>
        </div>
        <div className='flex'>
        <div class="w-2/4 mt-5">
          <label >Degree </label>
          <input onChange={(e)=>setDegree(e.target.value)} class="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"/>
        </div>
        <div class="w-2/4 mt-5">
          <label >School/Collage Name </label>
          <input onChange={(e)=>setSchollName(e.target.value)} class="border border-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:border-teal-400"/>
        </div>
        </div>
      </div>
      {loader ?
      <div className=''>
      <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor = 'blue'
          barColor = 'green'
          />
      </div>
      :
      <button onClick={handleSubmit} className='bg-primary px-5 py-3 text-white rounded-md'>Submit</button>
      }
 
    </form>
    </div>
  )
}

export default From