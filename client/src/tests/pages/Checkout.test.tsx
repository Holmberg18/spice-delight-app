import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import cartReducer, { cartSlice, addToCart } from "@/features/cartSlice"
import { configureStore } from "@reduxjs/toolkit"

import { Checkout } from "@/pages"


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

vi.mock("@/utils/stripe", () => {
    return {
        getStripeKey: vi.fn().mockResolvedValue({
            "publishableKey": "[publishable-key-here]",
            "secretKey": "[secret-key-here]"
        })
    }
})


describe("Checkout page component", () => {
    it("renders the checkout page showing fields and cart items", () => {

        const state: CartState = initialState
        const result = cartSlice.reducer(state, addToCart(mockItem))
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
                    <Checkout />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText("First Name")).toBeInTheDocument()
        expect(screen.getByText("Last Name")).toBeInTheDocument()
        expect(screen.getByText("Email")).toBeInTheDocument()
        expect(screen.getByText("Shipping Address")).toBeInTheDocument()
        expect(screen.getByText("Shipping City")).toBeInTheDocument()
        expect(screen.getByText("Shipping State")).toBeInTheDocument()
        expect(screen.getByText("Shipping Zip Code")).toBeInTheDocument()
        expect(screen.getByText("Seafood fideuà")).toBeInTheDocument()
        expect(screen.getByText("Subtotal (1) items")).toBeInTheDocument()
        const getSolidStars = screen.getAllByTestId('solid-star');
        expect(getSolidStars.length).toBe(3)
        expect(screen.getByText(/Total: \$\s*33\.99/)).toBeInTheDocument()
    })

    it("renders the checkout page with an empty cart", () => {

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
                    <Checkout />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText("Your cart is empty!")).toBeInTheDocument()
        expect(screen.getByText("Subtotal (0) items")).toBeInTheDocument()
    })
})