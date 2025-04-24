import { useSelector } from "react-redux";

export default function MyOrder() {
    const { OrderInfo } = useSelector(state => state.persistState.orderState);
    const { user } = useSelector(state => state.persistState.authState);
    return (
        <div className="container mx-auto">

            <div className="flex justify-between">
                <div className="col-12 col-lg-8 mt-5 order-details">

                    <h1 className="my-5">Order # {OrderInfo?.userId}</h1>

                    <h4 className="mb-4"></h4>
                    <p><b>Name:</b> {user?.displayName}</p>
                    <p><b>Phone:</b>{OrderInfo.shippinginfo.phoneno} </p>
                    <p className="mb-4"><b>Address:</b>{OrderInfo.shippinginfo.address}</p>
                    <p><b>Amount:</b> ₹ {OrderInfo.totalprice}</p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className="greenColor" ><b>{OrderInfo.paymentMethod}</b></p>


                    <h4 className="my-4">Order Status:</h4>
                    <p className='greenColor' ><b>{OrderInfo.Orderstatus}</b></p>
                    <hr />
                    <h4 className="my-4">Order Items:</h4>
                    
                        {OrderInfo.cartItems.map((item, index) => (
                            <div className="flex justify-between my-5">
                                <div className="col-4 col-lg-2">
                                    <img src={item.images[0]} alt="Laptop" height="45" width="65" />
                                </div>

                                <div className="col-5 col-lg-5">
                                    <a href="#">{item.name}</a>
                                </div>


                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>₹{item.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{item.quantity} Piece(s)</p>
                                </div>
                            </div>

                        ))}
                   
                    <hr />
                </div>
            </div>

        </div>
    );
}; 