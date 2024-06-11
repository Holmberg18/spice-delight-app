import { useContext, createContext, useReducer } from "react"
import { cartReducer, mealReducer } from "@/context/Reducers"
import { fetchRecipes } from "@/utils/recipes"
import { Meal } from "@/models/Meal"

const Cart = createContext<any>({} as any)
const getRecipeCollection = async(type: string): Promise<void | Meal[]> => await fetchRecipes(type)
const recipeList = async() => {
    const mexicanRecipes: void | Meal[] = await getRecipeCollection("Mexican")
    const spanishRecipes : void | Meal[] = await getRecipeCollection("Spanish")

    return Array.isArray(mexicanRecipes) && 
        Array.isArray(spanishRecipes) ? mexicanRecipes.concat(spanishRecipes) : null
}

interface Props {
    children: JSX.Element
}

const Context = ({ children }: Props) => {

    const [state, dispatch] = useReducer(cartReducer, {
        recipes: recipeList(),
        cart: []
    })

    const [mealState, mealDispatch] = useReducer(mealReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
    })

    return <Cart.Provider value={{state, dispatch, mealState, mealDispatch}}>{children}</Cart.Provider>
}

export default Context

export const CartState = () => {
    return useContext(Cart)
}