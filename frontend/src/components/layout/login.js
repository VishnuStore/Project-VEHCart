import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import MetaData from './MetaData';
import {login} from "../../actions/userAction"
import { toast } from 'react-toastify';
export default function Login(){
   const[email,setemail]= useState("");
   const[password,setpassword]= useState("");
   const {user} = useSelector(state=> state.persistState.authState)
   const dispatch = useDispatch();
   const navigate = useNavigate();
    function loadstop(e){
        e.preventDefault();   
    }
    if(user){
        navigate("/");
    }
    function loginbtn(){
       dispatch(login(email,password)) ;
       setemail('');
        setpassword('');
    }
    return(
        <div className='grid grid-rows-1 '>
              <MetaData title={'VEHcart-Login'} />
            <div className='grid grid-cols '>
                <div className='border border-grey-100 w-30 m-auto shadow-md my-24 rounded-lg'>
                        <div className='m-75 p-6  space-y-2'>
                           <form onSubmit={loadstop} >
                                <h1 className='text-align pb-10 text-4xl font-semibold text-gray-500'>Login</h1>
                                <label className='text-xl'>Email</label>
                                <div className='py-4'>
                                   <input className='p-1 border w-full outline-none pl-2 border-gray-500' 
                                    type="email" placeholder='Enter the Email' onChange={e=>{
                                        setemail(e.target.value)
                                    }} required/>
                                </div>
                                <label className='text-xl'>Password</label>
                                <div className='py-4'>
                                   <input className='p-1 border outline-none w-full pl-2 border-gray-500'
                                    type="password" placeholder='Enter the password' onChange={e=>{
                                        setpassword(e.target.value)
                                    }} required/>
                                </div>
                               <div className='py-8'>
                               <Link to={"/ForgetPassword"} className='float-right pb-6 font-semibold  text-blue-500 underline'>Forgot Password?</Link>
                               <button onClick={loginbtn} className='w-full bg-lime-300 rounded-md text-gray-400 p-2 text-2xl font-semibold'>LOGIN</button>
                                <p className='float-right py-4 text-md font-semibold'> Create Account 
                                <Link to={"/Sign-Up"} className='pl-2 text-blue-500 underline'>Sign-Up</Link></p>
                               </div>
                           </form>
                        </div>
                </div>
            </div>
        </div>
    )
}