interface mealProps {
        byStock: boolean,
        byFastDelivery: boolean,
        byRating: number,
        searchQuery: string,
}

declare type Object = {[key: string]: any}
declare type Meal = {[attr: string]: any}