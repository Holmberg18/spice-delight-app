export interface Meal {
    idMeal: string,
    name: string,
    price: number,
    strMeal: string,
    strMealThumb: string,
    ratings: number
    inStock: boolean,
    fastDelivery: boolean
}
export interface CartItem {
    meal: Meal,
    quantity: number
}

export interface CartState {
    items: CartItem[],
    total: number
}