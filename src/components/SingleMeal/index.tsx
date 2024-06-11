import Rating from "@/components/Rating"
import Button from "@/components/Button"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "@/features/cartSlice"
import { RootState } from "@/app/store"
import { Meal, CartItem } from "@/models/Meal"

interface Props {
    meal: Meal
}

const SingleMeal = ({ meal }: Props) => {

    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)

    return (
        <div className="max-w-md rounded overflow-auto shadow-lg m-8 flex flex-col justify-evenly items-center">
            <img className="w-full" src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="px-6 py-4 h-64">
                <div className="font-bold text-lg mb-2">{meal.strMeal}</div>
                <span>${Math.trunc(meal.price)}</span>
                <p className="text-gray-700 text-base">{meal.fastDelivery ? "Fast Delivery" : "4 days delivery"}</p>
                <Rating rating={meal.ratings} className="justify-center px-6 pb-2 mb-3" />
                <div className="flex flex-col">
                    {
                        cartItems.some((cartItem: CartItem) => cartItem.meal.idMeal === meal.idMeal) ? (
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
                                name={!meal.inStock ? "Out of Stock" : "Add to Cart"} 
                                rounded={true} 
                                disabled={!meal.inStock} 
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleMeal