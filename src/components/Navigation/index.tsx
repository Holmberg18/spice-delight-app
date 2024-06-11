import { useState } from 'react'
import { Link } from "react-router-dom"
import Searchbar from "@/components/Searchbar"
import Cart from "@/components/Cart"
import Account from "@/components/Account"
import Button from "@/components/Button"

const Navigation = () => {

    const [mobileVisible, setMobileVisible] = useState<boolean>(false)

    return(
        <nav className="border-gray-200 border-b border-gray-100">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-12">
                <a href="/" className="hidden md:flex items-center">
                    <img src="/icons8-spices-32.png" className="h-8 mr-3" alt="Spice Delight Logo" />
                    <h1>Spice Delight</h1>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
                        <Link to="/">
                            <li className="block py-2 pl-3 pr-4 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue md:dark:hover:bg-transparent">
                                Home
                            </li>
                        </Link>
                        <Link to="/products">
                            <li className="block py-2 pl-3 pr-4 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue md:dark:hover:bg-transparent">
                                Products
                            </li>
                        </Link>
                        <li className="block py-2 pl-3 pr-4 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue md:dark:hover:bg-transparent">
                            <Searchbar />
                        </li>
                        <li>
                            <a href="#" className="block py-2 pl-3 pr-4 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue md:dark:hover:bg-transparent"><Button buttonType="button" name={"Get the App"} rounded={true} /></a>
                        </li>
                        <li>
                            <Cart />
                        </li>
                        <li>
                            <Account />
                        </li>
                </ul>
                </div>
            </div>
            <div onClick={() => setMobileVisible(!mobileVisible)} className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:hidden">
                <a href="/" className="flex md:hidden items-center">
                    <img src="/icons8-spices-32.png" className="h-8 mr-3" alt="Spice Delight Logo" />
                    <h1 className="text-base">Spice Delight</h1>
                </a>
                <button data-collapse-toggle="navbar-hamburger" type="button" className="inline-flex items-center justify-center p-2 w-15 h-15 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
                </button>
                <div className={`${mobileVisible ? 'block': 'hidden'} w-full`} id="navbar-hamburger">
                <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <li>
                            <Link to="/">
                                <div className="block py-2 pl-3 pr-4 text-gray-900 bg-blue-700 rounded dark:bg-blue-600" aria-current="page">Home</div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/products">
                                <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Products</div>
                            </Link>
                        </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation