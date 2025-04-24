import {  useState } from "react";
import { Link, } from "react-router-dom";
import {useDispatch} from "react-redux"
import {signup} from "../../actions/userAction"
import MetaData from "./MetaData";
export default function Signup() {
   const [fname,setfname]= useState();
   const [lname,setlname]= useState();
   const [email,setemail]= useState();
   const [password,setpassword]= useState();
   const dispatch = useDispatch();
    function loadstop(e){
        e.preventDefault();
    }
    function signbth(){
        dispatch(signup(fname,lname,email,password));
        setfname("");
        setlname("");
        setemail("");
        setpassword("");
    }
    return (
        <div className='grid grid-rows-1 '>
              <MetaData title={'VEHcart-Sign-Up'} />
            <div className='grid grid-cols '>
                <div className='border border-grey-100 w-30 m-auto shadow-md my-16 rounded-lg'>
                    <div className='m-75 p-6  space-y-2'>
                        <form onSubmit={loadstop}>
                            <h1 className='text-align text-4xl font-semibold text-gray-500 pb-10'>Sign Up</h1>
                            <label className='text-xl'>First Name</label>
                            <div className='py-4'>
                                <input className='p-1 border w-full outline-none pl-2 border-gray-500'
                                 onChange={e=>{
                                    setfname(e.target.value)
                                }} type="text" placeholder='Enter the firstname' required />
                            </div>
                            <label className='text-xl'>Last Name</label>
                            <div className='py-4'>
                                <input className='p-1 border w-full outline-none pl-2 border-gray-500'
                                onChange={e=>{
                                    setlname(e.target.value)
                                }} type="text" placeholder='Enter the lastname' required />
                            </div>
                            <label className='text-xl'>Email</label>
                            <div className='py-4'>
                                <input className='p-1 border outline-none w-full pl-2 border-gray-500' 
                                 onChange={e=>{
                                    setemail(e.target.value)
                                }} type="email" placeholder='Enter the email' required />
                            </div>
                            <label className='text-xl'>Password</label>
                            <div className='py-4'>
                                <input className='p-1 border outline-none w-full pl-2 border-gray-500' 
                                 onChange={e=>{
                                    setpassword(e.target.value)
                                }} type="password" placeholder='Enter the password' required />
                            </div>
                            <div className='py-4'>
                               <Link to={"/"}><button onClick={signbth} className='w-full bg-lime-300 rounded-md text-gray-400 p-2 text-2xl font-semibold'>SIGNUP</button></Link> 
                                <p className='text-align py-4 text-md font-semibold'>Aleady You have Acount ! <Link to={"/Login"} className="pl-1 text-blue-500 underline font-medium text-xl">Login</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}