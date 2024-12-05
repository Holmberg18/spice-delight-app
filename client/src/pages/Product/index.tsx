import { useState, useEffect, useMemo } from "react"
import { AsyncImage } from "loadable-image"
import { Blur } from "transitions-kit"
import { fetchRecipe, fetchProduct } from "@/utils/recipes"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeFromCart } from "@/features/cartSlice"
import { RootState } from "@/app/store"
import { CartItem, Product } from "@/models/Meal"
import { Button } from "@/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const getValidIngredients = (meal: Record<string, any> | undefined): string[] => {
    const ingredients: string[] = []

    for (let key in meal) {
        if (key.startsWith("strIngredient") && meal[key] && meal[key].trim() !== "") {
            ingredients.push(meal[key])
        }
    }

    return ingredients;
};

const RecipePage = () => {
    const [recipe, setRecipe] = useState<Record<string, any>>()
    const [product, setProduct] = useState<Record<string, any>>()
    const spinner = <FontAwesomeIcon className="animate-spin text-xl" icon={faSpinner} data-testid="loading-spinner" />
    const { id } = useParams<{ id: string }>();
    const params: string[] | undefined = id?.split("+")
    const productName: string = params ? params[0] : ""
    const productId: string = params ? params[1] : ""
    const dispatch = useDispatch();
    const cartItems: cartItems = useSelector((state: RootState) => state.cart.items)

    const getRecipe = async (name: string | undefined): Promise<void> => {
        const response: Meal | {} = await fetchRecipe(name);
        setRecipe(response);
    }

    const getProduct = async (id: string): Promise<void> => {
        const response: Product | {} = await fetchProduct(id);
        setProduct(response);
    }

    useEffect(() => {
        getRecipe(productName);
        getProduct(productId);
    }, [])

    const {
        strMealThumb,
        strMeal,
        strCategory,
    } = useMemo(() => recipe ? recipe : {
        strMealThumb: "",
        strMeal: "",
        price: 0.00,
        fastDelivery: false,
        ratings: 0,
        strCategory: ""
    }, [recipe])

    const {
        price,
        fastDelivery,
        ratings,
        inStock
    } = useMemo(() => product ? product : {
        price: 0.00,
        fastDelivery: false,
        ratings: 0,
        inStock: false
    }, [product])
    const ingredients = getValidIngredients(recipe);

    const meal: Product = {
        idMeal: productId ? productId: "0",
        strMeal: strMeal,
        price: price,
        strMealThumb: strMealThumb,
        ratings: ratings,
        inStock: inStock,
        fastDelivery: fastDelivery,
        strCategory: strCategory
    }

    const productInCart: CartItem[] = cartItems.filter((cartItem: CartItem) => cartItem.meal.idMeal == productId)

    if(!productName || !productId) return (
        <div className="flex flex-col items-center justify-center h-60">
            <h1 className="text-3xl font-bold">Ooops, we couldn't find what you were looking for!</h1>
        </div>
    )

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col md:flex-row w-full md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-lg overflow-hidden shadow-lg">
                <AsyncImage
                    src={strMealThumb}
                    Transition={Blur}
                    className="w-full md:w-1/2 h-96 object-cover"
                    loader={<div style={{ background: '#888' }} />}
                />
                <div className="p-8 flex flex-col justify-between w-full">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">{strMeal}</h2>
                        <p className="text-xl text-orange-500 mb-4">{price > 0.00 ? `$${price.toFixed(2)}` : spinner}</p>
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
                            { ratings > 0 ? `Ratings:  ${ratings}/ 5` : spinner}
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">Category: {strCategory}</h3>
                        </div>
                        <div className="flex flex-row justify-center items-center mt-4">
                            {cartItems.some((cartItem: CartItem) => cartItem.meal.idMeal == productId) ? (
                                <Button
                                    buttonType="button"
                                    action={() => {
                                        dispatch(removeFromCart(productInCart[0].meal));
                                    }}
                                    name={<p>Remove from cart</p>}
                                    rounded={true}
                                />
                            ) : (
                                <Button
                                    buttonType="button"
                                    action={() => {
                                        dispatch(addToCart(meal));
                                    }}
                                    name={!inStock ? <p>Out of Stock</p> : <p>Add to Cart</p>}
                                    rounded={true}
                                    disabled={!inStock}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipePage;
