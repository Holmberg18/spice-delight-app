import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import recipeReducer, {
    recipeSlice,
    sortPrice, 
    sortStock, 
    sortFastDelivery, 
    sortRating, 
    sortQuery
} from "@/features/recipeSlice"
import { configureStore } from '@reduxjs/toolkit';
import { Filters } from "@/components"

describe("Filters Component", () => {

    const initialState: RecipeState = {
        items: [],
        initialItems: [],
        filters: {
            sortByPrice: "", // 'lowToHigh' or 'highToLow'
            includeOutOfStock: false,
            fastDeliveryOnly: false,
            minRating: 0,
            searchQuery: "",
        }
    }
    

    test("renders no filters activated", () => {

        const state: RecipeState = initialState
        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: state
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )

        const ascendingRadio: HTMLInputElement = screen.getByDisplayValue("Ascending")
        const descendingRadio: HTMLInputElement = screen.getByDisplayValue("Descending")
        const includeOutOfStock: HTMLInputElement = screen.getByDisplayValue("Include Out of Stock")
        const fastDeliveryOnly: HTMLInputElement = screen.getByDisplayValue("Fast Delivery Only")


        expect(ascendingRadio.checked).toBe(false)
        expect(descendingRadio.checked).toBe(false)
        expect(includeOutOfStock.checked).toBe(false)
        expect(fastDeliveryOnly.checked).toBe(false)

    })

    test("renders filter by ascending price activated", () => {

        const state: RecipeState = initialState
        const result = recipeSlice.reducer(state, sortPrice("lowToHigh"))

        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: result
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )

        const ascendingRadio: HTMLInputElement = screen.getByDisplayValue("Ascending")
        expect(store.getState().recipe.filters.sortByPrice).toBe("lowToHigh")
        expect(ascendingRadio.checked).toBe(true)
    })

    test("renders filters by descending price and sort by fast delivery activated", () => {

        const sortStockResult: RecipeState = recipeSlice.reducer(initialState, sortPrice("highToLow"))
        const result = recipeSlice.reducer(sortStockResult, sortFastDelivery())

        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: result
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )

        const ascendingRadio: HTMLInputElement = screen.getByDisplayValue("Descending")
        const fastDeliveryOnly: HTMLInputElement = screen.getByDisplayValue("Fast Delivery Only")
        expect(store.getState().recipe.filters.sortByPrice).toBe("highToLow")
        expect(store.getState().recipe.filters.fastDeliveryOnly).toBe(true)
        expect(ascendingRadio.checked).toBe(true)
        expect(fastDeliveryOnly.checked).toBe(true)

    })

    test("renders filters by descending price and out of stock included activated", () => {

        const highToLowResult = recipeSlice.reducer(initialState, sortPrice("highToLow"))
        const result = recipeSlice.reducer(highToLowResult, sortStock())

        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: result
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )


        const descendingRadio: HTMLInputElement = screen.getByDisplayValue("Descending")
        const includeOutOfStock: HTMLInputElement = screen.getByDisplayValue("Include Out of Stock")
        expect(store.getState().recipe.filters.sortByPrice).toBe("highToLow")
        expect(store.getState().recipe.filters.includeOutOfStock).toBe(true)
        expect(descendingRadio.checked).toBe(true)
        expect(includeOutOfStock.checked).toBe(true)
    })

    test("renders all filters toggled on (ascending price)", () => {

        let result: RecipeState = recipeSlice.reducer(initialState, sortPrice("lowToHigh"))

        const methods = [
             sortStock,
             sortFastDelivery,
             sortRating
        ]
        const allFilterState = (methods).reduce((a : RecipeState, c: any): RecipeState => {
            if(c === sortRating){
                return recipeSlice.reducer(a, c(3))
            }
            return recipeSlice.reducer(a, c)
        }, result)

        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: allFilterState
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )


        const descendingRadio: HTMLInputElement = screen.getByDisplayValue("Ascending")
        const includeOutOfStock: HTMLInputElement = screen.getByDisplayValue("Include Out of Stock")
        const includeFastDelivery: HTMLInputElement = screen.getByDisplayValue("Fast Delivery Only")

        expect(store.getState().recipe.filters.sortByPrice).toBe("lowToHigh")
        expect(store.getState().recipe.filters.includeOutOfStock).toBe(true)
        expect(store.getState().recipe.filters.fastDeliveryOnly).toBe(true)

        expect(descendingRadio.checked).toBe(true)
        expect(includeOutOfStock.checked).toBe(true)
        expect(includeFastDelivery.checked).toBe(true)
    })

    test("renders search query filter", () => {

        let result: RecipeState = recipeSlice.reducer(initialState, sortQuery("salmon"))

        const store = configureStore({
            reducer: {
                recipe: recipeReducer
            },
            preloadedState: {
                recipe: result
            },
        })

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Filters resetPage={() => ""}/>
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText(/salmon/i)).toBeDefined()

    })

    
})