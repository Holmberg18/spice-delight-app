import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { Meal } from "@/models/Meal"

const cartCookie = Cookies.get("shoppingCart")
const { items }: { items: cartItems | undefined } 
    = JSON.parse(cartCookie ? cartCookie : "")

const setCartCookie = (cart: CartState) => {
    const cartString = JSON.stringify(cart)
    Cookies.set("shoppingCart", cartString, { expires: 7 })
}

interface CartState {
    items: cartItems,
    orderCreated: boolean
}

const initialState: CartState = {
    items: items?.length ? items : [],
    orderCreated: false
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Meal>) => {
            const existingIndex = state.items.findIndex((item) => item.meal.idMeal === action.payload.idMeal)
            if(existingIndex >= 0){
                state.items[existingIndex].quantity += 1
            } else {
                state.items.push({ meal: action.payload, quantity: 1 })
            }
            setCartCookie(state)
        },
        removeFromCart: (state, action: PayloadAction<Meal>) => {
            state.items = state.items.filter((item) =>  item.meal.idMeal !== action.payload.idMeal)
            setCartCookie(state)
        },
        updateQuantity: (state, action: PayloadAction<{ idMeal: string, quantity: number }>) => {
            const index = state.items.findIndex((item) => item.meal.idMeal === action.payload.idMeal)
            if(index >= 0){
                state.items[index].quantity = action.payload.quantity
            }
            setCartCookie(state)
        },
        clearCart: (state) => {
            state.items = []
            setCartCookie(state)
        },
        updateOrderCreated: (state, action: PayloadAction<boolean>) => {
            state.orderCreated = action.payload
            setCartCookie(state)
        }
    }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, updateOrderCreated } = cartSlice.actions

export default cartSlice.reducer