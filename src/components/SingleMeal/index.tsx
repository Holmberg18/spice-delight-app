import { CartState } from "../../context/Context"
import Rating from "../Rating"
import Button from "../Button"

interface Props {
    meal: Meal
}

const SingleMeal = ({ meal }: Props) => {

    const { 
        state: { cart },
        dispatch,
     } = CartState()

    return (
        <div className="max-w-md rounded overflow-hidden shadow-lg m-8 flex flex-col justify-evenly items-center">
            <img className="w-full" src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="px-6 py-4 h-64">
                <div className="font-bold text-xl mb-2">{meal.strMeal}</div>
                <span>${meal.price.split(".")[0]}</span>
                <p className="text-gray-700 text-base">{meal.fastDelivery ? "Fast Delivery" : "4 days delivery"}</p>
                <Rating rating={meal.ratings} className="justify-center px-6 pb-2 mb-3" />
                <div className="flex flex-col">
                    {
                        cart.some((p: {[key: string]: any}) => p.idMeal === meal.idMeal) ? (
                            <Button 
                                buttonType="button"
                                action={() => {
                                dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: meal,
                                })
                            }} name="Remove from cart" rounded={true} className="my-2" />
                        ) : (
                            <Button 
                                buttonType="button"
                                action={()=> {
                                    dispatch({
                                        type: "ADD_TO_CART",
                                        payload: meal,
                                    })
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