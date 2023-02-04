import React,{useState,useEffect} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import ContainerL from './ContainerL'
import { useSelector } from 'react-redux'
import { getDatabase, push, ref, set,onValue } from "firebase/database";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const db = getDatabase();
  let [postlist,setPostList]=useState([]) 
  let [filterPost,setFilterPost]=useState([]) 
  let data=useSelector((state)=>state.userLoginInfo.userInformation)


  useEffect(()=>{
    const starCountRef = ref(db, 'post/' );
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        arr.push({...item.val(),id:item.key})
      })
      setPostList(arr)
    });
},[])

  let handleSearch=(e)=>{
    let arr=[]
   postlist.filter((item)=>{
    if(item.post.toLowerCase().includes(e.target.value.toLowerCase())){
      setFilterPost(item)
    }else{
      setFilterPost([])
    }
 
    
   })
  }

  return (
    <ContainerL>
        <div className='flex justify-between items-center'>
        <div>
          <Link to='/home'>
            <img src='images/logo.png'/>
          </Link>
        </div>
        <div  className='w-[50%] flex gap-x-7'>
            <div className='relative'>
            <input onChange={handleSearch} className='w-[367px] py-5 px-16 placeholder:text-[#CECECE]' placeholder='Search'/>
            <BiSearchAlt2 className='text-2xl  absolute top-5 left-5'/>
            </div>
            <div className='flex items-center gap-x-4 w-[330px]'>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                  {data &&
                <img className='w-full h-full' src={data.photoURL}/>
              }
                </div>
                {data &&
                <h2 className='font-nunito font-bold text-lg text-[#181818]'>{data.displayName}</h2>
              }
                <h3 className='font-nunito font-medium text-[#D1D1D1] ml-3'>YOU</h3>
            </div>
        </div>
    </div>
    </ContainerL>
  )
}

export default Navbar