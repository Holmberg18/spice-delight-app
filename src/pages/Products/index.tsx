import { CartState } from '../../context/Context'
import SingleProduct from '../../components/SingleProduct'
import Filters from '../../components/Filters'

const Products = () => {

    type Product = {[attr: string]: any}

    const {
        state: { products },
        productState: { sort, byStock, byFastDelivery, byRating, searchQuery }
    }: {
        state: { products: Product[] },
        productState: { 
            sort: string, 
            byStock: boolean, 
            byFastDelivery: boolean, 
            byRating: number, 
            searchQuery: string 
        }
    } = CartState()


    const transformProducts = () => {

        let sortedProducts: Product[] = products

        if(sort){
            sortedProducts.sort((a: Product, b: Product) =>
                sort === "lowToHigh" ? a.price - b.price : b.price - a.price
            )
        }

        if(!byStock){
            sortedProducts = sortedProducts.filter((prod: Product) => prod.inStock)
        }

        if(byFastDelivery){
            sortedProducts = sortedProducts.filter((prod: Product) => prod.byFastDelivery)
        }

        if(byRating){
            sortedProducts = sortedProducts.filter(
                (prod: Product) => prod.ratings >= byRating
            )
        }

        if(searchQuery){
            sortedProducts = sortedProducts.filter((prod: Product) => 
                prod.name.toLowerCase().includes(searchQuery)
            )
        }

        return sortedProducts
    }

    return(
        <div className="flex">
            <Filters />
            <div className="grid grid-cols-3">
                {transformProducts().map((prod: Product) => {
                    return <SingleProduct prod={prod} key={prod.id} />
                })}
            </div>
        </div>
    )
}

export default Products