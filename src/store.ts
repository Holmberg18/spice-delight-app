import { configureStore } from "@reduxjs/toolkit"
import recipeReducer from "./features/recipeSlice"
import cartReducer from "./features/cartSlice"

export const store = configureStore({
    reducer: {
        recipes: recipeReducer,
        cart: cartReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>