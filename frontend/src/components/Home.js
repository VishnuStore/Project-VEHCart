import { Fragment, useEffect, useState } from "react"
import MetaData from "./layout/MetaData"
import { useDispatch, useSelector } from "react-redux"
import { getproduct } from "../actions/productsAction";
import Loader from "./layout/Loader";
import AllProduct from './Product/product';
import { toast } from "react-toastify";
import Pagination from "react-js-pagination"

export default function Home() {
    const dispatch = useDispatch()
    const { products, loading, error,productsCount,perpage} = useSelector((states) => states.productsState)
    useEffect(() => {
        if (error) {
            return toast.error(error, {
                className: "p-8 w-full text-sx font-bold",
                position: "bottom-center"
            })
        }
        dispatch(getproduct(null))
    }, [error,dispatch]);
    return (
        <Fragment>
            <MetaData title={'VEHcart'} />
            {loading ? <Loader /> :
                <Fragment>
                    <h2 className="text-6xl">latest Product</h2>
                    <div className="grid grid-cols-4 gap-6 container py-10 m-auto">
                        {products && products.map((product, ind) => (
                            <AllProduct key={`home-product-${ind + 1}`} product={product} />
                        )
                        )}
                    </div>
                </Fragment>
            }
        </Fragment>

    )
}