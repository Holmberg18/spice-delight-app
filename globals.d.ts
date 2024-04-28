interface mealProps {
        byStock: boolean,
        byFastDelivery: boolean,
        byRating: number,
        searchQuery: string,
}

declare type Object = {[key: string]: any}
declare type CheckoutFormValues = {
    firstName: string,
    lastName: string,
    email: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
}
declare type StateOption = { 
    label: string,
    value: string 
}