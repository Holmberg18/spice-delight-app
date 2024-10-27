import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import cartReducer from "@/features/cartSlice"
import { Params } from 'react-router-dom';
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { Product } from '@/pages'

const initialState: CartState = {
    items: [],
    orderCreated: false
}

vi.mock("@/utils/recipes", async () => {
    const { recipe, product } = await import("../mocks/recipe")
    return {
        fetchRecipe: vi.fn().mockResolvedValueOnce(recipe)
            .mockResolvedValueOnce({})
            .mockResolvedValueOnce(recipe),
        fetchProduct: vi.fn().mockResolvedValue(product)
    }
})

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

    return {
        ...actual,
        useParams: (): Readonly<Params<string>> => ({ id: "Seafood%20fideuà+31" }),
    };
});

beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

describe("Product page component", () => {
    it("renders the Product page and show the product attributes including ingredients", async () => {

        const store = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: initialState
            },
        })

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Product />
                    </MemoryRouter>
                </Provider>
            )
        })

        expect(screen.getByText("Seafood fideuà")).toBeInTheDocument()
        expect(screen.getByText("Regular Delivery")).toBeInTheDocument()
        expect(screen.getByText("Mussels, Prawns, Saffron, Vermicelli, Olive Oil, Onions, Garlic, Paprika, Monkfish, Baby Squid, Fish Stock, Tomatoes, Lemon, Parsley"))
            .toBeInTheDocument()
    })
    it("renders the Product page but doesn't show ingredients if fetchRecipe doesn't return anything", async () => {

        const store = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: initialState
            },
        })

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Product />
                    </MemoryRouter>
                </Provider>
            )
        })

        expect(screen.queryAllByText("Seafood fideuà").length).toBe(0)
        expect(screen.queryAllByText("Mussels, Prawns, Saffron, Vermicelli, Olive Oil, Onions, Garlic, Paprika, Monkfish, Baby Squid, Fish Stock, Tomatoes, Lemon, Parsley").length)
            .toBe(0)
    })
    it("test adding the product to the cart", async () => {

        const store = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: initialState
            },
        })

        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Product />
                    </MemoryRouter>
                </Provider>
            )
        })

        const addToCartBtn = screen.getByRole("button", { name: /add to cart/i })
        expect(addToCartBtn).toBeInTheDocument()
        fireEvent.click(addToCartBtn)

        await waitFor(() => {
            expect(screen.getByRole("button", { name: /remove from cart/i })).toBeInTheDocument()
        })
        expect(store.getState().cart.items[0].meal).toStrictEqual({
            "idMeal": "31",
            "strMealThumb": "https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg",
            "strMeal": "Seafood fideuà",
            "price": 22,
            "fastDelivery": false,
            "ratings": 5,
            "inStock": true,
            "strCategory": "Seafood"
        })
    })

})