import { CartState } from "../../context/Context"
import Rating from "../Rating"
import Button from "../Button"

interface Props {
    prod: {[key: string]: any}
}

const SingleProduct = ({ prod }: Props) => {

    const { 
        state: { cart },
        dispatch,
     } = CartState()

    return (
        <div className="max-w-md rounded overflow-hidden shadow-lg m-8 p-4 flex flex-col justify-center">
            <img className="w-full" src={prod.image} alt={prod.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{prod.name}</div>
                <span>{prod.price.split(".")[0]}</span>
                <p className="text-gray-700 text-base">{prod.fastDelivery ? "Fast Delivery" : "4 days delivery"}</p>
            </div>
            <Rating rating={prod.ratings} className="justify-center px-6 pb-2 mb-3" />
            <div className="flex flex-col px-24">
                {
                    cart.some((p: {[key: string]: any}) => p.id === prod.id) ? (
                        <Button action={() => {
                            dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: prod,
                            })
                        }} name="Remove from cart" rounded={true} className="my-2" />
                    ) : (
                        <Button action={()=> {
                            dispatch({
                                type: "ADD_TO_CART",
                                payload: prod,
                            })
                        }} name={!prod.inStock ? "Out of Stock" : "Add to Cart"} rounded={true} disabled={!prod.inStock} />
                    )
                }
            </div>
        </div>
    )
}

export default SingleProduct