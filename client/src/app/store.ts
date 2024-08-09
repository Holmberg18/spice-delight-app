import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "@/features/cartSlice"
import customerReducer from "@/features/customerSlice"


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        customer: customerReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch