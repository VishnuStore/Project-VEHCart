import { Fragment, useEffect } from "react"
import MetaData from "../layout/MetaData"
import { useDispatch, useSelector } from "react-redux"
import { getproduct } from "../../actions/productsAction";
import Loader from "../layout/Loader";
import AllProduct from '../Product/product';
import { useParams } from "react-router-dom";

export default function SearchProduct() {
    const dispatch = useDispatch()
    const {keyword} = useParams()
    const { products, loading, error,productsCount,perpage} = useSelector((states) => states.productsState)
    useEffect(() => {
        dispatch(getproduct(keyword))
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