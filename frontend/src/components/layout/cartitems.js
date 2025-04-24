import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { removecart } from "../../actions/cartAction";
import MetaData from "./MetaData";

export default function Cart(){
    const {cartItems} = useSelector(state=>state?.persistState?.cartState)||{};
    const dispatch = useDispatch();
    return(
            <div className="container m-auto">
                 <MetaData title={'VEHcart-Cart-Items'} />
            <h2 className="my-5 text-4xl">Your Cart: {cartItems?.length===0 ?<b> Is Empty</b>:<b>{cartItems?.length} Items</b>}</h2> 
            <div className="flex justify-between align-items flex-col">
                { cartItems?.map((items,index)=>(
                <div key={index} className=" w-2/3  border shadow-md rounded-md p-4">
                        <div className="flex justify-between flex-row align-items">
                            <div className="">
                                <img src={items.images[0]} alt={items.name} height="90" width="115"/>
                            </div>
    
                            <div className="w-200 text-align  mx-10 w-18 ">
                               <Link to={`/product/${items.name}`}>{items.name}</Link>
                            </div>
    
                            <div className="text-2xl  font-bold">
                                <p>₹ {items.price}</p>
                            </div>
    
                            <div className="my-10">
                                <div className="text-align flex">                               
                                    <span className="px-3 text-xl ">Quantity : <span className="border px-5 bg-gray-200 font-mono ml-1">{items.quantity}</span></span>
                                </div>
                            </div>
    
                            <div className=" text-4xl mx-10 text-red-400">
                                <button onClick={()=>{dispatch(removecart(items))}} id="delete_cart_item" className="fa fa-trash btn btn-danger"></button>
                            </div>
    
                        </div>
                </div>
                ))                
                }
                    <div  className=" w-2/3 text-align border shadow-md rounded-md p-4 mt-8">
                        <h4 className="py-2 text-2xl font-bold">Order Summary</h4>
                        <hr />
                        <p className="py-2 text-xl font-semibold">Subtotal:  <span class="order-summary-values">{cartItems?.reduce((acc,item)=>(acc+item.quantity),0)} (Items)</span></p>
                        <p className="py-2 text-xl font-medium">Total Amount: <span class="order-summary-values">₹ {cartItems?.reduce((acc,item)=>(acc+item.quantity*Number(item.price).toFixed(2)),0)}</span></p>
        
                        <hr />
                       <Link to={"/Shipping"}><button className="bg-lime-400 px-3 py-2 text-xl my-2 rounded-lg">Check out</button></Link> 
                    </div>
            </div>
         </div>
        
    )
}