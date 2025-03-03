import React from 'react';
import Search from './search';
export default function Header() {
    return (
        <nav className=" border-gray-200 bg-gray-400 p-1 rounded-md">
            <div className="flex flex-wrap items-center justify-between">
                <div className="">
                    <img className="h-14 w-52  rounded-lg float-left" src="/image/vasanthi_electrical&hardware_Logo.png" alt="VEHCart" />
                </div>
                <Search />
                <div className="p-2">
                    <button className="text-gray-500 pad font-semibold mr-5 bg-red-500 text-2xl rounded-md">Login</button>
                    <span className="text-gray-600 font-semibold text-2xl mr-2">Cart</span>
                    <span className="text-gray-600 text-xl mr-5  rounded-md px-2 bg-lime-300">1</span>
                </div>
            </div>
        </nav>

    )
}