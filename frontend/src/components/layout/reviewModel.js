import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../actions/productAction";

export default function Model({ isOpen, onclose,id }) {
    const [rating, setrating] = useState(1);
    const [hover, setHover] = useState(0);  
    const [comment,setcomment] =useState('');
    const dispatch = useDispatch();
    const reviewHandle=()=>{
        const formData ={
            rating:Number(rating),
            comment:comment,
            productID:id
        }
        dispatch(createReview(formData))
    }
    const { loading, product } = useSelector((state) => state.persistState?.productState);
    if (!isOpen) {
        return null
    }
    console.log(rating)
    return (
        <div className="bg-black bg-opacity-40 h-full w-full flex items-center absolute justify-center top-0 z-50">
            <div className="border rounded-lg bg-white p-5 shadow-orange-400 relative w-2/5">
                <div onClick={onclose} className="text-lg font-bold border px-2 cursor-pointer bg-lime-300 rounded-md absolute top-1.5 right-2 ">
                    x
                </div>
                <h1 className="text-lg mb-3 ">Sumbit Reviews</h1>
                <hr />
                <div className="my-5">
                    <ul className="flex text-5xl mb-3">
                        {
                            [1, 2, 3, 4, 5].map(star => (
                                <li 
                                value={star}
                                onChange={()=>setrating(star)}
                                onClick={()=>setrating(star)}
                                onMouseEnter={(e)=>e.target.classList.add('text-yellow-400')}
                                onMouseLeave={(e)=>e.target.classList.remove('text-yellow-400')}
                                className={`cursor-pointer ${
                                    star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400'
                                  }`}
                                ><i className="fa fa-star" aria-hidden="true"></i></li>
                            ))
                        }
                    </ul>
                    <hr />
                    <textarea onChange={(e)=>setcomment(e.target.value)} className="w-full pl-2 border my-4 border-gray-500 rounded-md"></textarea>
                    <button type="submit" disabled={loading} onClick={reviewHandle} className="border float-right px-3 py-2 rounded-md font-bold bg-lime-400">Submit</button>
                </div>
            </div>
        </div>
    )
}