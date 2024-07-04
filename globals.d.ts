interface mealProps {
        byStock: boolean,
        byFastDelivery: boolean,
        byRating: number,
        searchQuery: string,
}

declare interface Object {[key: string]: any}
declare interface CheckoutFormValues {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
}
declare interface StateOption { 
    label: string,
    value: string 
}
declare interface Styles {[key:string]: string}
declare interface Customer {
    customerId: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    username: string
}
declare interface Order {
    customerId: number,
    orderDate: Date,
    totalAmount: number,
    status: string
}
declare interface CartState {
    items: CartItem[],
    total: number
}
declare type cartItems = { meal: Meal, quantity: number }[]