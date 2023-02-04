import React, { useEffect, useState } from 'react'
import { MdOutlineCloudUpload ,MdOutlineCloseFullscreen} from 'react-icons/md'
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { getDatabase, push, ref as dref, set ,onValue} from "firebase/database";
import { useSelector } from 'react-redux';


const Project = () => {
    const db = getDatabase();
    const storage = getStorage();
    let [projectModal,setProjectModal]=useState(false)
    let [porjectImg,setProjectImg]=useState(null)
    let [porjectList,setProjectList]=useState([])
    let data = useSelector((state) => state.userLoginInfo.userInformation)

    let handleProjectFile=(e)=>{
        const storageRef = ref(storage, e.target.files[0].name);
        uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {
                setProjectImg(downloadURL)
              });
        });
    }

    let handleUploadProject=()=>{
        set(push(dref(db, 'project/')), {
            admin:data.displayName,
            adminid:data.uid,
            porjectimg:porjectImg,
          }).then(()=>{
            setProjectModal(false)
          })
    }
    useEffect(()=>{
        const starCountRef = dref(db, 'project/');
        onValue(starCountRef, (snapshot) => {
        let arr=[]
        snapshot.forEach((item)=>{
        if(data.uid==item.val().adminid){
            arr.push({...item.val(),id:item.key})
        }
        })
        setProjectList(arr)
        });
    },[])
    return (
        <div className='mt-20 relative'>
            <div className='flex gap-x-5 items-center'>
                <h3 className='font-nunito font-bold text-primary text-2xl mb-5'>Project</h3>
                <p className='font-nunito font-normal text-[#747474] text-md mb-5'>3 of 12</p>
            </div>
            <div className='flex gap-x-2 flex-wrap'>
                <div class="flex justify-center w-[250px] h-[250px] ">
                    <div class="rounded-lg ">
                        <div className='w-full h-[150px] relative group'>
                            <img className='w-full h-full' src='images/p1.png' alt="" />
                            <div className='w-full h-full group-hover:h-full bg-[rgba(0,0,0,.7)] absolute top-0 left-0 flex justify-center items-center ease-linear duration-300'>
                            <MdOutlineCloudUpload onClick={()=>setProjectModal(true)} className='text-3xl text-white ' />
                    </div>
                        </div>
                        <div class="mt-3">
                            <h5 class="text-xl font-medium mb-2 inline-block font-nunito text-primary ">Upload Your Project</h5>
                          
                        </div>
                    </div>
                   
                </div>
                {porjectList.map((item)=>(
                <div class="flex justify-center w-[250px] h-[250px]">
                    <div class="rounded-lg ">
                    <div className='w-full h-[150px] relative group'>
                            <img className='w-full h-full' src={item.porjectimg} alt="" />
                        </div>
                    </div>
                </div>

                ))}
                {/* <div class="flex justify-center w-[250px] h-[250px]">
                    <div class="rounded-lg ">
                    <div className='w-full h-[150px] relative group'>
                            <img className='w-full h-full' src='images/p3.png' alt="" />
                            <div onClick={()=>setProjectModal(true)} className='w-full h-0 group-hover:h-full bg-[rgba(0,0,0,.7)] absolute top-0 left-0 flex justify-center items-center ease-linear duration-300'>
                       <MdOutlineCloudUpload className='text-3xl text-white hidden group-hover:block ease-linear duration-300' />
                    </div>
                        </div>
                    </div>
                   
                </div> */}

            </div>
            {projectModal &&
            <div className='w-full h-full  bg-[rgba(0,0,0,.7)] absolute top-0 left-0 flex justify-center items-center p-5'>
                <MdOutlineCloseFullscreen onClick={()=>setProjectModal(false)} className='text-red-500 text-3xl absolute top-3 right-3'/>
               <div>
               <h3 className='font-nunito font-medium text-2xl text-white '>Upload Your Project </h3>
                <input onChange={handleProjectFile} className='font-nunito mt-5 text-xl text-white block' type="file"/>
                
                <img className='w-[100px] h-[70px]' src={porjectImg}/>
                <button onClick={handleUploadProject} className='font-nunito mt-5 text-xl text-white bg-primary p-2 rounded-md' >Upload</button>
               </div>
            </div>
        }
            
            <button className='font-nunito text-lg font-medium text-primary mt-3'>Show all (12)</button>
        </div>
    )
}

export default Project