import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue,set,push} from "firebase/database";
import { useSelector } from 'react-redux'


const UserList = () => {
    const db = getDatabase();
    let data=useSelector((state)=>state.userLoginInfo.userInformation)
    let [userList,setUserList]=useState([])
    let [friendRequestList,setFriendRequestList]=useState([])
    let [friendList,setFriendList]=useState([])
    let [filterUserlist,setFilterUserlist]=useState([])

    

    useEffect(()=>{
        const starCountRef = ref(db, 'user/');
        onValue(starCountRef, (snapshot) => {
        let arr=[]
        snapshot.forEach((item)=>{
            if(data.uid!=item.key){
                arr.push({...item.val(),id:item.key})

            }
        })
        setUserList(arr)
        });
    },[])



    let handleFriendRequest=(item)=>{
      set(push(ref(db, 'friendrequest/')), {
        senderid:data.uid,
        sendername:data.displayName,
        senderemail:data.email,
        reciverid:item.id,
        recivername:item.name,
        reciveremail:item.email,
      });
    }

  
    
  useEffect(()=>{
    const starCountRef = ref(db, 'friendrequest/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
          arr.push(item.val().senderid+item.val().reciverid)
      })
      setFriendRequestList(arr)
    });
  },[])
  useEffect(()=>{
    const starCountRef = ref(db, 'friend/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
          arr.push(item.val().senderid+item.val().reciverid)
      })
      setFriendList(arr)
    });
  },[])

  let handleSearch=(e)=>{
    let arr=[]
  userList.filter((item)=>{
      if(item.name.toLowerCase().includes(e.target.value)){
        arr.push(item)
      }
      setFilterUserlist(arr)
    })
  }

 

  return (
    <div className='mt-5 relative shadow-lg	w-full overflow-y-scroll p-5	'>
    <h2 className='font-nunito font-semibold text-xl mb-4'>User List </h2>
    <input onChange={handleSearch}  className='w-full rounded-xl py-3 pl-5 placeholder:font-poppins text-base drop-shadow-lg	' type="text" placeholder='Search'/>
    <div className='w-full  h-[340px]'>

    {filterUserlist.length==0?
    userList.map((item)=>(
      <div className='flex  w-full items-center gap-x-4  py-3.5 border-b '>
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden '>
          <img src='images/profile.png' alt="" />
        </div>
      <div className='w-[50%]'>
      <h2 className='font-nunito font-semibold text-xl'>{item.name}</h2>
      <h2 className='font-nunito font-normal text-sm'>{item.email}</h2>
      </div>
        <div >
          {friendList.includes(data.uid+item.id )|| friendList.includes(item.id+data.uid) 
          ?
          <button className='font-nunito font-semibold text-xl bg-primary p-2 text-white rounded-br-xl ml-5 drop-shadow-md	'>F</button>
          :
          friendRequestList.includes(data.uid+item.id )|| friendRequestList.includes(item.id+data.uid) 
          ?
          <button className='font-nunito font-semibold text-xl bg-primary p-2 text-white rounded-br-xl ml-5 drop-shadow-md	'>p</button>
          :
        <button onClick={()=>handleFriendRequest(item)} className='font-nunito font-semibold text-xl bg-primary p-2 text-white rounded-br-xl ml-5 drop-shadow-md	'>Add</button>

          }
        </div>
    </div>

    ))
  :
  filterUserlist.map((item)=>(
    <div className='flex  w-full items-center gap-x-4  py-3.5 border-b '>
      <div className='w-[70px] h-[70px] rounded-full overflow-hidden '>
        <img src='images/profile.png' alt="" />
      </div>
    <div className='w-[50%]'>
    <h2 className='font-nunito font-semibold text-xl'>{item.name}</h2>
    <h2 className='font-nunito font-normal text-sm'>{item.email}</h2>
    </div>
      <div >
        {friendList.includes(data.uid+item.id )|| friendList.includes(item.id+data.uid) 
        ?
        <button className='font-nunito font-semibold text-xl bg-primary p-2 text-white rounded-br-xl ml-5 drop-shadow-md	'>F</button>
        :
        friendRequestList.includes(data.uid+item.id )|| friendRequestList.includes(item.id+data.uid) 
        ?
        <button className='font-nunito font-semibold text-xl bg-primary p-2 text-white rounded-br-xl ml-5 drop-shadow-md	'>p</button>
        :
      <button onClick={()=>handleFriendRequest(item)} className='font-nunito font-semibold text-xl bg-primary p-2 text-white rounded-br-xl ml-5 drop-shadow-md	'>Add</button>

        }
      </div>
  </div>

  ))
 
    }
    </div>

    </div>
  )
}

export default UserList