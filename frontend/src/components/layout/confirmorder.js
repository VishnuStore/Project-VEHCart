import { useDispatch, useSelector } from "react-redux"
import ChechoutStep from "./checkoutstep";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "./MetaData";
import { Timestamp } from "firebase/firestore";
import {OrderPlaced} from "../../actions/orderAction"
import { useEffect } from "react";

export default function ConfirmOrder() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state?.persistState?.cartState) || [];
    const { shippinginfo } = useSelector(state => state?.persistState?.cartState) || {};
    const { user } = useSelector(state => state?.persistState.authState) || {};
    const itemPrice = cartItems?.reduce((acc, item) => (acc + Number(item.price).toFixed(2) * item.quantity), 0);
    const shippingPrice = itemPrice > 200 ? 0 : 25;
    let taxPrice = 0.05 * itemPrice;
    const totalprice = Number(itemPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(0.05 * itemPrice).toFixed(2);
    const getEstimatedDeliveryTimestamp = (daysToAdd = 5) => {
        const now = new Date();
        now.setDate(now.getDate() + daysToAdd);
        return Timestamp.fromDate(now);
      };
      useEffect(()=>{
        
      })
        const OrderData = {
            userId: user?.uid,
            email: user?.email,
            shippinginfo,
            cartItems,
            paymentMethod: "Cash on Delivery",
            Orderstatus: "Processing",
            createdAt: new Date().toISOString(),
            itemPrice,
            shippingPrice,
            taxPrice,
            totalprice,
            paymentMethod: "Cash on Delivery",
            DeliveryAt:getEstimatedDeliveryTimestamp(5)
        }
    return (
        <div>
            <ChechoutStep Shipping ConfirmOrder />
             <MetaData title={'VEHcart-Placed-Order'} />
            <div className="container m-auto my-20">

                <div className="flex justify-between align-items">
                    <div className="my-5 w-3/5 ">
                    <div className="text-center border p-2 rounded-md border-lime-200 shadow-lime-400 shadow-md">
                    <p className="mb-3 text-center text-xl text-violet-600 font-semibold underline">Shipping Info</p>
                        <p className="text-xl font-bold">UserId: <span className="text-base font-semibold">{user?.uid}</span></p>
                        <p className="text-xl font-bold">Name: <span className="text-base font-semibold">{user?.displayName}</span></p>
                        <p className="text-xl font-bold">Email: <span className="text-base font-semibold">{user?.email}</span></p>
                        <p className="text-xl font-bold">Phone: <span className="text-base font-semibold">{shippinginfo?.phoneno}</span></p>
                        <p className="text-xl font-bold">Address: <span className="text-base font-semibold">{shippinginfo?.address},{shippinginfo?.city},{shippinginfo?.zipcode},{shippinginfo?.state},{shippinginfo?.country}</span> </p>
                    </div>
                       <div className="text-center">
                       <h4 className="my-4 text-xl font-medium">Your Cart Items : <span className="font-bold">{cartItems.length}</span></h4>
                       </div>
                        {
                            cartItems?.map(items =>
                                <div className=" my-5 border p-5 rounded-md border-lime-200 shadow-lime-400 shadow-md">
                                    <div className="flex justify-around align-items ">
                                        <div className="w-20">
                                            <img src={items.images[0]} alt={items.name} />
                                        </div>
                                        <div className="align-items">
                                            <h1 className="">{items.name}</h1>
                                        </div>
                                        <div className="">
                                            <p>{items.quantity} Qty</p>
                                        </div>
                                        <div className="">
                                            <p>₹ {items.price}</p>
                                        </div>
                                        <div className="">
                                            <p>₹ {items.quantity * Number(items.price).toFixed(2)}</p>
                                        </div>

                                    </div>
                                </div>
                            )
                        }
                        <hr />
                    </div>

                    <div className="w-1/4 ">
                        <div className=" p-5 border rounded-md border-lime-300 shadow-lime-400 shadow-md">
                            <h4 className="text-2xl font-semibold text-center py-2">Order Summary</h4>
                            <hr />
                              <div className="my-5">
                                <p className="text-xl font-medium">Subtotal :  <span className=" text-base font-semibold float-right">₹ {itemPrice}</span></p>
                                <p className="text-xl font-medium">Shipping : <span className=" text-base font-semibold float-right">₹ {shippingPrice}</span></p>
                                <p className="text-xl font-medium">Tax :  <span className="text-base font-semibold float-right">₹ {taxPrice}</span></p>
                              </div>
                            <hr />

                           <div className="my-5">
                           <p className="text-xl font-medium">Total: <span className="text-base font-semibold float-right">₹ {totalprice}</span></p>
                           </div>

                            <hr />
                            <div className="mt-10">
                        <Link to={'/Placed-Order'}> <button onClick={()=> dispatch(OrderPlaced(OrderData))}  className="w-full text-gray-500 font-bold rounded-md bg-lime-300 py-2">PLACE ORDER ( Cash On Delivery )</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}