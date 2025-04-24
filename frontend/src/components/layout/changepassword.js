import { useDispatch } from "react-redux";
import MetaData from "./MetaData"
import {  useState } from "react";
import { changepass } from '../../actions/userAction';

export default function Changepassword(){
    const [password,setpassword]=useState("")
    const [newpassword,setnewpassword]=useState("");
    const dispatch = useDispatch();
    function loadstop(e){
        e.preventDefault();
         dispatch(changepass(password,newpassword));
         setpassword("");
         setnewpassword("");
    }
    return(
        <div className='grid grid-rows-1 '>
        <MetaData title={'VEHcart-ChangePassword'} />
      <div className='grid grid-cols '>
          <div className='border border-grey-100 w-30 m-auto shadow-md my-24 rounded-lg'>
                  <div className='m-75 p-6  space-y-2'>
                     <form onSubmit={loadstop} >
                          <h1 className='text-align pb-10 text-4xl font-semibold text-gray-500'>Change Password</h1>
                          <label className='text-xl'>Password</label>
                          <div className='py-4'>
                             <input className='p-1 border w-full outline-none pl-2 border-gray-500' 
                              type="password" placeholder='Enter the Password' onChange={e=>{
                                setpassword(e.target.value)
                              }}/>
                          </div>
                          <label className='text-xl'>New Password</label>
                          <div className='py-4'>
                             <input className='p-1 border outline-none w-full pl-2 border-gray-500'
                              type="password" placeholder='Enter the New Password' onChange={e=>{
                                  setnewpassword(e.target.value)
                              }}/>
                          </div>
                         <div className='py-8'>
                      <button type="submit" className='w-full bg-lime-300 rounded-md text-gray-400 p-2 text-2xl font-semibold'>Set Password</button> 
                         </div>
                     </form>
                  </div>
          </div>
      </div>
  </div>
    )
}