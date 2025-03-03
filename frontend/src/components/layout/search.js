import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search(){
    const navigate=useNavigate()
    const [keyword,setkeyword] = useState("");
    function loadstop(e){
        e.preventDefault();
        navigate(`/search/${keyword}`)
    }
    return(
        <div className="w-450 relative">
        <form onSubmit={loadstop}>
        <input
            type="search"
            className=" h-8 px-5 w-full rounded-lg outline-none "
            placeholder="Enter Product Name ..."
            value={keyword}
            onChange={(e)=>{
                setkeyword(e.target.value)
            }}
        />
        <button className="text-gray-300 font-bold  bg-red-500 p-1  rounded-lg absolute right-0  focus:ring-1 focus:outline-none">Search</button> 
        </form>
        </div>
    )
}