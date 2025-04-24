import { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import { price } from "../../actions/searchAction";
import { ratingfilter } from "../../actions/searchAction";
import AllProduct from "./product";
import { category } from "../../actions/searchAction";
import 'rc-slider/assets/index.css';


export default function SearchProduct() {
    const dispatch = useDispatch();
    const { products, loading,} = useSelector((states) => states.persistState.searchState);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [rating,setrating] = useState(0);
    const categorys = [
        "filter-category",
        "Laptops",
        "Mobile Phones",
        "Accessories",
        "Headphones",
        "Sports",
        "Eveready"
    ];
    const pricebtn = () => {
        dispatch(price(minPrice, maxPrice));
        setMinPrice("");
        setMaxPrice("");
    }

    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleRatingClick = (starValue) => {
        // const rating = Number(e.target.value); 
        setrating(starValue);
        dispatch(ratingfilter(starValue));
      };
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        dispatch(category(selectedValue));
    }
        return (
            <Fragment>
                <MetaData title={'VEHcart- product Search'} />
                {loading ? <Loader /> :
                    <Fragment>
                        <h2 className="text-6xl">Search Product</h2>
                        <div className="container flex py-10 m-auto">
                            <div className="grid grid-flow-row w-1/4 mx-5 ">
                                <div className="border border-gray-200 rounded-md shadow-inner ">
                                    <h2 className="text-align py-2 bg-gray-300 text-xl font-medium">Product Filter</h2>
                                    {/* price filter */}
                                    <div className="text-align ">
                                        <p className="font-mono font-bold pt-10">Price</p>
                                        <div className="inline-flex mb-8 pt-2">
                                            <input
                                                className="border border-black outline-none w-24 mr-1 pl-2"
                                                type="number"
                                                placeholder="Min Price"
                                                value={minPrice || ""}
                                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                            />
                                            <input
                                                className="border border-black outline-none w-24 pl-2"
                                                type="number"
                                                placeholder="Max Price"
                                                value={maxPrice || ""}
                                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                            />
                                            <button onClick={pricebtn} className="border border-gray-300 px-2 bg-gray-300 font-semibold ml-2" >Filter</button>
                                        </div>
                                        <hr />
                                        {/* Categories Filter */}
                                        <div className="m-8">
                                            <p className="font-mono font-bold">Categories</p>
                                            <div className=" pt-2 ">
                                                <select value={selectedCategory} onChange={handleChange} className="outline-none border border-grey-300 px-5 py-2">
                                                    {
                                                        categorys.map((category, ind) =>
                                                            <option key={ind}>
                                                                {category}
                                                            </option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <hr />
                                        {/* ratings Filter */}
                                        <div>
                                            <div className="m-8">
                                                <p className="font-mono font-bold">Ratings</p>
                                                <div className="flex justify-center gap-4">
                                                {
                                                        [1,2,3,4,5].map((star, ind) =>
                                                            <button className={`star ${star<=(rating)?'text-orange-500':''}`} 
                                                            onMouseEnter={(e)=>e.target.classList.add(star)}
                                                            onMouseOut={(e)=>e.target.classList.remove(star)}
                                                            onClick={()=>handleRatingClick(star)} key={ind}>
                                                                <li className="filter-rating-outer"></li>
                                                            </button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                                {/*Search product*/}
                                {products && products.map((product, ind) => (
                                    <AllProduct key={`product-Search${ind + 1}`} product={product} />
                                )
                                )}
                            </div>
                        </div>
                    </Fragment>
                }
            </Fragment>

        )
    }