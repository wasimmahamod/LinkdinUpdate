import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile   } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDatabase, ref, set ,push} from "firebase/database";
import { ProgressBar } from  'react-loader-spinner'
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sinup = () => {
    const auth = getAuth();
    const db = getDatabase();
  
    let navigate=useNavigate()
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')
    let [name,setName]=useState('')
    let [nameerr,setNameerr]=useState('')
    let [emailerr,setEmailerr]=useState('')
    let [passworderr,setPassworderr]=useState('')
    let [loader,setLoader]=useState(false)
    let [passwordShow,setPasswordShow]=useState(false)

    let handleEmail=(e)=>{
        setEmail(e.target.value)
        setEmailerr('')
    }
    let handleFullname=(e)=>{
        setName(e.target.value)
        setNameerr('')
    }

    let handlePassword=(e)=>{
        setPassword(e.target.value)
        setPassworderr('')
    }
    let handleSubmit=()=>{
        if(!email){
            setEmailerr('Email Is Required')
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setEmailerr('Invalid Email')
        }
        if(!password){
            setPassworderr('Password Is Required')
        }
        if(!name){
            setNameerr('Name Is Required')
        }
        if(email && password && name&&/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ){
            createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: name, photoURL: 'images/profile.png'
                      }).then(() => {
                        toast.success("Registration Successful ");
                        setLoader(true)
                        setEmail('')
                        setPassword('')
                        setName('')
                        setTimeout(() => {
                            navigate('/form')
                            
                        }, 2000);
                        
                        set(ref(db, 'user/'+user.user.uid), {
                            name:name,
                            email:email,
                          })
                      }).catch((error) => {
                        console.log(error.code)
                      });
                   
                });
              
                
            })
            .catch((error) => {
                if(error.code.includes('auth/email-already-in-use')){
                    setEmailerr('Email Already In use')
                }
                console.log(error.code)
            });
        }
    }
  return (
    <div className='flex justify-center'>
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
    <div className='text-center mt-[60px] '>
    <img className='mx-auto' src='images/logo.png'/>
    <h2 className='font-nunito text-3xl font-bold text-primary mt-[42px]'>Get started with easily register</h2>
    <p className='font-nunito text-xl font-normal text-primary mt-[11px]'>Free register and you can enjoy it</p>
    <div className='relative mt-[70px] w-[497px]'>
    <input onChange={handleEmail} className='w-full  px-14 py-6 outline-1 border border-solid border-primary rounded-md' type='email' />
    {emailerr && 
        <h3 className='bg-red-500 font-nunito text-lg w-full text-left text-white'>{emailerr}</h3>
        }
    <h4 className='font-nunito text-xl text-primary absolute top-[-14px] left-[46px] bg-white px-4'>Email Addres</h4>
    </div>
    <div className='relative mt-[40px] w-[497px]'>
    <input onChange={handleFullname} className='w-full  px-14 py-6 outline-1 border border-solid border-primary rounded-md' />
    {nameerr && 
        <h3 className='bg-red-500 font-nunito text-lg w-full text-left text-white'>{nameerr}</h3>
        }
    <h4 className='font-nunito text-xl text-primary absolute top-[-14px] left-[46px] bg-white px-4'>Full name</h4>
    </div>
    <div className='relative mt-[40px] w-[497px]'>
    <input onChange={handlePassword} className='w-full  px-14 py-6 outline-1 border border-solid border-primary rounded-md' type={passwordShow?'text':'password'} />
    {passworderr && 
        <h3 className='bg-red-500 font-nunito text-lg w-full text-left text-white'>{passworderr}</h3>
        }
    <h4 className='font-nunito text-xl text-primary absolute top-[-14px] left-[46px] bg-white px-4'>Password</h4>
    {passwordShow ?
    <AiFillEye onClick={()=>setPasswordShow(!passwordShow)} className='absolute top-7 right-4 text-xl'/>
    :
    <AiFillEyeInvisible onClick={()=>setPasswordShow(!passwordShow)}  className='absolute top-7 right-4 text-xl'/>
    }
    </div>
    {loader 
    ?
    <div className='w-[497px] flex justify-center items-center'>
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
    <button onClick={handleSubmit} className='w-[497px] bg-[#086FA4] text-white py-5 rounded-3xl mt-[50px] font-nunito text-xl font-medium'>Sign up</button>
    }
        <p className='font-opensanse text-primary text-lg py-5 px-3 text-center mt-[35px] normal'>Already  have an account ? <Link to='/login'  className='text-[#EA6C00]'>Sign In</Link></p> 
</div>
</div>
  )
}

export default Sinup