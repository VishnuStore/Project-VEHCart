import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function PlaceOrder(){
    const {orderInfo,loading} = useSelector(state=>state?.persistState?.orderState)||{};
    return(
        <div className="container m-auto">
        {
            loading ?<Loader/>:
            <div className=" justify-center">
                <div className="my-32 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/image/success.png" alt="Order Success" width="200" height="200" />
    
                    <h2 className="text-4xl font-semibold">Your Order has been placed successfully.</h2>
    
                    <Link to={'/My-Order'}><button className="my-5 text-xl font-medium underline text-violet-600">Go to Orders</button></Link>
                </div>
    
            </div>
       
        }
         </div>
    )
}