import { Fragment, useEffect, useState } from "react";
import { singleproduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { AddtoCart } from "../../actions/cartAction";
import Model from "../layout/reviewModel";

export default function ProductDetail() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const dispatch = useDispatch();
    const { loading, product={},isReviewSubmitted } = useSelector((state) => state.persistState?.productState);
    const { user } = useSelector(state => state.persistState.authState);
    const [quantity, setquatity] = useState(1);
    const { id } = useParams();
    const increaseQty = () => {
        if (quantity < product.stock) {
            setquatity(preQuantity => preQuantity + 1);
        }
    }
    const decreaseQty = () => {
        if (quantity > 1) {
            setquatity(preQuantity => preQuantity - 1);
        }
    }
    const handleCart = () => {
        dispatch(AddtoCart(quantity, product));
    }
    useEffect(() => {
        dispatch(singleproduct(id));
        if(!id||isReviewSubmitted){
            dispatch(singleproduct(id))
        }
    }, [id, dispatch])
    return (
        <Fragment>
            <MetaData title={product?.name} />
            {loading ? <Loader /> :
                <div className="container m-auto">
                    <div className="grid grid-cols-2 gap-1 grid-flow-row my-16">
                        <div className="lg:col-span-1 sm:col-span-2 sm:pb-8">
                            <img className="h-500 w-500 my-auto lg:mx-auto lg:mt-14 sm:m-auto" src={product.images?.[0]} alt={product.name} />
                        </div>
                        <div className="lg:col-span-1 sm:col-span-2">
                            <h3 className="text-3xl py-4 font-semibold">{product.name}</h3>
                            <hr />
                            <div className="py-4">
                                <div className="rating-outer text-6xl ">
                                    <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                                </div>
                                {product.numOfReviews > 0 && <span className="font-medium"> {product.numOfReviews}</span>}
                            </div>
                            <hr />
                            <div className="py-4">
                                <p className="text-3xl font-normal">$ {product.price}</p>
                                <div className="py-6">
                                    <button onClick={decreaseQty} className="bg-yellow-700  rounded-xl px-3 text-white text-font"> - </button>
                                    <span className="px-3 text-xl ">{quantity}</span>
                                    <button onClick={increaseQty} className="bg-green-600 rounded-xl px-3 text-white text-font">+</button>
                                </div>
                                {!user ? <Link to={"/Login"}><button onClick={handleCart} className="bg-lime-300 px-5 py-2 rounded-full text-font  text-gray-600 font-semibold">ADD TO CART</button></Link> : <Link to={"/AddToCart"}><button onClick={handleCart} className="bg-lime-300 px-5 py-2 rounded-full text-font  text-gray-600 font-semibold">ADD TO CART</button></Link>}
                            </div>
                            <hr />
                            <p className="py-3">status :{product.stock === 0 ? <span className="text-2xl  text-red-600 font-medium">Out Stock</span> : <span className="text-2xl px-2 font-medium">In Stock</span>} </p>
                            <hr />
                            <div className="py-5">
                                <h4 className="pb-2 text-4xl font-semibold">Description:</h4>
                                <p className="text-lg text-gray-600 font-medium">
                                    {product.description}
                                </p>
                            </div>
                            <hr />
                        { user?
                            <button onClick={()=>setOpen(true)} className="bg-lime-300 px-6 mt-5 py-3 rounded-full text-2xl text-gray-500 font-semibold">Submit Your Review</button>:
                            <button hidden className="bg-lime-300 px-6 mt-5 py-3 rounded-full text-2xl text-gray-500 font-semibold">Submit Your Review</button>
                        }
                        </div>
                        <div>
                        </div>
                    </div>
                   
                </div>}
                <Model isOpen={open} onclose={()=>setOpen(false)} id={id}/>
        </Fragment>
    )

}