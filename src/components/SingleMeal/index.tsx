import Rating from "@/components/Rating"
import Button from "@/components/Button"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "@/features/cartSlice"
import { RootState } from "@/app/store"
import { CartItem } from "@/models/Meal"
import { Link } from "react-router-dom"

interface Props {
    meal: Product
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
    }: Product = meal

    return (
        <div className="max-w-md rounded overflow-hidden shadow-lg m-8 flex flex-col justify-evenly items-center">
            <Link to={`/product/${strMeal}+${idMeal}`}><img className="w-full" src={strMealThumb} alt={strMeal} /></Link>
            <div className="px-6 py-4 h-64">
                <div className="font-bold text-lg mb-2">{strMeal}</div>
                <span>${Math.trunc(price)}</span>
                <p className="text-gray-700 text-base">{fastDelivery ? "Fast Delivery" : "4 days delivery"}</p>
                <Rating rating={ratings} className="justify-center px-6 pb-2 mb-3" />
                <div className="flex flex-col items-center">
                    {
                        cartItems.some((cartItem: CartItem) => cartItem.meal.idMeal === idMeal) ? (
                            <Button 
                                buttonType="button"
                                action={() => {
                                    dispatch(removeFromCart(meal))
                                }} 
                                name={<p>Remove from cart</p>}
                                rounded={true} />
                        ) : (
                            <Button 
                                buttonType="button"
                                action={()=> {
                                    dispatch(addToCart(meal))
                                }} 
                                name={!inStock ? <p>Out of Stock</p>: <p>Add to Cart</p>} 
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