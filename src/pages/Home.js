import React,{useState,useEffect} from 'react'
import Container from '../compnents/Container'
import Footer from '../compnents/Footer'
import Navbar from '../compnents/Navbar'
import NewsFeed from '../compnents/NewsFeed'
import Profile from '../compnents/Profile'
import { getAuth, onAuthStateChanged,  } from "firebase/auth";
import { userLoginInfo } from '../slices/userSlice';
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserList from '../compnents/UserList'

const Home = () => {
  const auth = getAuth();
  let navigate=useNavigate()
  let [verify,setVerify]=useState(false )
  let dispatch=useDispatch()
  let data=useSelector((state)=>state.userLoginInfo.userInformation)

  onAuthStateChanged(auth, (user) => {
    if(user.emailVerified==true){
      setVerify(true)
      // dispatch(userLoginInfo(user))
      // localStorage.setItem('userInformation',JSON.stringify(user))
    }
  });

  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  },[])
  return (
    <>
    {verify
    ?
    <> 
     <Navbar/>
   <Container>
   <div className='flex justify-between mt-10'>
    <div className='w-[65%]'>
    <NewsFeed/>
   <Footer/>
    </div>
    <div className='w-[30%]'>
    <Profile/>
    <UserList/>
    </div>
   </div>
   </Container>
    </>
    :
    <div className='absolute top-0 left-0 w-full h-full bg-primary flex justify-center items-center '>
    <h2 className='font-nunito text-2xl font-bold text-white'>Please Verify Your Email </h2>
  </div>
    }
  
    </>
  )
}

export default Home