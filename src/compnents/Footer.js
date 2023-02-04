import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaQuestion} from 'react-icons/fa'
import {AiFillSetting} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import {userLoginInfo} from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut, updateProfile } from "firebase/auth";

const Footer = () => {
  const auth = getAuth();
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let [setting,setSetting]=useState(false)

    let handleSettingShow=()=>{
        setSetting(true)
    }
    let handleLogOut=()=>{
      signOut(auth)
      .then(() => {
        navigate('/login')
        dispatch(userLoginInfo(null))
        localStorage.removeItem('userInformation')
      })
      .catch((error) => {
        // An error happened.
      });
    
       
    }
  return (
    <>
    {setting 
    ?
    <div className='absolute top-0 left-0 bg-[rgba(0,0,0,.5)] w-full h-full z-50 flex justify-center items-center'>
    <div className='w-3/12 p-10 bg-white rounded-bl-lg'>
      <h1 className='font-nunito text-2xl font-bold text-primary'>LogOut </h1>
      <button onClick={handleLogOut} className='font-nunito py-3 px-5 bg-primary rounded-bl-lg text-xl text-white  mt-5 inline-block'>LogOut</button>
      <button onClick={()=>setSetting(false)} className='font-nunito py-3 px-5 bg-red-500 rounded-bl-lg text-xl text-white ml-5  mt-5 inline-block'>Cancel</button>
    </div>
  </div>
    :
    <div className='flex py-8'>
        <div className='w-[15%]'>
            <img src='images/footerlogo.png'/>
        </div>
        <div className='w-[20%]'>
            <h3 className='font-nunito font-bold text-primary mb-6'>Navigation</h3>
            <ul>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>About</Link></li>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>Careers</Link></li>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>Advertising</Link></li>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>Small Business</Link></li>
               
            </ul>
        </div>
        <div className='w-[20%]'>
           
            <ul className='mt-12'>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>Talent Solutions</Link></li>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>Marketing Solutions</Link></li>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>Sales Solutions</Link></li>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>Safery Center</Link></li>
               
            </ul>
        </div>
        <div className='w-[20%]'>
           
            <ul className='mt-12'>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>Community Guidelines</Link></li>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>Privacy & Terms </Link></li>
               <li className='font-nunito font-normal text-sm text-primary mb-2'><Link to='#'>Mobile App</Link></li>
               
            </ul>
        </div>
        <div>
        <h3 className='font-nunito font-bold text-primary mb-6'>Fast access</h3>
        <div className='w-[170px] bg-[#0275B1] text-white py-3 px-5 rounded-lg flex '>Questions
        <FaQuestion className='ml-auto'/>
        </div>
        <div onClick={handleSettingShow} className='w-[170px] bg-[#0275B1] flex text-white py-3 px-5 rounded-lg mt-2.5'>Settings
        <AiFillSetting className='ml-auto'/>
        </div>


        </div>
    </div>
    }
    </>
  )
}

export default Footer