import { useState} from "react"
import Button from '@/components/Button';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "@/features/cartSlice"
import { RootState } from "@/store"
import { createOrder } from "@/utils/orders";
import { useNavigate } from "react-router-dom";

interface Props {
    totalAmount: number
}

const StripeCheckout = ({ totalAmount }: Props) => {

    const stripe = useStripe()
    const elements = useElements()
    const customer: Customer = useSelector((state: RootState) => state.customer.customer)
    const dispatch = useDispatch()
    const loggedIn: string = typeof customer?.customerId
    const [message, setMessage] = useState<string | undefined>("")
    const [isProcessing, setIsProcessing] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if(!stripe || !elements){
            return
        }

        setIsProcessing(true)

        await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/thank-you`
            },
            redirect: "if_required"
        }).then(async (result) => {
            if(result.error){
                setMessage(result.error.message)
                console.log(message)
            } else {
                await createOrder(customer.customerId, totalAmount)
                dispatch(clearCart())
                navigate("/thank-you")
            }
        })

    }
      
    return (
        <div id="payment-form">
            <PaymentElement />
            { !loggedIn && <p className="text-[#d10819] text-sm">Please login to submit orders</p> }
            <Button action={handleSubmit} buttonType="button" name={isProcessing? "Processing" : "Pay Now"} rounded={true} disabled={isProcessing} className="mt-4" />
        </div>
    )

}



export default StripeCheckout