import { useState, useEffect, useMemo } from "react"
import { fetchRecipe } from "@/utils/recipes"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "@/features/cartSlice"
import { RootState } from "@/app/store"
import { Meal, CartItem } from "@/models/Meal"
import Button from '@/components/Button'


const getValidIngredients = (meal: Record<string, any>): string[] => {
    const ingredients: string[] = [];

    for (let key in meal) {
        if (key.startsWith("strIngredient") && meal[key] && meal[key].trim() !== "") {
            ingredients.push(meal[key]);
        }
    }

    return ingredients;
};

const RecipePage = () => {

    const [recipe, setRecipe] = useState<any>()
    const { id } = useParams()
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)


    const getRecipe = async (id: string | undefined) => {
        const response = await fetchRecipe(id)
        setRecipe(response)
    }

    useEffect(() => {
        getRecipe(id)
    }, [])

    const {
        idMeal,
        strMealThumb,
        strMeal,
        price =(Math.random() * (50 - 10) + 10).toFixed(2),
        fastDelivery = Math.random() >= 0.5,
        ratings = (Math.random() * (5 - 1) + 1).toFixed(),
        inStock = Math.random() <= 0.8,
        strCategory,
    } = useMemo(() => recipe ? recipe : {
        strMealThumb: "",
        strMeal: "",
        price: 0.00,
        fastDelivery: false,
        ratings: 0,
        strCategory: ""
    }, [recipe])
    const ingredients = getValidIngredients(recipe)

    const meal: Meal = {
        idMeal: idMeal,
        name: strMeal,
        price: price,
        strMeal: strMeal,
        strMealThumb: strMealThumb,
        ratings: ratings,
        inStock: inStock,
        fastDelivery: fastDelivery
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col md:flex-row w-full md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                <img className="w-full md:w-1/2 h-auto max-h-96 object-cover" src={strMealThumb} alt={strMeal} />
                <div className="p-8 flex flex-col justify-between w-full">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">{strMeal}</h2>
                        <p className="text-xl text-orange-500 mb-4">${price}</p>
                        <p className="text-xl text-orange-500 mb-4">Ingredients</p>
                        <p className="text-lg mb-1">{ingredients.join(', ')}</p>
                    </div>
                    <div>
                        <span
                            className={`inline-block px-3 py-2 text-lg font-semibold rounded ${
                                fastDelivery ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        >
                            {fastDelivery ? 'Fast Delivery' : 'Regular Delivery'}
                        </span>
                        <div className="mt-4 text-yellow-500 text-lg">
                            Ratings: {ratings} / 5
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">Category: {strCategory}</h3>
                        </div>
                        <div className="mt-4">
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
            </div>
        </div>
    );
    
    
    
    
}

export default RecipePage