import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue,set,push, remove} from "firebase/database";
import { useSelector } from 'react-redux'

const FriendRequest = () => {
  const db = getDatabase();
  let data=useSelector((state)=>state.userLoginInfo.userInformation)
  let [friendRequestList,setFriendRequestList]=useState([])

  useEffect(()=>{
    const starCountRef = ref(db, 'friendrequest/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        if(data.uid==item.val().reciverid){
          arr.push({...item.val(),id:item.key})
        }
      })
      setFriendRequestList(arr)
    });
  },[])


  let handleFriendRequest=(item)=>{
    set(push(ref(db, 'friend/')), {
      ...item
    }).then(()=>{
      remove(ref(db, 'friendrequest/'+item.id))
    })
  }
  return (
    <div className=' relative shadow-lg	w-full overflow-y-scroll p-5 	'>
    <div className='w-full  h-[340px]'>
    {friendRequestList.length==0
      ?
      <h3 className='bg-red-500 text-white font-bold text-xl font-nunito px-5 py-2'>No Friend Request Available</h3>
      :
      friendRequestList.map((item)=>(
        <div className='flex justify-center  w-full items-center gap-x-4  py-3.5 border-b '>
          <div className='w-[70px] h-[70px] rounded-full overflow-hidden '>
            <img src='images/profile.png' alt="" />
          </div>
        <div className='w-[50%]'>
    
          <h2 className='font-nunito font-semibold text-xl'>{item.sendername}</h2>
  
        <h2 className='font-nunito font-normal text-sm'>{item.senderemail}</h2>
        </div>
          <div >
          <button onClick={()=>handleFriendRequest(item)} className='font-nunito font-semibold text-xl bg-primary p-2 text-white rounded-br-xl ml-5 drop-shadow-md	'>Add</button>
          </div>
      </div>
  
        ))
    }
    </div>

    </div>
  )
}

export default FriendRequest