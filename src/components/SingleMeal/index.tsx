import Rating from "@/components/Rating"
import Button from "@/components/Button"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "@/features/cartSlice"
import { RootState } from "@/app/store"
import { Meal, CartItem } from "@/models/Meal"
import { Link } from "react-router-dom"

interface Props {
    meal: Meal
}

const SingleMeal = ({ meal }: Props) => {

    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const {
        idMeal,
        price,
        strMeal,
        strMealThumb,
        ratings,
        inStock,
        fastDelivery
    }: Meal = meal

    return (
        <div className="max-w-md rounded overflow-auto shadow-lg m-8 flex flex-col justify-evenly items-center">
            <Link to={`/product/${idMeal}`}><img className="w-full" src={strMealThumb} alt={strMeal} /></Link>
            <div className="px-6 py-4 h-64">
                <div className="font-bold text-lg mb-2">{strMeal}</div>
                <span>${Math.trunc(price)}</span>
                <p className="text-gray-700 text-base">{fastDelivery ? "Fast Delivery" : "4 days delivery"}</p>
                <Rating rating={ratings} className="justify-center px-6 pb-2 mb-3" />
                <div className="flex flex-col">
                    {
                        cartItems.some((cartItem: CartItem) => cartItem.meal.idMeal === idMeal) ? (
                            <Button 
                                buttonType="button"
                                action={() => {
                                dispatch(removeFromCart(meal))
                            }} name="Remove from cart" rounded={true} className="my-2" />
                        ) : (
                            <Button 
                                buttonType="button"
                                action={()=> {
                                    dispatch(addToCart(meal))
                                }} 
                                name={!inStock ? "Out of Stock" : "Add to Cart"} 
                                rounded={true} 
                                disabled={!inStock} 
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleMeal