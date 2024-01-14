import { useContext, createContext, useReducer } from "react"
import { cartReducer, mealReducer } from "./Reducers"
import { fetchRecipes } from "../utils/recipes"

const Cart = createContext<any>({} as any)
const getRecipeCollection = async(): Promise<void | Meal[]> => await fetchRecipes()
const recipes = getRecipeCollection()

interface Props {
    children: JSX.Element
}

const Context = ({ children }: Props) => {

    const [state, dispatch] = useReducer(cartReducer, {
        recipes: recipes,
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