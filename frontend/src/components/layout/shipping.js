import MetaData from "./MetaData";
import { useState } from 'react';
import {countries} from 'countries-list';
import { useDispatch, useSelector } from "react-redux";
import { ShippingInfo } from "../../actions/cartAction";
import ChechoutStep from "./checkoutstep";
import { useNavigate} from "react-router-dom";
export default function Shipping() { 
    const navigate = useNavigate();
    const dispatch =  useDispatch();
    const {Shippinginfo} = useSelector(state=>state?.persistState?.cartState)||{};
    const [shipping,setshipping]=useState({
    address:Shippinginfo?.address,
    phoneno: Shippinginfo?.phoneno,
    country: Shippinginfo?.country,
    state: Shippinginfo?.state,
    city: Shippinginfo?.city,
    zipcode: Shippinginfo?.zipcode
    });
    const countriesList = Object.values(countries);
    const handlechange=(e)=>{
       const {name,value} = e.target;
       if(name in shipping){
        setshipping({...shipping,[name]:value});
       }
    }
    const submit=(e)=>{
        e.preventDefault();
        dispatch(ShippingInfo(shipping));
        navigate('/Order/Confirm')
    }
    return (
        <div>
             <ChechoutStep Shipping/>
              <div className='grid grid-rows-1 '>
            <MetaData title={'VEHcart-Shipping-Details'} />
            <div className='grid grid-cols '>
                <div className='border border-grey-100 w-30 m-auto shadow-md my-12 rounded-lg'>
                    <div className='p-6 space-y-2'>
                        <form onSubmit={submit}>
                            <h1 className='text-align pb-10 text-4xl font-semibold text-gray-500'>Shipping Info</h1>
                            <div className='py-4'>
                               <div className="pb-2">
                               <label className='text-xl'>Address :</label>
                               </div>
                                <input className='p-1 border w-full outline-none pl-2 border-gray-500'
                                    type="text"
                                    name="address"
                                    value={shipping.address}
                                    onChange={handlechange}
                                    required />
                            </div>

                            <div className='py-4'>
                               <div className="pb-2">
                               <label className='text-xl'>Phone-No :</label>
                               </div>
                                <input className='p-1 border outline-none w-full pl-2 border-gray-500'
                                    type="number"
                                    name="phoneno"
                                    value={shipping.phoneno}
                                    onChange={handlechange}
                                    required />
                            </div>
                            <div className='py-4'>
                               <div className="pb-2">
                               <label className='text-xl'>Country :</label>
                               </div>
                               <select className='p-1 border outline-none w-full pl-2 border-gray-500'
                                onChange={handlechange}
                                name="country"
                                value={shipping.country}
                               required>
                                <option value="" >Select Country</option>
                                    {countriesList.map((country,i)=>
                                        <option key={i}>
                                            {country.name}
                                        </option>
                                    )}
                               </select>
                            </div>
                            <div className='py-4'>
                              <div className="pb-2">
                              <label className='text-xl'>State :</label>
                              </div>
                              <input className='p-1 border outline-none w-full pl-2 border-gray-500'
                                    type="text"
                                    onChange={handlechange}
                                    name="state"
                                    value={shipping.state}
                                    required />
                            </div>
                            <div className='py-4'>
                               <div className="pb-2">
                               <label className='text-xl'>City :</label>
                               </div>
                               <input className='p-1 border outline-none w-full pl-2 border-gray-500'
                                    type="text"
                                    onChange={handlechange}
                                    name="city"
                                    value={shipping.city}
                                    required />
                            </div>
                            <div className='py-4'>
                               <div className="pb-2">
                               <label className='text-xl'>Zip-Code</label>
                               </div>
                               <input className='p-1 border outline-none w-full pl-2 border-gray-500'
                                    type="number"
                                    onChange={handlechange}
                                    name="zipcode"
                                    value={shipping.zipcode}
                                    required />
                            </div>                    
                                <button type="submit" className='w-full bg-lime-300 rounded-md text-gray-400 p-2 my-5 text-2xl font-semibold'>CONTINUE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}