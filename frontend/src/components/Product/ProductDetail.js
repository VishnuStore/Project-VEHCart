import { Fragment, useEffect } from "react"
import { singleproduct } from "../../actions/productAction"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
export default function ProductDetail() {
    const dispatch = useDispatch();
    const { loading, product } = useSelector((state) => state.productState)
    const { id } = useParams();
    useEffect(() => {
        dispatch(singleproduct(id))
    }, [])
    return (
        <Fragment>
            <MetaData title={product?.name}/>
            {loading ? <Loader /> :
            <div className="container m-auto">
                <div className="grid grid-cols-2 gap-1 grid-flow-row my-16">
                    <div className="lg:col-span-1 sm:col-span-2 sm:pb-8">
                        <img className="h-500 w-500 my-auto lg:mx-auto lg:mt-14 sm:m-auto" src={product.images?.[0]} alt={product.name} />
                    </div>
                    <div className="lg:col-span-1 sm:col-span-2">
                        <h3 className="text-3xl font-semibold">{product.name}</h3>
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
                                <span className="bg-yellow-700  rounded-xl px-3 text-white text-font"> -</span>
                                <span className="px-3 text-xl ">1</span>
                                <span className="bg-green-600 rounded-xl px-3 text-white text-font">+</span>
                            </div>
                            <button className="bg-lime-300 px-5 py-2 rounded-full text-font  text-gray-600 font-semibold">ADD TO CART</button>
                        </div>
                        <hr />
                        <div className="py-5">
                            <p className="">status : <span className="text-2xl font-medium">In Stock</span></p>
                            <h4 className="pb-2 text-4xl font-semibold">Description:</h4>
                            <p className="text-lg text-gray-600 font-medium">
                                {product.description}
                            </p>
                        </div>
                        <hr />
                        <button className="bg-lime-300 px-6 mt-5 py-3 rounded-full text-2xl text-gray-500 font-semibold">Submit Your Review</button>
                    </div>
                </div>
            </div>}
        </Fragment>
    )

}