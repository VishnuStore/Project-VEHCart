import { useState } from "react";
import MetaData from "./MetaData";
import { Link } from "react-router-dom";
import { forgetpassword } from "../../actions/userAction";
import { useDispatch } from "react-redux";

export default function ForgetPassword(){
    const dispatch = useDispatch();
    const[email,setemail]=useState();
    function loadstop(e){
        e.preventDefault();
        dispatch(forgetpassword(email));
    }
    const forgetbtn=()=>{
        dispatch(forgetpassword(email));
    }
    return(
        <div className='grid grid-rows-1 '>
        <MetaData title={'VEHcart-ForgetPassword'} />
      <div className='grid grid-cols '>
          <div className='border border-grey-100 w-30 m-auto shadow-md my-36 rounded-lg'>
                  <div className='m-75 p-6  space-y-2'>
                     <form onSubmit={loadstop} >
                          <h1 className='text-align pb-10 text-4xl font-semibold text-gray-500'>Forgot Password</h1>
                          <label className='text-xl'>Email</label>
                          <div className='py-4'>
                             <input className='p-1 border w-full outline-none pl-2 border-gray-500' 
                              type="email" placeholder='Enter the Email' onChange={e=>{
                                  setemail(e.target.value)
                              }}/>
                          </div>                        
                         <Link to={"/"} ><button onClick={forgetbtn}  className='w-full bg-lime-300 rounded-md text-gray-400 p-2 text-2xl font-semibold'>Send Email</button></Link>
                        
                     </form>
                  </div>
          </div>
      </div>
  </div>
    )
}