import { Fragment, useEffect } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "../actions/productsAction";
import Loader from "./layout/Loader";
import AllProduct from './Product/product';
import { toast } from "react-toastify";
export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error} = useSelector((states) => states.persistState.productsState);
    useEffect(() => {
        if (error) {
            return toast.error(error, {
                className: "p-8 w-full text-sx font-bold",
                position: "bottom-center"
            })
        }
        dispatch(getproduct);
    }, [error,dispatch]);
    return (
        <Fragment>
            <MetaData title={'VEHcart-Ecommerce'} />
            {loading ? <Loader /> :
                <Fragment>
                    <h2 className="text-6xl">latest Product</h2>
                    <div className="grid container h-auto py-10 m-auto">
                        <div className="grid grid-cols-4 gap-5">
                        {products && products.map((product, ind) => (
                            //all products get the Database
                            <AllProduct key={`home-product-${ind + 1}`} product={product} />
                        )
                        )}
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>

    )
}