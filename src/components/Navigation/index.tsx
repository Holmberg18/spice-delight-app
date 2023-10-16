import { BrowserRouter as Router, Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass"
import Button from "../Button"

const Navigation = () => {

    return(
        <nav className="border-gray-200 border-b border-gray-100">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-12">
                <a href="/" className="flex items-center">
                    <img src="/icons8-spices-32.png" className="h-8 mr-3" alt="Spice Delight Logo" />
                    <h1>Spice Delight</h1>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700">
                    <Router>
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
                    </Router>
                    <li>
                        <p className="text-xl"><FontAwesomeIcon icon={faMagnifyingGlass} /></p>
                    </li>
                    <li>
                        <a href="#" className="block py-2 pl-3 pr-4 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-black md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue md:dark:hover:bg-transparent"><Button name={"Get the App"} rounded={true} /></a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation