import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from  'react-loader-spinner'
import { useDispatch } from 'react-redux';
import {userLoginInfo} from '../slices/userSlice'
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
    const auth = getAuth();
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')
    let [emailerr,setEmailerr]=useState('')
    let [passworderr,setPassworderr]=useState('')
    let [loader,setLoader]=useState(false)
    let [passwordShow,setPasswordShow]=useState(false)
    let handleEmail=(e)=>{
        setEmail(e.target.value)
        setEmailerr('')
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
        if(email && password &&/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ){
            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                toast.success("Login Successful ");
                dispatch(userLoginInfo(user.user))
                localStorage.setItem('userInformation',JSON.stringify(user.user))
                setLoader(true)
                console.log(user)
                setTimeout(() => {
                    navigate('/home')
                    
                }, 2000);
            })
            .catch((error) => {
               console.log(error.code)
               if(error.code.includes('auth/wrong-password')){
                setPassworderr('Wrong Password')
               }
               if(error.code.includes('auth/user-not-found')){
                setEmailerr('Email Not Found Please Singup')
               }
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
        <div className='text-center mt-[106px] '>
        <img className='mx-auto' src='images/logo.png'/>
        <h2 className='font-nunito text-3xl font-bold text-primary mt-[42px]'>Login</h2>
        <p className='font-nunito text-xl font-normal text-primary mt-[11px]'>Free register and you can enjoy it</p>
        <div className='relative mt-[70px] w-[497px]'>
        <input onChange={handleEmail} className='w-full  px-14 py-6 outline-1 border border-solid border-primary rounded-md' type='email' />
        {emailerr && 
        <h3 className='bg-red-500 font-nunito text-lg w-full text-left text-white'>{emailerr}</h3>
        }
        <h4 className='font-nunito text-xl text-primary absolute top-[-14px] left-[46px] bg-white px-4'>Email Addres</h4>
        </div>
      
        <div className='relative mt-[40px] w-[497px]'>
        <input onChange={handlePassword} className='w-full  px-14 py-6 outline-1 border border-solid border-primary rounded-md' type={passwordShow?'text':'password'}  />
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
        <button onClick={handleSubmit} className='w-[497px] bg-[#086FA4] text-white py-5 rounded-3xl mt-[50px] font-nunito text-2xl font-medium'>Sign In</button>
        }
        <p className='font-opensanse text-primary text-lg py-5 px-3 text-center mt-[35px] normal'>Already  have an account ? <Link to='/'  className='text-[#EA6C00]'>SingUp</Link></p> 
    </div>
    </div>
  )
}

export default Login