import { useState } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { search } from "../../actions/searchAction";
export default function Search(){
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [keyword, setKeyword] = useState("");
    function loadstop(e){
        e.preventDefault();
        navigate(`/search/${keyword}`);
        setKeyword("");
    }
     
    function searchbtn(){
        dispatch(search(keyword));
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
                setKeyword(e.target.value)
            }}
        />
        <button className="text-gray-300 font-bold bg-red-500 p-1  rounded-lg absolute right-0  focus:ring-1 focus:outline-none" onClick={searchbtn}>Search</button> 
        </form>
        </div>
    )
}