import { useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CartState } from '../../context/Context'
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
    const dropdownMenu = useRef<HTMLDivElement>(null)
    const {
        state: { cart },
        dispatch,
    } = CartState()

    const closeOpenCart = (event: MouseEvent): void => {
        const target = event.target as HTMLElement
        if(!dropdownMenu?.current?.contains(target)){
            setDropdownVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeOpenCart)
    }, [])

    return(
        <div className="relative py-2 pl-3 pr-4 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">
            <button onClick ={() => setDropdownVisible(true)} className="text-gray-700 bg-blue-700 hover:bg-blue-800 md:hover:text-blue focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">{cart.length}</span>
            </button>
            <div id="dropdown"  ref={dropdownMenu} className={`absolute z-10 ${dropdownVisible ? "" : "hidden"} bg-black divide-y divide-gray-100 rounded-lg shadow w-72`}>
                <ul className="py-2 text-sm bg-gray-700" aria-labelledby="dropdownDefaultButton">
                    {
                        cart.length > 0 ? cart.map((prod: {[key: string]: any}) =>
                            <li key={prod.id} className="flex flex-row items-center justify-evenly my-3">
                                <img 
                                    src={prod.image} 
                                    className="h-8 w-8 rounded-full mx-2" 
                                    alt={prod.name} 
                                />
                                <div className="flex flex-col text-white hover:text-blue text-sm cursor-pointer">
                                    <span>{prod.name}</span>
                                    <span>{prod.price.split(".")[0]}</span>
                                </div>
                                <div className="block text-white hover:text-blue text-sm cursor-pointer">
                                    <FontAwesomeIcon 
                                        icon={faTrashCan} 
                                        onClick={() => 
                                            dispatch({
                                                type: "REMOVE_FROM_CART",
                                                payload: prod,
                                        })}
                                    />
                                </div>
                            </li>
                        ) : <li className="block text-white hover:text-blue text-sm cursor-pointer">Your cart is empty!</li>
                    }
                    <Link to="/cart">
                        <Button name="Go To Cart" rounded={true} className="md:hover:text-blue"/>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Cart