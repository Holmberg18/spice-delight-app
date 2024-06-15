import { useState, useEffect, ChangeEvent } from "react"
import { Link } from "react-router-dom"
import Rating from "@/components/Rating"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import Button from "@/components/Button"
import { updateQuantity, removeFromCart } from "@/features/cartSlice"
import { RootState } from "@/app/store"
import { CartItem } from "@/models/Meal"
import { useDispatch, useSelector } from "react-redux"


const Cart = () => {

    const [total, setTotal] = useState<number>(0)
    const cart = useSelector((state: RootState) => state.cart.items)
    const dispatch = useDispatch()

    useEffect(() => {
        setTotal(cart.reduce((acc: number, curr: CartItem) => acc + Number(curr.meal.price) * curr.quantity, 0))
    }, [cart])

    return (
        <div className="flex flex-row w-full">
            <div className="w-[75%] h-[86vh] p-8" >
                <ol className="Tiempos">
                    {
                        cart.length > 0 ? cart.map((prod: CartItem) => (
                            <li key={prod.meal.strMeal} className="flex flex-col justify-evenly items-center bg-white shadow-lg p-4 my-4 rounded-lg shadow md:flex-row md:width-full hover:bg-gray-100">
                                <img className="md:max-w-xs fluid rounded-lg" src={prod.meal.strMealThumb} alt={prod.meal.strMeal} />
                                <p>{prod.meal.strMeal}</p>
                                <p>${prod.meal.price}</p>
                                <Rating rating={prod.meal.ratings} className="px-6 pb-2" />
                                <select 
                                    className="w-28"
                                    value={prod.quantity}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => 
                                        dispatch(updateQuantity({idMeal: prod.meal.idMeal, quantity: parseInt(e.target.value)}))}
                                >
                                    {
                                       [...Array(prod.meal.inStock).keys()].map((x) => (
                                            <option key={x + 1}>{x + 1}</option>
                                       ))
                                    }
                                </select>
                                <div className="block text-[#343a40] hover:text-blue text-sm cursor-pointer">
                                    <FontAwesomeIcon 
                                        icon={faTrashCan} 
                                        onClick={() => dispatch(removeFromCart(prod.meal))}
                                    />
                                </div>
                            </li>
                        )) : <li className="Tiempos text-lg">Your cart is empty!</li>
                    }
                </ol>
            </div>
            <div className="flex flex-col bg-[#343a40] text-white p-6 w-[25%] m-2 h-[86vh]">
                <h1 className="text-xxl mb-3">Subtotal ({cart.length}) items</h1>
                <p className="Manrope bold mb-3">Total: ${total}</p>
                <Link to="/checkout">
                    <Button buttonType="button" name="Proceed to Checkout" className="bg-blue" rounded={false} />
                </Link>
            </div>
        </div>
    )
}

export default Cart