import { useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Search from './search';
import { logout } from '../../actions/userAction';
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { cartFail, cartSuccess, setShippingInfo } from '../../slices/cartSlice';
import { doc, getDoc } from 'firebase/firestore';
import { vehDB } from '../../firebaseConfig';
import { toast } from 'react-toastify';
export default function Header() {
    const { user } = useSelector(state => state.persistState.authState);
    const cartItems = useSelector((state) => state.persistState.cartState.cartItems);
    const dispatch = useDispatch();
    const logoutbtn=()=>{
        dispatch(logout());
    }

    async function getcartitem(){
        try{
            const querySnapshot = doc(vehDB, "Cart",user.uid);
             const cartSnapshot = await getDoc(querySnapshot);
                 dispatch(cartSuccess(cartSnapshot.data().cartItem || []));
                 console.log(cartSnapshot.data().cartItem || []);
        }catch(error){
           dispatch(cartFail("cart geting failed"));
        }
    }
    async function getshippinginfo(){
        const shippingDocRef = doc(vehDB, 'Cart', user.uid, 'ShippingInfo',"UserInfo");
        const docSnap = await getDoc(shippingDocRef);
        dispatch(setShippingInfo(docSnap.data()));
    }
    useEffect(()=>{
        if(user?.uid){
            getcartitem();
            getshippinginfo();
        }
    },[user])
    
    return (
        <nav className=" border-gray-200 bg-gray-400 p-1 rounded-md">
            <div className="flex flex-wrap items-center justify-between">
                <div className="">
                    <Link to={"/"}>
                        <img className="h-14 w-52  rounded-lg float-left" src="/image/vasanthi_electrical&hardware_Logo.png" alt="VEHCart" />
                    </Link>
                </div>
                <Search />
                <div className="p-2 flex">
                    {
                    user ?
                            <Menu as="div" className="relative inline-block pr-4">
                                <div>
                                    <MenuButton className="inline-flex w-full justify-center gap-x-2.5 rounded-md  px-3 py-2 text-md font-semibold text-gray-900 bg-purple-400 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-purple-300">
                                      MyProfile
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-900" />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    <div className="rounded-md">
                                    <MenuItem>
                                            <Link

                                                className="block rounded-md text-align py-2 text-xl bg-pink-200  text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                            >
                                                Welcome! {user?.displayName}
                                            </Link>
                                        </MenuItem>
                                        <hr/>
                                        <MenuItem>
                                            <Link
                                                to={"/My-Order"}
                                                className="block text-align py-2 text-xl text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                            >
                                                My Order
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link
                                                to={"/ChangePassword"}
                                                className="block text-align py-2 text-xl text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                            >
                                               Change Password
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to={"/"}><button 
                                                onClick={logoutbtn}
                                                className="block w-full py-2 text-xl text-gray-700 data-focus:bg-gray-100 data-focus:text-gray- data-focus:outline-hidden"
                                            >
                                               LogOut
                                            </button>
                                            </Link>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu> :
                            <Link to={"/Login"}><button className="text-gray-500 pad font-semibold mr-5 bg-red-500 text-2xl rounded-md"> Login</button> </Link>
                    }
                    {
                        !user?
                        <div className='p-1'>
                   <Link to={""}  className="border shadow-md rounded px-2 text-lime-300 font-bold  text-2xl hover:shadow-lime-900 mr-2">Cart</Link>
                   <span className="text-gray-600 text-md mr-5  rounded-md font-bold  px-2 py-1 bg-lime-300">{0}</span>
                   </div>:
                        <div className='p-1'>
                   <Link to={"/AddToCart"} className="border shadow-md rounded px-2 text-lime-300 font-bold  text-2xl hover:shadow-lime-900 mr-2">Cart</Link>
                   <span className="text-gray-600 text-md mr-5  rounded-md font-bold  px-2 py-1 bg-lime-300">{cartItems?.length||0}</span>
                   </div>
                    }
                   
                </div>
            </div>
        </nav>

    )
}