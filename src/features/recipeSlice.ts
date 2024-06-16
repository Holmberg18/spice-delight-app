import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchRecipes } from "@/utils/recipes"
import { Meal } from "@/models/Meal"

interface RecipeState {
    items: Meal[] | null,
    initialItems: Meal[] | null,
    filters: {
        sortByPrice: string
        includeOutOfStock: boolean,
        fastDeliveryOnly: boolean,
        minRating: number,
        searchQuery: string,
    }
}

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

export const fetchRecipesAsync = createAsyncThunk(
    'recipes/fetchRecipes',
    async (types: string[]): Promise<Meal[]> => {
        const allRecipes = await Promise.all(types.map(type => fetchRecipes(type)))
        return allRecipes.flat().filter(recipe => recipe !== undefined) as Meal[]
    }
)

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        sortKeyword: (state, action: PayloadAction<string>) => {
            if(state.items?.length){
                state.items = state.items.filter((item: Meal) =>  item.strMeal?.toLowerCase().includes(action.payload.toLowerCase()))
                state.filters.searchQuery = action.payload
            }
        },
        sortPrice: (state, action: PayloadAction<string>) => {
            state.filters.sortByPrice = action.payload
        },
        sortStock: (state) => {
                state.filters.includeOutOfStock = !state.filters.includeOutOfStock
        },
        sortFastDelivery: (state) => {
                state.filters.fastDeliveryOnly = !state.filters.fastDeliveryOnly
        },
        sortRating: (state, action: PayloadAction<number>) => {
                state.filters.minRating = action.payload
        },
        sortQuery: (state, action: PayloadAction<string>) => {
                state.filters.searchQuery = action.payload
        },
        clearFilters: (state) => {
            state.filters = {
                sortByPrice: "",
                includeOutOfStock: false,
                fastDeliveryOnly: false,
                minRating: 0,
                searchQuery: "",
            }
            state.items = initialState.items
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRecipesAsync.fulfilled, (state, action) => {
            state.items = action.payload;
            if(state.initialItems?.length === 0){
                state.initialItems = action.payload
            }
        });
    }
})

export default recipeSlice.reducer
export const {
    sortKeyword,
    sortPrice, 
    sortStock, 
    sortFastDelivery, 
    sortRating, 
    sortQuery, 
    clearFilters 
} = recipeSlice.actions