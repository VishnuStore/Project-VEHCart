import { Link } from "react-router-dom";

export default function AllProduct({product}){
   return <div className="border border-gray-200 rounded-md shadow-inner pt-2">
        <img className="w-80 h-80 m-auto" src={product.images[0]} alt={product.images[0]} />
            <Link to={`/product/${product.id}`} className="text-2xl p-2 line-clamp-2 font-semibold">{product?.name}</Link>
        <div className="flex flex-col p-3">
                <div className=" flex justify-between align-baseline">
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