import React, { useEffect, useState } from 'react'
import {IoLogoLinkedin} from 'react-icons/io'
import {MdOutlineCloudUpload} from 'react-icons/md'
import { useSelector ,useDispatch} from 'react-redux'
import { getDatabase, ref, onValue,set} from "firebase/database";
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  let navigate=useNavigate()
  let [titleList,setTitleList]=useState([])
  let [coverList,setCoverList]=useState([])
  const db = getDatabase();
  let data=useSelector((state)=>state.userLoginInfo.userInformation)

  useEffect(()=>{
    const starCountRef = ref(db, 'userInfo/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        if(data.uid==item.val().adminid){

          arr.push(item.val())
        }
      })
      setTitleList(arr)
    });
  },[])
  
  useEffect(()=>{
    const starCountRef = ref(db, 'coverPhoto/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{

        if(data.uid==item.key){

          arr.push(item.val())
        }
      
      })
      setCoverList(arr)
    });
  },[])

  let handleMyprofile=()=>{
    navigate('/profile')
  }
  return (
      <div >
          <div className=' w-[290px] h-[120px] mx-auto relative group'>
            {coverList.length==0
            ?
            <img className='w-full h-full' src='images/cover.png'/>
            :
            coverList.map((item)=>(
            <img className='w-full h-full' src={item.coverimg}/>
            ))
            }
          </div>
          <div className='mt-[-50px] flex justify-center  '>
            <div className='w-[100px] h-[100px] rounded-full overflow-hidden relative group'>
            <img className='w-full h-full ' src={data.photoURL}/>
            </div>
          </div>
          <div onClick={handleMyprofile} className='text-center relative'>
            <h3 className='font-nunito text-2xl font-bold text-primary'>{data.displayName}</h3>
            {titleList.map((item)=>(
            <p className='font-nunito text-sm  text-primary mt-2'>{item.title}</p>
            ))}
            <IoLogoLinkedin className='absolute top-0 right-0'/>
          </div>
      </div>
  )
}

export default Profile