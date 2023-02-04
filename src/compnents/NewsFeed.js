import React, { useEffect, useState } from 'react'
import {GrGallery,GrSend} from 'react-icons/gr'
import {BsThreeDots} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { getDatabase, push, ref, set,onValue } from "firebase/database";
import { getStorage, ref as iref, uploadString ,getDownloadURL,uploadBytes } from "firebase/storage";
import moment from 'moment/moment';
import { Button } from 'flowbite-react';


const NewsFeed = () => {
    const storage = getStorage();
    const db = getDatabase();
    let [textPost,setTextpost]=useState('')
    let [textPosterr,setTextposterr]=useState('')
    let [titleList, setTitleList] = useState([])
    let [postlist,setPostList]=useState([])
    let [photoPostModal,setPhotoPostModal]=useState(false)
    let [settingShow,setSettingShow]=useState(false)
    let [photoPostFile,setPhotoPostFile]=useState(null)
    let [photoPostTitle,setPhotoPostTitle]=useState('')
    let data=useSelector((state)=>state.userLoginInfo.userInformation)

    let handlePostBox=(e)=>{
        setTextpost(e.target.value)

    }
    let handlePostSubmit=()=>{
      if(!textPost){
        // setTextposterr('Plase write some text or send Img Then Post ')
      }else{
        set(push(ref(db, 'post/')), {
            admin:data.displayName,
            adminid:data.uid,
            post:textPost,
            date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}- ${new Date().getHours()}  ${new Date().getMinutes()}`
          }).then(()=>{
            setTextpost('')
          })

      }

    }
    let handlephotoPostModal=()=>{
        setPhotoPostModal(true)
    }
    let hanldePhotoPostFIle=(e)=>{
        console.log(e.target.files[0].name)
        const storageRef = iref(storage, e.target.files[0].name);
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
          getDownloadURL(storageRef).then((downloadURL) => {
            setPhotoPostFile(downloadURL)
          });
        });
    }
    let photoPostsend=(e)=>{
        set(push(ref(db, 'post/')), {
            admin:data.displayName,
            adminid:data.uid,
            img:photoPostFile,
            post:photoPostTitle,
            date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}- ${new Date().getHours()}  ${new Date().getMinutes()}`
            
          }).then(()=>{
            setPhotoPostModal(false)
          })
      }

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

    useEffect(() => {
      const starCountRef = ref(db, 'userInfo/');
      onValue(starCountRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item) => {
          if (data.uid == item.val().adminid) {
  
            arr.push(item.val())
          }
        })
        setTitleList(arr)
      });
    }, [])

  return (
    <>
    {photoPostModal
    ?
    <div className='absolute top-0 left-0 bg-primary w-full h-full z-50 flex justify-center items-center'>
    <div className='w-2/4 p-10 bg-white rounded-bl-lg'>
      <h1 className='font-nunito text-2xl font-bold text-primary'>Photo Post</h1>
      <input onChange={hanldePhotoPostFIle} className='font-nunito text-xl text-primary block mt-5 mb-5' type='file'/>
      <h1 className='font-nunito text-2xl font-bold text-primary'>Photo Title</h1>
      <input onChange={(e)=>setPhotoPostTitle(e.target.value)} className='font-nunito w-full py-3 border border-solid rounded-md border-primary  text-xl px-5 text-primary block mt-5 mb-5' type='input' placeholder='Headding'/>
      <img src={photoPostFile}/>
      <button onClick={photoPostsend} className='font-nunito py-3 px-5 bg-primary rounded-bl-lg text-xl text-white  mt-5 inline-block'>Upload</button>
      <button onClick={()=>setPhotoPostModal(false)} className='font-nunito py-3 px-5 bg-red-500 rounded-bl-lg text-xl text-white ml-5  mt-5 inline-block'>Cancel</button>
    </div>
  </div>
    :
    <div>
        <div className='w-full relative'>
        <h3 className='font-nunito text-primary font-lg uppercase font-bold border-b border-[#F4F4F4] border-solid mb-10 pb-2'>New Post</h3>
        <input onChange={handlePostBox} className='w-full py-7 placeholder:font-nunito text-lg placeholder:text-[#D1D1D1] px-5 drop-shadow-lg	' placeholder='What’s on your mind?' value={textPost}/>

        <GrGallery onClick={handlephotoPostModal} className='absolute bottom-8 right-20 text-xl'/>

        <GrSend onClick={handlePostSubmit} className='absolute text-xl text-green-500 bottom-8 right-8 '/>
        </div>
        <div className='w-full h-[500px] overflow-y-auto'>
             {/* all post text */}
        {postlist.length==0
        ?
        <h3 className='bg-red-500 text-white font-bold text-xl font-nunito px-5 py-2'>No Friend Request Available</h3>
        :
        postlist.map((item)=>(
        <div>
            <div className='flex items-center gap-x-4 pt-14 pb-4 relative '>
            <img className='w-[60px] h-[60px] rounded-full overflow-hidden' src='images/avatar.png' />
                <div>
                    <h4 className='font-nunito text-lg font-bold text-primary '>{item.admin}</h4>
                    {titleList.map((item)=>(
                      <p className='font-nunito text-xs font-normal text-primary '>{item.title}</p>

                    ))}
                    <p className='font-nunito font-normal text-xs mt-2 text-[#D7D7D7]'>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
                </div>
                <BsThreeDots  className='absolute top-8 right-0'/>
              
            </div>
            <div className='mb-16'>
            <h1 className='font-nunito text-2xl font-bold text-[#181818] mb-3'>{item.post}</h1>
            <img src={item.img}/>
            </div>
        </div>
        ))}
     
        </div>
       
    </div>
    }
    </>
  )
}

export default NewsFeed