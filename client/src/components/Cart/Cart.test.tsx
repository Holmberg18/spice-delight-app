import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { cartSlice, addToCart, removeFromCart } from "@/features/cartSlice"
import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "@/features/cartSlice"
import { Cart } from "@/components"

describe("Cart Component", () => {

    const initialState: CartState = {
        items: [],
        orderCreated: false
    }

    const mockItem: Product = {
                idMeal: "31",
                price: 33.99,
                strMeal: "Seafood fideuà",
                strMealThumb: "https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg",
                ratings: 3,
                inStock: true,
                fastDelivery: false,
                strCategory: "Spanish"
    }

    test("renders empty cart", () => {

        const state: CartState = initialState
        const store = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: state
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText(/Your cart is empty!/i)).toBeDefined()
    })

    test("add to cart, and show items in cart, remove from cart", () => {

        const state: CartState = initialState
        const result = cartSlice.reducer(state, addToCart(mockItem))

        expect(result.items[0].meal).toEqual(mockItem)

        const store = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: result
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText(/Seafood fideuà/i)).toBeDefined()

        //remove mockItem from cart
        const removeCartState = cartSlice.reducer(store.getState().cart, removeFromCart(mockItem))
        expect(removeCartState).toEqual(initialState)

        const newStore = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: removeCartState
            },
        })

        render(
            <Provider store={newStore}>
                <MemoryRouter>
                    <Cart />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText(/Your cart is empty!/i)).toBeDefined()

    })
})