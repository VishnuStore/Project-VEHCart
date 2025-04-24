import { Link } from "react-router-dom";

export default function AllProduct({product}){
   return  <div className="border border-gray-200 rounded-md shadow-inner pt-2 h-auto ">
        <img className="w-52 h-52 m-auto" src={product.images[0]} alt={product.images[0]} />
            <Link to={`/product/${product.id}`} className="text-lg px-5 py-4 line-clamp-3 font-bold">{product?.name}</Link>
        <div className="flex flex-col px-5">
                <div className=" flex justify-between">
                <div className="rating-outer"  >
                    <div className="rating-inner" style={{width:`${product?.ratings/5*100}%`}}></div>
                </div>
               {
                product.numOfReviews > 0 && <span className="text-sm ml-2 font-normal p-4">({product.numOfReviews} Reviews)</span>
               } 
                </div>
                <p className="text-2xl  font-semibold ">${product.price}</p>
                <Link to={`/product/${product.id}`}  className="text-xl bg-lime-300 text-center rounded-md p-2 font-semibold m-5">view details</Link>
        </div>
    </div>
   
}